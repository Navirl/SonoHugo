---
title: "FastStart-GenerateListOfInstalledPlugins"
date: 2024-12-21T15:29:45+09:00
---
<% Object.values(app.plugins.manifests).map(p=>p.id).sort((a,b)=>a.localeCompare(b)).join('
') %>
