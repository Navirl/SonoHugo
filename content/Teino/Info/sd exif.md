---
date: 2024-12-21T15:19:23+09:00
title: "sd exif"
tags:
  - Info
---

daily:: [2024-05-31](/Daily_Note/2024-05-31.md)
up:: [Stable Diffusion](../Bar/Stable%20Diffusion.md)
up:: [sdwebui](../Bar/App/stable-diffusion-webui.md)
up:: [ComfyUI](../Bar/App/ComfyUI.md)

sdwebuiとcomfyuiで情報の保存場所が違う。
sdwebuiはpng:parametersを使うが、comfyuiはpng:promptとpng:workflowを使う。

comfyuiのprompt-reader-nodeでwebp保存すると、EXIF:UserCommentに入る。
この位置はcomfyuiがwebpでワークフローを入れる場所と同じなので、webpの場合はa1111とcomfyuiを選ばなければならない。
