---
title:  "Entity Relations Annotation Dashboard"
date: 2022-06-10
tag: Project
tags: [python, streamlit, nlp, spacy, prodigy, relations]
description: A showcase of Entity Relations Annotation Dashboard with spacy-streamlit and Streamlit
---

It's been a long time since I first pondered a way to simplify a text for easier sentiment analysis. However, as it happens, what I had in mind was too complex to automate, therefore I had to resort to do it manually, resulting in the stoppage. However, I happened to read the articles about **Relation Extractions**, and which is very close to what I hoped to design. For that purpose, I was able to successfully made an Entity Relations Annotation tool in `Streamlit`.


## Why Annotation?

**Relation Extraction** is the process by which we hope to extract how different words/spans entities are related. Most of works on this domain have been done with the **Machine Learning** or **Deep Learning** (mostly with `BERT`).

However, machines cannot learn by itself without any guides. Naturally, there should be the definition they must follow. Therefore, we need annotations for the input to ML / DL processes.


## Motivation

This initial stage of **Relation Extraction** was motivated by `Prodigy`, an advanced annotation tool by [Explosion.ai](https://explosion.ai) (maintainer of [spaCy](http://spacy.io)). Within selected domains, `Prodigy` can automate the annotation process, without much human involvement.

However, financial texts are one of the fields where conventional models do not work well. Also, I defined specific categories how to classify relation of each entity. Therefore, it should be done manually.

However, I chose to do in semi-automated way, that is, using **Tokenizer** and **EntityRecognizer** from `spaCy`, I only modify the entity relations process.

Like `Prodigy`, I present texts to analyze and give predefined categories to choose from. Big thanks to `Streamlit` (as always)!

## Predefined categories / directions

For the purpose of sentiment analysis, I defined both **categories** and **directions**. Here, category focuses on action between entities, and directions identify relative sentiment between them.

### Category Definitions

The following is a proposed categorization of relations between entities. (The example sentences below are not always based on the facts.)

- **Investment**: Buy, Sell, IPO, Privatization, Invest, Bid
    - `Buy` - **Microsoft** agreed to buy stakes in **Activision**. (- / +)
    - `Sell` - **Twitter** announced to sell its large share. (+ / +)
    - `IPO` - **Airbnb** debuted the **NYSE** amid investors’ surging interests. (+ / 0)
    - `Privatize` - **Nvidia** announced its sale of 10% stakes to **Softbank Japan**.
    - `Invest` - **Meta Platforms** invested a large portion of its capital into **metaverse**.
    - `Bid` -
        - **Amazon** lost its bid for the DoD’s cloud project to **Microsoft**.
        - **Oracle** won the bid to become to become the supplier for the DoD’s DARPA project.
- **Cooperation**: Win-win situations (in-tandem)
- **Family / Ownership**: Same line of business (e.g., Franchise)
- **Performance**: Stock market performance
    - `Outperform` - **Microsoft** outperformed the **market** after it released the upbeat Q1 report. (+ / +)
    - `Underperform` - **Apple** trailed its **peers** while the tech index snapped the three-day losing streak. (- / +)
    - `In line` - As with its **peers**, **Nvidia** rallied premarket Monday. (+ / +)
- **Legal**: File, [Sued / Indicted / Subpoenaed / Alleged] (by), Win, Lose  (***Bidirectional***)
    
    <aside>
    💡 Replacement of verbs might be required (**Direction**)
    
    </aside>
    
    - `File` - **Google** filed a lawsuit against **Microsoft**. (+ / -)
    - `Indicted` - **Facebook** executives including Mark Zuckerberg were indicted on charges linked to Cambridge Analytica Scandal **by the DOJ**. (- / 0)
    - `Subpoenaed` - **Senate committee** yesterday issued a subpoena of top executives of social media companies including **Facebook** and **Twitter** related to the Jan 6 Capitol Hill insurrection. (0 / [-, -])
    - `Alleged` - **Microsoft** was alleged **by Google** of having obtained private information of Android OS.
    - `Win`
        - Yesterday, **Microsoft** won the high-stake suit against **Google**.
        - Yesterday, federal court in Sacramento concluded that **Microsoft** did not infringe the right of **Google**.
        - Yesterday, jury rule in favor of **Microsoft** against **Google**.
    - `Lose`
        - On Monday, **Apple** lost its bid to overturn the lawsuit **by Google**.
        - On Monday, **Apple** lost the high-stake suit **by Google**.
        - On Monday, judge ruled out that **Apple** violated **Google**’s copyright.
- **News release**: Launch, Patent, ***Authorization***
    - `Launch` -
        - **Apple** released newer handset of **iPhone** on Monday. (+ / +)
        - **Apple** launched **Apple Card** in Canada Monday. (+ / +)
    - `Patent` - **Apple** filed a patent for **magSafe**, a charging connector for its laptop computers.
    - `Authorize` -
        - **Pfizer** said that during the latest clinical trial, its **vaccine** was proven effective against the virus.
        - **Pfizer** said that during the latest clinical trial, its **vaccine** failed to show meaningful effects against the virus.
        - It was told that **FDA** revoked the recommendation of **J&J**’s one-shot COVID-19 vaccine.
        - **AstraZeneca** released that its **vaccine** won the approval of the Canadian Health authority.
- **Bankruptcy**: Entered, Exited
    - **Motorola** filed the bankruptcy Monday.
    - **Enron** went bankrupt after its ballooning debt went out of control.
    - **Qualcomm** exited its bankruptcy last month.


### Directions encoding

In view of sentiment analyses, directions between each entity is empirical. For the purpose, it makes sense to simplify by only(?) having three labels for the direction. (i.e., **over**, **under**, **[*pos/neg*]-inline**)

- `Over` - **A** verb **B** (A: positive, B: negative)
- `Under` - **A** verb **B** (A: negative, B: positive)
- `Posline` - **A** verb **B** (A: positive, B: positive)
- `Negline` - **A** verb **B** (A: negative, B: negative)
- `Pos` - **A** verb *(B)* (A: positive, B: neutral)
- `Neg` - **A** verb *(B)* (A: negative, B: neutral)


### Relations format

Combining both directions and categories, relations are formed as the following format.

`Direction`-`Category`

For instance, in the first sentence (**Microsoft** agreed to buy stakes in **Activision**.), the relation between `Microsoft`-`Activision` is `Under`-`Buy`.

It is because Microsoft is given inferior sentiment in the act of buying Activision. (Inferior sentiment in financial context)


## Sample Snapshot

![](https://github.com/staedi/rel_annotate/raw/main/assets/rel_annotate.png)