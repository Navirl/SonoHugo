---
title: "default"
date: 2024-12-21T15:11:46+09:00
---
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
+++
