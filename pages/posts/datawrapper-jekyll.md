---
title:  "Embedding Datawrapper Chart #2 (feat. Github Pages)"
date: 2022-11-08
tag: Data Visualization
tags: [python, datawrapper, github pages, jekyll]
description: How to embed Datawrapper Chart in Github Pages
---


Previously, I showed how to embed [Datawrapper](https://datawrapper.de) chart in this [article](datawrapper-streamlit). 

I embedded a screenshot of Datawrapper's **Publish visualiztion** for reference.

Here it is again.

![](https://github.com/staedi/staedi.github.io/raw/main/images/dw_publish.png)

In that article, I recommended using the **visualization link** rather than the full html tags. However, in case of `Github Pages`, it's the other way around. You copy the **iframe code** and use it to embed the code in Github Pages. (Choose **Responsive iframe** radio button)


### How to embed in Github Pages, then?

Simply copy that `iframe` code inside the post.

Here is the copied tag from the image.

```js
<iframe title="Weighted Sentiment Scores (Exchange)" aria-label="Dot Plot" id="datawrapper-chart-0bwFo" src="https://datawrapper.dwcdn.net/0bwFo/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="495"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();
</script>
```

### How is it displayed in action?

<iframe title="Weighted Sentiment Scores (Exchange)" aria-label="Dot Plot" id="datawrapper-chart-0bwFo" src="https://datawrapper.dwcdn.net/0bwFo/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="495"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();
</script>

Voilà! 

Unlike in the **Streamlit**'s `Component.iframe()` case, the **height** specification is respected here (As it should be with the fully-working *iframe* tag).