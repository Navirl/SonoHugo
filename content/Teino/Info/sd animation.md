---
tags:
  - Info
---

date:: [2024-06-03](/Daily_Note/2024-06-03.md)
up:: [sd](../Bar/Stable%20Diffusion.md)

[周りと同じものを学んでも知識交換はできない - 西尾泰和のScrapbox](https://scrapbox.io/nishio/%E5%91%A8%E3%82%8A%E3%81%A8%E5%90%8C%E3%81%98%E3%82%82%E3%81%AE%E3%82%92%E5%AD%A6%E3%82%93%E3%81%A7%E3%82%82%E7%9F%A5%E8%AD%98%E4%BA%A4%E6%8F%9B%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84)

## SVD
stable video diffusion。txt2vid。というかimg2vid。
1024x576、25フレームが生成できる。

[stabilityai/stable-video-diffusion-img2vid-xt-1-1 · Hugging Face](https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt-1-1)
[Stable Video Diffusion - SVD - img2vid-xt-1.1 | Stable Diffusion Checkpoint | Civitai](https://civitai.com/models/207992?modelVersionId=329995)

xtは14から25にフレーム伸ばしたバージョン。
1.1は特殊な設定のみと多様性を犠牲にする代わりに一貫した出力を得るバージョン。

comfyuiだと標準ノードだけで組める。
Interpolarionを挟めばいい感じ。

[How to run Stable Video Diffusion img2vid - Stable Diffusion Art](https://stable-diffusion-art.com/stable-video-diffusion-img2vid/#Use_Stable_Video_Diffusion_with_ComfyUI)
[Quickstart Guide to Stable Video Diffusion - Civitai Education](https://education.civitai.com/quickstart-guide-to-stable-video-diffusion/)

colabがあるので試したいなら。

[GitHub - sagiodev/stable-video-diffusion-img2vid](https://github.com/sagiodev/stable-video-diffusion-img2vid/)

動きを大きくする設定がある。
また、fpsを下げるとより動くようになる。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/184e9zj/svd_testing_different_motion_settings/)
[Reddit - Dive into anything](https://www.reddit.com/r/comfyui/comments/18mmvt2/thoughts_on_getting_svd_stable_video_diffusion/)

wav2lipを直接合わせると、一枚一枚にそれを適用してしまうためおかしくなる。


## AnimateDiff
画像生成フローにMotion Moduleをくっつけ、一枚絵に動きを付ける。既存の画風を使える。
動きはMotionLoRAという物で制御可能。プロンプト制御もできるし、別の動画のモーションだけを取り出して適用するMotionDirectorというのもある。

[🦊AnimateDiff - work4ai](https://scrapbox.io/work4ai/%F0%9F%A6%8AAnimateDiff)
[guoyww/animatediff at cd71ae134a27ec6008b968d6419952b0c0494cf2](https://huggingface.co/guoyww/animatediff/tree/cd71ae134a27ec6008b968d6419952b0c0494cf2)

現在v3だが、結構ちらつきは気になる。
ちらつきはdeflickerエフェクトで何とかなるが、別にそれで自然なアニメーションになるわけではない。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/11dhvt3/using_deflicker_in_davinci_resolve/)
[All-In-One-Deflicker - work4ai](https://scrapbox.io/work4ai/All-In-One-Deflicker)

wav2lip Refine
[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1b355tu/make_better_dialogues_with_this_new_lip_sync/)
[\[v3.0\]  LipSync Swapper + Face Fix | Patreon](https://www.patreon.com/posts/v3-0-lipsync-fix-99387166)

1フレームごとに既にwav2lipした動画とReactorをかける手法。
2passにすることでより色などに左右されずにlipsync済の顔を作る。

mm_sd_v15は細かな動きに合わせて調整されている。mm_sd_v14はぼやける。

[GitHub - ArtVentureX/comfyui-animatediff: AnimateDiff for ComfyUI](https://github.com/ArtVentureX/comfyui-animatediff?tab=readme-ov-file#gif-has-wartermark-especially-when-using-mm_sd_v15)

lightningバージョンがある。

[ByteDance/AnimateDiff-Lightning · Hugging Face](https://huggingface.co/ByteDance/AnimateDiff-Lightning)

V3ならSparsectrlにより、複数の画像を入力にできる。

[【ComfyUI + AnimateDiff】SparseCtrlで一貫性のあるAIアニメーション作れるんじゃね？｜花笠万夜](https://note.com/hanagasa_manya/n/n582b5fb724a5)

Fizz-nodesのbatch prompt scheduleを使用すると、各フレームごとにプロンプトを指定できる。

[【Stable-Diffusion】🔰無線化でスッキリ！ComfyUI版 AnimateDiffの基本(txt2mov編) #stablediffusion #comfyui #animatediff - YouTube](https://www.youtube.com/watch?v=EuvDlaqt9kY)

motion_scaleは動きの量。
背景が動きすぎる場合は減らす。

背景を変更するために、一回作成→SAMで切り抜いてMASK化+ブラー、inpaintで描き直しという方法がある。
inpaint後にまた切り抜かなければならないのでカラーバックを使用する。カラーバックの値に再生成の色が影響を受けるので注意。
じゃあバック無きゃいいじゃんというとこだけど、いかんせんComfyUIも生成AIもαを扱えないみたいなので。

[【Stable-Diffusion】🔰人物と背景を合成！ComfyUIでAnimatediff ＜マスクと合成編：後編＞ #animatediff  #sam #ipadapter - YouTube](https://www.youtube.com/watch?v=hULnILp-24E)


## Reactor
顔スワップ。複数枚を処理して、Interpolationすることでちらつき少なめに動画を製作できる。
4フレーム落としがギリギリ使える。


## ToonCrafter
二枚のアニメ画像の間を埋める。他にも複数枚のスケッチを合わせることでその移動を綺麗にしたり、スケッチの動画があるならそれに一枚絵の色を乗せたりできる。

[GitHub - ToonCrafter/ToonCrafter: a research paper for generative cartoon interpolation](https://github.com/ToonCrafter/ToonCrafter)

## DragNUWA
方向をマウスで指定する。

[GitHub - chaojie/ComfyUI-DragNUWA](https://github.com/chaojie/ComfyUI-DragNUWA)

## Dynamicrafter
txt2vid。非商用。12f。
GPU メモリ : 18.3GB (576x1024)、12.8GB (320x512)、11.9GB (256x256)。

[Reddit - Dive into anything](https://www.reddit.com/r/DynamiCrafter/comments/1bfmgrc/informations_about_dynamicrafter/)
[Doubiiu/DynamiCrafter\_512 · Hugging Face](https://huggingface.co/Doubiiu/DynamiCrafter_512)

拡張機能にはキーフレーム生成機能がついてくるっぽい。

[Add prompt batch separation with the "|" character by phr00t · Pull Request #7 · kijai/ComfyUI-DynamiCrafterWrapper · GitHub](https://github.com/kijai/ComfyUI-DynamiCrafterWrapper/pull/7)

SVDと比べ、プロンプトで生成結果を操作できるのが良い。
VideoCrafterの派生らしい。

[Reddit - Dive into anything](https://www.reddit.com/r/StableDiffusion/comments/1bfjn7d/tencent_announces_dynamicrafter_update/)

その他、スタイルを転写するStyleCrafterとかいろいろあって本当に研究。

## AniPortrate
フォトリアリスティックなポートレートをオーディオ駆動で動かす。

[GitHub - Zejun-Yang/AniPortrait: AniPortrait: Audio-Driven Synthesis of Photorealistic Portrait Animation](https://github.com/Zejun-Yang/AniPortrait)

## champ
depthやsegmentのアニメーションから絵を作る。
既にVideoがある時用。

[GitHub - kijai/ComfyUI-champWrapper: Champ: Controllable and Consistent Human Image Animation with 3D Parametric Guidance](https://github.com/kijai/ComfyUI-champWrapper)

## MotionDiff
Videoからdepthやsegmentのアニメーションを得る。

[GitHub - Fannovel16/ComfyUI-MotionDiff: Implementation of MDM, MotionDiffuse and ReMoDiffuse into ComfyUI](https://github.com/Fannovel16/ComfyUI-MotionDiff)

