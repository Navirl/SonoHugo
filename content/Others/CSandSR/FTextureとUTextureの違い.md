---
title: "FTextureとUTextureの違い"
date: 2024-12-21T15:12:24+09:00
---
https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/Engine/UTexture/
https://docs.unrealengine.com/4.26/en-US/API/Runtime/RenderCore/FTexture/

元になるものから違う。
FTextureはRenderCoreからの派生に対し、UTextureはEngineから。

/Engine/Source/Runtime/RenderCore/Public/RenderResource.h

/Engine/Source/Runtime/Engine/Classes/Engine/Texture.h
