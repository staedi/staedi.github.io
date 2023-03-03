---
title:  "Simplifying MultiPolygon to Polygon (.geojson)"
date: 2020-09-21
tag: Data Visualization
tags: [python, geojson, json, GIS, Polygons]
description: An example of MultiPolygon reductions of .geojson
---

Anyone who wants to map **Choropleths**, or color maps, need to have proper GIS shapefiles. They're simply collections of cooridnates of each boundary. Depending on the complexity of geography, they either contain `MultiPolygon` or `Polygon`. 

### MultiPolygon and Polygon geometry

As can be easily guessed, `MultiPolygon` is more complicated than its counterpart as it can encompass areas with holes inside into one name, while it's not allowed in `Polygon` type.

Then, we can just use `MultiPolygon` type geometry, right? Not really! 
Because of the added complexity, not every mapping tool can use `MultiPolygon`, notably, [Pydeck](https://deckgl.readthedocs.io/en/latest/).
Therefore, it's imperative to have `Polygon` geomtry or convert into it.

### Intuitions of effective conversions

As mentioned above, `MultiPolyon` geometry is a collection of multiple **single** `Polygon`s. Intuitively, it seems that more important boundaries are made up of longer-length coordinates. Accordingly, if we limit the top largest-length `Polygon` coordinates, we can convert without increasing file size much (Because same header information are repeated for newly created `Polygon` geometries, file size should be larger). This filesize reduction process should be crucial as the mapping process depends on GIS shapefiles sizes.


### Code for converting Multi to Single Polygon

```py
import json
filename = 'data/cb_2018_us_cbsa_500k'
target_len = 15

js = open(filename+'.json', 'r').read()
gj = json.loads(js)
output = {"type":"FeatureCollection","features":[]}

def process_geojson(filename):
    js = open(filename+'.json', 'r').read()
    gj = json.loads(js)
    output = {"type":"FeatureCollection","features":[]}

    for feature in gj['features']:
        if feature['geometry'] is not None:
            if feature['geometry']['type'] == 'MultiPolygon':
                len_list = sorted([[idx, len(elem[0])] for idx, elem in enumerate(feature['geometry']['coordinates'])],key=lambda x: x[1],reverse=True)[:target_len]
                reg_len = [i[0] for i in len_list]

                for idx, poly in enumerate(feature['geometry']['coordinates']):
                    if len(feature['geometry']['coordinates'])<target_len or idx in reg_len:
                        xfeature = {"type":"Feature", "properties":feature["properties"], "geometry":{"type":"Polygon"}}
                        xfeature['geometry']['coordinates'] = poly
                        output['features'].append(xfeature)
            else:
                for idx, poly in enumerate(feature['geometry']['coordinates']):
                    xfeature = {"type":"Feature", "properties":feature["properties"], "geometry":feature["geometry"]}
                    output['features'].append(xfeature)

    open(filename+'.geojson', 'w').write(json.dumps(output,separators=(',',':'),ensure_ascii=False).replace('}},','}},\n'))

if __name__ == '__main__':
    process_geojson(filename)
```

Above is *general-purpose* `MultiPolygon` to `Polygon` conversion source made in *Python*. By *general-purpose*, I mean it doesn't manipulate any filesize reduction processes (e.g., removing unnecessary json tags) other than limiting the number of `Polygon` elements per `MultiPolygon` geometry.


### Credits
[Nick Doiron](https://gist.github.com/mapmeld/8742ae89c6d687171d00): Original tranformation source I came across via [gis.stackexchange.com](https://gis.stackexchange.com)
