---
title:  "Using Observable plot in Svelte"
date: 2022-04-18
tag: Data Visualization
tags: [dataviz, javascript, svelte, react.js, vue.js, observable, d3.js]
description: How to use Observable plot in Svelte.js
---

## Observable plot
For the past weeks, I've exploring alternative visualization tools, especially those based on `javascript`.
As `D3.js` has always been on my radar, it was no surprise that **Observable plot** caught my eyes.
(Observable was made by Mike Bostock, creator of `D3`.)

While many people agree that `D3` is one of the most powerful visualization tools, they would also agree that it's painstaking to just create a simple barchart.

Having known this for long, the team at Observable made **Observable plot**, which works just like other plotting tools, `ggplot2` in `R`, for instance.


## Svelte
By the same token that I was intrigued with **Observable plot**, I got interested with this frontend framework. Obviously, there are other leading framework. Ever heard of `React.js`, `Vue.js` 😄? `React` is the most popular one among others, but it also is infamous for its steep learning curve and rather complicated coding style, not to mention performance. Compared to others, `Svelte` is faster and cleaner, along with its easier learning curve.


## Let's begin
Since the introduction of `Svelte` nor **Observable plot** isn't the purpose of this post, I wouldn't delve into much. For installation, refer to the following.

### Installations

**`Svelte`**
As with other javascript frameworks, you create a `Svelte` project, rather than installing it (unlike installing `Python` or `R`).

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

**Observable plot**
```bash
yarn add @observablehq/plot
```

## Observable plot basic usage

### import
```js
import * as Plot from "@observablehq/plot";
import * as d3 from 'd3';   // For D3 functions
```

### Data 
```js
const sales = [
    {units:10,fruit:'fig'},
    {units:20,fruit:'date'},
    {units:40,fruit:'plum'},
    {units:30,fruit:'plum'},
];
```

### main 
```js
Plot.plot(options)  // Basic form, recommended by the Observable team

// The followings are equivalent
Plot.plot({marks: [Plot.dot(sales,{x:'units',y:'fruit'})]})
Plot.dot(sales,{x:'units',y:'fruit'}).plot()
```

## Using Observable plot in Svelte
As with other frontend frameworks, Svelte also has the gateway file, `App.svelte`. To comply with the recommended form of Observable plot, it makes sense to create a component for the plot and let `App.svelte` uses that component.

### `Plot.svelte`
```js
<script>
import * as Plot from "@observablehq/plot";
import * as d3 from 'd3';
export let options;
function myplot(node) {
    node.appendChild(
        Plot.plot(options)
    )
}
</script>

{#key options}
<div use:myplot {...$$restProps}></div>
{/key}
```

### `App.svelte`
```js
<script>
import APlot from './Plot.svelte';
import * as Plot from "@observablehq/plot";
export const sales = [
    {units:10,fruit:'fig'},
    {units:20,fruit:'date'},
    {units:40,fruit:'plum'},
    {units:35,fruit:'apple'},
	{units:45,fruit:'peach'},
	{units:10,fruit:'plum'},];
</script>

<APlot options={% raw %}{{marks: [Plot.dot(sales,{x:'units',y:'fruit'})]}}{% endraw %} />
```
