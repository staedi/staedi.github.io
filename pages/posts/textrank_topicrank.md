---
title:  "TextRank and TopicRank with their Graph Visualizations"
date: 2021-08-08
tag: NLP
tags: [python, topicrank, textrank, networkx, pke, nlp]
description: A simple introduction to Keyword Extraction with TextRank and TopicRank
---

Among applications of Natural Language Processing (NLP), **Keyword Extraction** is the crucial field not to be glossed over. While many of NLP look promising and interesting, this is rather a foundational stack for more advanced applications and is difficult.


## Keyword Extraction

When a wanna-be NLP practitioners, like myself a few months back, think about projects they want to delve into, or even have heard about, I don't think **Keyword Extraction** would top the chart. Mostly the answers would be *Sentiment Analyses*, *Machine Translation* to name a few.

While those two applications can be the final outcomes by themselves, it doesn't apply to Keyword Extraction. It's supposed to be basis for other applications and this is what I think the reason why many people doesn't regard crucial as others. Also, intuitively, it doesn't seem so difficult at least we think.

However, we don't want to extract every possible words in the text and we want important words, hence **key**words, only. Naturally, that leads to make use of the advanced topic in Computer Science, **Graph** to extract relationships between words.

> Note: This doesn't mean it can only be implemented with graphs only. In fact, there are other algorithms employing **statistical** methods or **supervised** way too (Graph-based or stat-based methods are **unsupervised** ones on the other hand).

## TextRank and TopicRank

From the name of these two algorithms, intuitively we know that these algorithms somehow calculate ranks among words.

As the technical details between them are not my concerns, I'll just quickly point the key differences.

### TextRank

**TextRank** is one of the earliest graph-based *Keyword Extraction* algorithms based on **PageRank**. 

If you are old enough to have used Google Toolbar, you might remember **PageRank** on the toolbar. It calculated the importance of each web page with its inbound and outbound links. It was also the core algorithm on which **Google Search** was designed by *Sergey Brin*. In turn, it is also the algorithm most graph-based keyword extraction methods are based on, **TextRank** included.

Rather than applying on web pages, TextRank applies that on words (**Nouns** mostly) on the text.

Since this was the earliest and performant algorithm, many following algorithms set this as the benchmark for their own.

### TopicRank

Intuitively, **TopicRank** should rank the importance of topics, according to its name. Then questions remains of what those **topics** are. Rather than high-level summarizing topics, this just means clusters of words in the text. Specifically, phrases that have common words (at least 1/4 of the whole) are formed clusters.

On the other hand, in **TextRank**, each words/phrases do not form a cluster and therefore graphs formed from them look messy compared to **TopicRank** (too many nodes).

Another crucial difference is that TopicRank forms a complete graph, meaning each node is interconnected, which is not the case in TextRank.

## Graph Representations

I tested two algorithms and visualized using `networkx` (obviously!) and `matplotlib`.

Used texts are as follows.

Korean
> '5일 블룸버그통신에 따르면 블랙록, 스테이트 스트리트, JP모간 자산운용, UBS 자산운용 등 세계 최대 규모 자산운용사들은 올해 하반기에도 주식시장이 계속해서 오를 것이란 전망을 제시하고 있다. MSCI 전 국가 세계 지수가 올해 12.5% 상승하며 역대 고점까지 올랐지만 추가 상승 가능성이 높다는 것이다.'

English
>'A mathematical model of ion exchange is considered, allowing for ion exchanger compression in the process of ion exchange. Two inverse problems are investigated for this model, unique solvability is proved, and numerical solution methods are proposed. The efficiency of the proposed methods is demonstrated by a numerical experiment.'

By comparing graphs below, you'll easily grasp the idea that TopicRank forms the complete graph while the other doesn't.

### TextRank

Korean
![](https://github.com/staedi/pke_u/raw/main/graphs/textrank_ko.png)

English
![](https://github.com/staedi/pke_u/raw/main/graphs/textrank_en.png)

### TopicRank

Korean
![](https://github.com/staedi/pke_u/raw/main/graphs/topicrank_ko.png)

English
![](https://github.com/staedi/pke_u/raw/main/graphs/topicrank_en.png)
