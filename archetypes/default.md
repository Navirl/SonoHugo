---
title: "default"
date: 2024-12-20T14:03:17+09:00
---
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
+++
