---
title:  "Deploying GitHub Action for Next.js application (Updated)"
date: 2025-03-22
tag: Development
tags: [development, github, ci, next.js]
description: An update to the previously published GitHub Action for Next.js on GitHub Pages
---

## Backgrounds

Previously, I posted an [article](nextjs-git) on the GitHub Action for Next.js application.

The sample workflow file (`nextjs.yml`) was as below.

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

It had worked fine until now.

Maybe the GitHub team changes a bit since I had previously posted (last year), and when I uploaded an article, it failed both in the `build` and `deploy` stages.


Build Error
```
Getting action download info
Error: Missing download info for actions/upload-artifact@v3
```

Deploy error
```
Run actions/deploy-pages@v1
Artifact exchange URL: 
Error: Getting signed artifact URL failed
Error: HttpError: Cannot find any run with github.run_id .
    at processRuntimeResponse (/home/runner/work/_actions/actions/deploy-pages/v3/src/internal/api-client.js:48:1)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at getSignedArtifactMetadata (/home/runner/work/_actions/actions/deploy-pages/v3/src/internal/api-client.js:82:1)
    at Deployment.create (/home/runner/work/_actions/actions/deploy-pages/v3/src/internal/deployment.js:68:1)
    at main (/home/runner/work/_actions/actions/deploy-pages/v3/src/index.js:30:1)
Error: Error: Failed to create deployment (status: 404) with build version . Ensure GitHub Pages has been enabled: https://github.com/staedi/staedi.github.io/settings/pages
```


## How to mitigate

Thankfully, [GitHub discussion](https://github.com/orgs/community/discussions/152695#discussioncomment-12421607) provides a mitigation, mentioning this should be a version issue with multiple packages with the action.

**Build**
```
actions/checkout@v3 => actions/checkout@v4
actions/configure-pages@v3 => actions/configure-pages@v4
actions/upload-pages-artifact@v2 => actions/upload-pages-artifact@v3
```

**Deploy**
```
actions/deploy-pages@v2 => actions/deploy-pages@v4
```

Reflecting these, the modified action workflow ran as usual.


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
        uses: actions/checkout@v4
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
        uses: actions/configure-pages@v4
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
      - name: Generate RSS Feeds
        run: node ./scripts/gen-rss.js
      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: Static HTML export with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next export
      - name: Add .nojekyll file
        run: touch ./out/.nojekyll
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
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
        uses: actions/deploy-pages@v4
```