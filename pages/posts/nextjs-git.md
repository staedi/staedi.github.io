---
title:  "Deploying GitHub Action for Next.js application"
date: 2023-03-07
tag: Development
tags: [development, github, ci, next.js]
description: A brief instruction to deploy GitHub Action for Next.js on GitHub Pages
---

## Next.js

As many well know, `Next.js` is one of the most popular and is gaining popularity frameworks amongst developers (mostly frontend).

In a sentence, `Next.js` can be thought of a toolkit (framework) for easier `React.js` (library) development. 

Another important to mention is that the notable functionality of `Next.js` is the server-side rendering. 
With this, `Next.js` can learn faster than client-side rendering (vanilla `React.js` or `Gatsby.js`) while deploying on the web for static site might be a little bit tricky.


## Why Next.js

Its versatile functions aside, my intention to try it out was fairely simple. I was intrigued by available `Next.js` templates just like the one you're reading even though I only had a stint of `React.js` experience.
This contrasts to other frameworks or tools compatible with **GitHub Pages**.

Take its main rival `Gatsby.js` for an example. Obviously, many templates are available but the overall quality (at least visually) of them didn't satisfy me.

While I made a small modifications with this template, it was minimal as to tweak the layout to display available tag lists above articles. 


## Using Next.js in GitHub

While using `Next.js` in *GitHub* shouldn't be a problem with the flexible **GitHub Pages**, `Next.js` recommemends [**Vercel**](https://vercel.com) (who develops `Next.js`) to deploy the `Next.js` applications.

In fact, many `Next.js` applications I came across on GitHub have been deployed on Vercel.

As I prefer sticking on *GitHub* (somehow I like the `.github.io` domain), I am against using other than **GitHub Pages**.


## How? 

### `Next.js` setting

As mentioned in the beginning, `Next.js` can render page on the server and that is the culprit which complicates the problem of deployment on **GitHub Pages**.

Namely, `Next.js`'s image optimization functionality is done on the side-side and to deploy on **GitHub Pages**, it should be disabled inside the `module.exports` setting.

```js filename="next.config.js"
const withNextra = require('nextra')({
  theme: './theme.tsx',
  staticImage: true,
  defaultShowCopyCode: true,
  readingTime: true,
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // any configs you need
}

module.exports = {
  ...withNextra(nextConfig),
  images: {
    unoptimized: true,
  }
};
```

Notice the `unoptimized: true` setting inside the *images* of `module.exports` setting.


### Pages Setting

While not entirely mandatory, it might be helpful to choose the **Build and deployment Source** from which the workflow is run.

That is because with the default *Deploy from a branch* setting, new push to the repository would trigger GitHub Pages's default `Jekyll` workflow in addition to `Next.js` workflow.

When I switched to **GitHub Actions** option, only one workflow (`Next.js`) runs.

![](/images/pages.png)


### Which Action to choose

On the web, many instructions available for `Next.js` start with `Node.js` workflow rather than one specific to `Next.js`.

Since `Next.js` workflow is available on the platform, it might be easier place to start.

![](/images/workflow.png)


### Disabling `Jekyll`

Whatever type of application you deploy, **GitHub Pages** tries to build `Jekyll`. To avoid this, add `.nojekyll` file inside `./out` directory as part of the workflow. `./out` directory is where static pages reside for **GitHub Pages**.


### pnpm setup

The original `Next.js` workflow cannot deal with `pnpm` therefore to use it, pnpm setup should be manually done.


### Disabling cache

While I'm not sure if it happens everytime, in my case, with the caching option enabled, freshly deployed GitHub Pages didn't show all the article lists although I could access each one my directly entering the address.

As I commented caching in the script, it worked!


## Complete workflow script

```js filename=".github/workflows/nextjs.yml"
# Sample workflow for building and deploying a Next.js site to GitHub Pages
#
# To get started with Next.js see: https://nextjs.org/docs/getting-started
#
name: Deploy Next.js site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup pnpm        
        uses: pnpm/action-setup@v2
        with:
          version: 7.28.0
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package-lock.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/pnpm-lock.yaml" ]; then
            echo "manager=pnpm" >> $GITHUB_OUTPUT
            echo "command=install --frozen-lockfile" >> $GITHUB_OUTPUT
            echo "runner=pnpm" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine packager manager"
            exit 1
          fi
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - name: Setup Pages
        uses: actions/configure-pages@v3
        with:
          # Automatically inject basePath in your Next.js configuration file and disable
          # server side image optimization (https://nextjs.org/docs/api-reference/next/image#unoptimized).
          #
          # You may remove this line if you want to manage the configuration yourself.
          static_site_generator: next
#       - name: Restore cache
#         uses: actions/cache@v3
#         with:
#           path: |
#             .next/cache
#           # Generate a new cache whenever packages or source files change.
#           key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
#           # If source files changed but packages didn't, rebuild from a prior cache.
#           restore-keys: |
#             ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: Static HTML export with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next export
      - name: Add .nojekyll file
        run: touch ./out/.nojekyll
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./out

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```