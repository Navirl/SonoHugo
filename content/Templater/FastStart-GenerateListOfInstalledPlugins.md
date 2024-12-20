---
title: "FastStart-GenerateListOfInstalledPlugins"
date: 2024-12-20T14:16:44+09:00
---
<% Object.values(app.plugins.manifests).map(p=>p.id).sort((a,b)=>a.localeCompare(b)).join('
') %>
