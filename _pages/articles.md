---
layout: home
title: Articles
nav_order: 2
permalink: /posts
has_children: yes
---

# Articles

### For categories, see below

<!-- {% for category in site.tags %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} -->

<!-- <ul>
  {% assign sorted-posts = site.posts | sort_by: 'post_date' %}
  {% for post in sorted-posts %}{% if post.draft != true %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <time datetime="{{ page.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time>
    </li>
  {% endif %}{% endfor %}
</ul> -->

