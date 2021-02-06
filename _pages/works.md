---
layout: home
title: Works
permalink: /posts/works
nav_order: 3
---

# Projects

<!-- {% for category in site.categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} -->

<ul>
  {% assign sorted-posts = site.posts | sort_by: 'post_date' %}
  {% for post in sorted-posts %}{% if post.draft != true %}
  {% if post.categories[0] == 'works' %}
    <li>
      {% octicon tasklist height:16 fill:"#586069" aria-label:tasklist %} <a href="{{ post.url }}">{{ post.title }}</a>
      <time datetime="{{ page.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time>
    </li>
  {% endif %}{% endif %}{% endfor %}
</ul>

