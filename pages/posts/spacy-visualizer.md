---
title:  "Text Visualization Dashboard highlighting keywords and companies"
date: 2023-02-12
tag: Project
tags: [python, spacy, spacy-streamlit, streamlit]
description: A Text Visualization project for extracting keywords and relevant companies from a text using spacy-streamlit and Streamlit
---

As a text analytics practitioner (among other things) in the finance domain, I should keep abreast of news on a daily basis. Even in the age of **ChatGPT** and its competitors, the process has not fully automated. If that day does not come today, it might be wiser to speed up the process with a stopgap measure at least. That is why I embarked on this simple but hopefully effective visualization tool.


## Motivation

One of my primary works is to analyze news affecting companies on a weekly dasis, at least. As one know, we are bombarded with the ever-flowing news, and even more in the financial world.

To reduce the workload, my team has been utilizing `BERTopic` to extract key topics with the news. However, it does not always give satisfying results. It always involves reading articles manually.

I have always wanted to reduce that workload and one day, one evident thought came to my mind. If I can visualize important topics and relevant companies involved in those topics, wouldn't it speed up the process? As we all know, human eyes can spot faster than visual artifacts.

Consequently, my previous experience of `spacy-streamlit` enabled me to build this simple tool. Although `spacy-streamlit` was built by [Explosion.AI](https://explosion.ai), the developer of `spaCy`, the module does not always require `spaCy` module for simple visualization purposes. **Regular expression** works wonder instead.


## Overall design

![](https://github.com/staedi/spacy_visualize/raw/main/images/interface.png)

The overall design has the classic two side interface. 

On the left **sidebar**, three features are available.
* 1) Upload a text file to analyze
* 2) Enter keywords to search
* 3) Select articles for the visualization

On the right (**main**), three things are displayed.
* 1) Prev and Next Button for your convenience  
* 2) Text summary
* 3) (***Main***) Visualiztaion of the texts with keywords and company infos


## Usages

### Upload a file to analyze
Firstly, upload a text file (`.txt`) to analyze. For simplicity, the file **SHOULD** have single column. Header (if exists) will become the first row.

Before a file is uploaded, the default file provided will be used instead.

[<img src="https://github.com/staedi/spacy_visualize/raw/main/images/upload.png" width="400" />](https://github.com/staedi/spacy_visualize/raw/main/images/upload.png)

### Enter Keywords
Keywords search allows AND and/or OR operation.
When searching the terms, case sensitivity is ignored. 

For **AND** operation, use `,` (comma) separator (w/space allowed) and for **OR** operation, use `;` (colon) separator (w/space allowed).

For example,
```
microsoft,chatgpt,ai;earning
```
will construct search terms.
```
(microsoft AND chatgpt AND ai)
OR 
(earning)
```

Be sure to type **Enter** after completing the keywords in the text box.

[<img src="https://github.com/staedi/spacy_visualize/raw/main/images/keywords-textbox.png" width="400" />](https://github.com/staedi/spacy_visualize/raw/main/images/keywords-textbox.png)

### (Optional)Restrict Keywords
Once the keywords are entered, groups of search terms are constructed and shown below.
If you like, you may unselect certain keyword from each group.

[<img src="https://github.com/staedi/spacy_visualize/raw/main/images/keywords-entered.png" width="400" />](https://github.com/staedi/spacy_visualize/raw/main/images/keywords-entered.png)

### Select Article
Once the entered search terms are processed (articles containing those terms are searched), the bottom `selectbox` populates available article to parse (Initially, set to ***None***).
Select an article you want to parse.

Be advised that once selected, the `selectbox` turns back to **None**, which is normal.

[<img src="https://github.com/staedi/spacy_visualize/raw/main/images/selectbox.png" width="400" />](https://github.com/staedi/spacy_visualize/raw/main/images/selectbox.png)


## Parsing features

### Keywords 
Basically, this visualization aims at highlighting keywords in the article. Found search terms within the article are higlighted according to their **group**, which is shown below the textbox you wrote the search terms.

### Company
Additionally, pre-populated names or relevant services or products of companies are higlighted as well. They are labelled with their **ticker** in the ***US*** (`NYSE`, `NASDAQ`) or ***KR*** (`KOSPI`, `KOSDAQ`) markets.

![](https://github.com/staedi/spacy_visualize/raw/main/images/text.png)