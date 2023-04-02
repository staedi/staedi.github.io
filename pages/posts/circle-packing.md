---
title:  "Circle packing with visx"
date: 2023-04-02
tag: Data Visualization
tags: [visx, circle pack, hierarchy, tooltip]
description: A few tips to implement Circle packing chart with visx
---

## Circle packing

As I mentioned in the previous [article](visx), Circle packing is what led me toward `D3.js` and `visx`, quite recently.

For a brief introduction, Circle packing presents a hierarchical view of the given data. Compared to tree structures, Circle packing has an advantage of packaging hierarchies inside a circle, thus wasting fewer spaces.


## Circle packing basics

### Input data

The data structure for Circle packing is nested object (from **root** to **leaves**). However, if you just follow the exact example of `visx`, you might think the library just uses array of children objects rather than fully-nested objects. 

In fact, they are two of the kind, as the following code snippets reveal.

```js
let filtered_data = data.filter((d) => d.distance != null);
const pack = { children: filtered_data, name: 'root', radius: 0, distance: 0 };

const root = hierarchy<Datum>(pack)
  .sum((d) => d.radius * d.radius)
  .sort(
    (a, b) =>
      // sort by hierarchy, then distance
      (a?.data ? 1 : -1) - (b?.data ? 1 : -1) ||
      (a.children ? 1 : -1) - (b.children ? 1 : -1) ||
      (a.data.distance == null ? -1 : 1) - (b.data.distance == null ? -1 : 1) ||
      a.height! - b.height! ||
      a.data.distance! - b.data.distance!,
  );
```

In `D3.js`, the input data has the form of the variable `pack` here, which takes Array object to convert to nested object. Hence, there is no difference between `visx` and `D3.js` in terms of data structure.

It's also worth mentioning that **distance** and **radius** (might have different variable name if you may) variables of the input data need not be set differently.

For me, I set **distance** and **radius** uniformly, respectively **0** and **1** for all data points. Due to the filtering code in the example, if you decide to set as such, you have to modify the code **NOT** to filter out data points having **distance 0**.

```js
// let filtered_data = data.filter((d) => d.distance != null);
let filtered_data = data;
```

### Descendents

In the main export function (named `Example`), circles are set with `slice(2)` to remove outer hierarchies and thereby boundaries.
If you prefer to outer boundaries at all, you might follow it, but if you follow the original `D3.js` Circle Packing example, you might not want to.

```js
// const circles = packData.descendants().slice(2); // skip outer hierarchies
const circles = packData.descendants();
```


### Layout adjustments

If you follow the example code with nested-structured dataset, you might find the resultant chart a little bit annoying.

For instance, it set the dimension of the `SVG` frame half of the original, does not set padding inside `<Pack />` code, which will set the spacing between circles, no stroke or opacity stylings are applied.

```js 
// <Group top={-height - margin.bottom} left={-width / 2}>
<Group>
```

```js
<Pack<Datum> root={root} size={[width, height]} padding={3} >
```

```js
<circle
    key={`circle-${i}`}
    r={circle.r}
    cx={circle.x}
    cy={circle.y}
    fill='#ccc'
    fill-opacity={circle.children ? 1/(circle.height+2) : 0.5}
/>
```

### Adding text

In the example, no label was shown on top of circles. However, original `D3.js` Circle Packing drew circles with labels. This requires an additional component - `<Text />` from `@visx/text` (or `svg`'s default `<text />`).

As the `<Text />` component should be placed parallely with `<circle />`, be sure to wrap inside *empty* `<>` and `</>` or `<Group>` and `</Group>` within the `JSX` script.

```js
<svg ref={svgRef} width={width} height={height}>
    <rect width={width} height={height} rx={14} fill="transparent" />
        
    <Pack<Datum> root={root} size={[width, height]} padding={3} >
        {(packData) => {
            const circles = packData.descendants();
            return (
            <Group>
                {circles.map((circle, i) => (
                    <>
                    <circle
                        key={`circle-${i}`}
                        r={circle.r}
                        cx={circle.x}
                        cy={circle.y}
                        fill='#ccc'
                        fill-opacity={circle.children ? 1/(circle.height+2) : 0.5}
                    />
                    <Text
                        key={`text-${i}`}
                        x={circle.x}
                        y={circle.y}
                        width={circle.r*2}
                        fontSize={11}
                        textAnchor='middle'
                        verticalAnchor='middle'
                        fontFamily='arial'
                        fontWeight={600}
                        >
                        {circle.data.name}
                    </Text>
                    </>
                )
                )}
            </Group>
            );
        }}
        </Pack>
    </svg>
```


## Summarizing...

The resultant diagram is like the following.

![Circle Pack](/images/circle_pack.png)

Here, I intentionally omit more advanced topics adding more interactive features, (**Tooltips**, **MouseOver events**) as it might make codes more complex.

But, I belive that the topics covered in this article are good enough to implement Circle packing in `visx`.