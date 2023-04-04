---
title:  "Deploying visx (with Next.js) application on GitHub Pages (sub-path)"
date: 2023-04-04
tag: Development
tags: [development, github, ci, next.js, visx]
description: How to deploy visx with Next.js on GitHub Pages
---


## Next.js on GitHub Pages

Last month, when I switched this site from `Jekyll` to `Next.js`, I wrote an [article](nextjs-git) outlining how to deploy `Next.js` application on `GitHub Pages`. While it isn't so straightword, the result looked exactly the same as the local development with `next dev`.

However, when I tried to deploy another app with `visx` on `GitHub Pages`, the supposedly simple process was not that easy enough.


### Tree-shaking import

`visx` supports all-encompassing installation, `npm @visx/visx@2.18.0` (Currently, version 3.0 or later is **NOT COMPATIBLE** with `Next.js`). 

However, when you import in a *tree-shaking way*, e.g., 

```js pack.tsx
import { Group } from '@visx/group';
```

, build fails. 

Maybe it works with `.jsx` but **NOT** with `tsx`. Or, maybe because I installed with `pnpm` not `npm`.

Two solutions are available (among others).

* Change `@visx/group` to `@visx/visx` 
* Do not commit `tsconfig.json`


### basePath

Even after that modification (skipping `tsconfig.json` while deploying), the resultant site doesn't look alright. 

![Huh?](/images/basepath_not_set)

Where did the **CSS** go?

It turned out that unlike the last time, I deployed on a repo other than `[username].github.io`.

In that case, the deployed app cannot clearly figure out where the resources are, including **CSS** or other **assets** other than main index files. (While I didn't notice at the first time, any link I cliked resulted in ***404 errors***).

The solution is pretty simple.

>
Set the repo as the name of `basePath` option inside `module.exports`.

```js
module.exports = {
  basePath: '/visx',
  images: {
    unoptimized: true,
  }
};
```

Voilà!

![Huh!](/images/basepath_set)