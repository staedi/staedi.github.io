---
layout: home
title: Miscellaneous
nav_order: 3
permalink: /articles/misc
parent: Articles
---

# Articles

### Miscellaneous tips and tricks

<!-- {% for category in site.tags %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %} -->

<ul>
  {% assign sorted-posts = site.posts | sort_by: 'last_modified_date', 'post_date' %}
  {% for post in sorted-posts %}{% if post.draft != true %}
  {% if post.categories[0] == 'misc' %}
    <li>
      {% octicon pencil height:16 fill:"#586069" aria-label:pencil %} <a href="{{ post.url }}">{{ post.title }}</a>
      <time datetime="{{ page.date | date_to_xmlschema }}" class="post-date">{{ post.date | date_to_string }}</time>
    </li>
  {% endif %}{% endif %}{% endfor %}
</ul>

