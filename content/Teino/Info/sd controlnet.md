---
date: 2024-12-21T15:19:22+09:00
title: "sd controlnet"
tags:
  - Info
aliases:
  - sd CN
---

daily:: [2024-03-30](/Daily_Note/2024-03-30.md)
up:: [Stable Diffusion](../Bar/Stable%20Diffusion.md)

便利機能詰め合わせ。
XLはPonyとAnimagineでつかうモデルが異なることも。

らくがき
[ControlNet 852\_a\_scribble\_xl - veryhard | Stable Diffusion Controlnet | Civitai](https://civitai.com/models/455392?modelVersionId=506961)
黒地白線からの色付け。
[kataragi/ControlNet-LineartXL · Hugging Face](https://huggingface.co/kataragi/ControlNet-LineartXL)
白地黒線からの色付け。
[kataragi/controlnetXL\_line2color at main](https://huggingface.co/kataragi/controlnetXL_line2color/tree/main)

ボックス内ならなんでもいいよ
[LooseControl--Use the box depth map to control the protagonist position - v1.0 | Stable Diffusion Controlnet | Civitai](https://civitai.com/models/232042/loosecontrol-use-the-box-depth-map-to-control-the-protagonist-position)

canny,scribble
[xinsir (qi)](https://huggingface.co/xinsir)


sdxlのモデルはここ。
[bdsqlsz/qinglong\_controlnet-lllite at main](https://huggingface.co/bdsqlsz/qinglong_controlnet-lllite/tree/main)
[lllyasviel/sd\_control\_collection · Hugging Face](https://huggingface.co/lllyasviel/sd_control_collection)

sd1.5
[ControlNet model download · lllyasviel/stable-diffusion-webui-forge Wiki · GitHub](https://github.com/lllyasviel/stable-diffusion-webui-forge/wiki/ControlNet-model-download)
[lllyasviel/ControlNet-v1-1 at main](https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main)
[comfyanonymous/ControlNet-v1-1\_fp16\_safetensors at main](https://huggingface.co/comfyanonymous/ControlNet-v1-1_fp16_safetensors/tree/main)


## Openpose
骨格関係。ControlNet最大の目玉。

画像→骨格にはPreprocessorという物が必要。これはwebuiなら初回適用時に自動でインストールされる。
いろいろ種類があったが、今はdw_openpose_fullという物以外を使う意味はない。商用利用可能。

骨格→画像に使うモデルは自分でDL。

骨格を既に持っている場合は、PreprocessorをNoneにして実行する。
[How to Use Open Pose & ControlNet in Stable Diffusion - Next Diffusion](https://www.nextdiffusion.ai/tutorials/how-to-use-open-pose-controlnet-in-stable-diffusion)

ちなみにBlenderでこのボーンを作る機能もあったり。
[Character bones that look like Openpose for blender \_ Ver\_96  Depth+Canny+Landmark+MediaPipeFace+finger](https://toyxyz.gumroad.com/l/ciojz)

モデルごとの違い。
[ControlNet OpenPoseモデルによる出力の違い - Stable Diffusion Tips | iPentec](https://www.ipentec.com/document/stable-diffusion-controlnet-differences-in-output-depending-on-openpose-models)

animal。
[huchenlei/animal\_openpose · Hugging Face](https://huggingface.co/huchenlei/animal_openpose)

えでぃた
[3D Openpose Editor](https://zhuyu1997.github.io/open-pose-editor/)
## Shuffle
絵柄の雰囲気を保ったまま別の画像が描ける。
直接img2imgするとポーズや人物も大体決まってしまうが、それよりもう少し柔軟に雰囲気だけ取り出す感じ。

歪ませたりカラー抽出したりいろいろある。

## T2I-Adapter
Controlnetの中にあるが、Controlnetの亜種っぽい奴。
Shuffleと同じStyle転送、openposeなどに加え、それらの処理の結合を公式サポートしている。
[【T2I-Adapter・ControlNet】画像によるスタイルの適用  |  ジコログ](https://self-development.info/%E3%80%90t2i-adapter%E3%83%BBcontrolnet%E3%80%91%E7%94%BB%E5%83%8F%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%AE%E9%81%A9%E7%94%A8/)

Controlnetよりも軽いらしい。
[Google Colab で T2I-Adapter-SDXL を試す｜npaka](https://note.com/npaka/n/n4e5a290ba344)

[TencentARC/T2I-Adapter at main](https://huggingface.co/TencentARC/T2I-Adapter/tree/main/models)
[TencentARC/t2i-adapter-lineart-sdxl-1.0 at main](https://huggingface.co/TencentARC/t2i-adapter-lineart-sdxl-1.0/tree/main)

## IP-Adapter
同じ顔のキャラクターの違う構図を生成する。亜種。
img2imgのキャラに、ControlNetのポーズを取らせる。
Control Weight値を上げれば元の絵により近づく。

Full-faceは顔特化。

LicenseはApatch。
[h94/IP-Adapter at main](https://huggingface.co/h94/IP-Adapter/tree/main/sdxl_models)
[【Stable Diffusion】「IP-Adapter」の使い方！元画像から類似の画像を生成する方法  |  イクログ](https://ikuriblog.com/how-to-use-ip-adapter/)
[How To Use IP-Adapter Models for Image Prompting (A1111) - Next Diffusion](https://www.nextdiffusion.ai/tutorials/how-to-use-ip-adapter-models-for-image-prompting-a1111)
[IP-Adapters: All you need to know - Stable Diffusion Art](https://stable-diffusion-art.com/ip-adapter/)

img2imgに入った絵の顔を保ったままに、ControlNet上の画像の特徴を追加する。
なので背景を追加するといった使い方も可能。というかこっちが元。


顔特化のIP-Adapter-FaceIDもある。元のIP-AdapterにFaceIDを追加し、より正確性を増したバージョン。
複数枚を一気に食わせてさらに正確性を高めるportraitモデルも追加されている。
ただしこちらはInsightFaceを使用した関係で非営利ライセンス。

[Face ID license and redist of the lora version · Issue #188 · tencent-ailab/IP-Adapter · GitHub](https://github.com/tencent-ailab/IP-Adapter/issues/188)

効く量をLoRAで指定するので、LoRAモデルも必要。

[h94/IP-Adapter-FaceID · Hugging Face](https://huggingface.co/h94/IP-Adapter-FaceID)
[StableDiffusionで同じ顔のAI美女を作る方法『IP-Adapter FaceID』の使い方](https://ai-freak.com/faceid/)

## Reference only
元画像の特徴を残したまま別の絵を作る。いわゆる絵をプロンプトとして使う機能。
IP-Adapterと違い構図やら背景やら元絵の特徴を強く引き継いでしまうため、最初から背景無しで作った絵とかじゃないと今はもう使えない。

## Photomaker
3D用の顔一致。
入力がRealisticの実という意味で、そこからの変換はStylizationも可能。

[TencentARC/PhotoMaker · Hugging Face](https://huggingface.co/TencentARC/PhotoMaker)

## InstantID
Photomakerの後継。IP-Adapterと同じタイプ。亜種。元写真はカラーを使うと精度が上がる。

[GitHub - InstantID/InstantID: InstantID : Zero-shot Identity-Preserving Generation in Seconds 🔥](https://github.com/InstantID/InstantID)

## MistoLine
SDXL用。CannyやSoftEdgeやScribbleやらの統合版。
商用利用する際は適切な表示が必要になる。

プリプロセッサとしてAnyLineという物がついてくる。

AnyLineかけない場合は、構図と明暗を維持して絵を作ることもできる……そっちがメイン？

公式でmistoLine_rank256推奨。

[GitHub - TheMistoAI/MistoLine: A Versatile and Robust SDXL-ControlNet Model for Adaptable Line Art Conditioning](https://github.com/TheMistoAI/MistoLine)

## Anystyle
構図と明暗を維持して絵を作る。
Dev版のAnytestのAはAnimagine、PはPony。dimはllliteじゃないやつ。PMはAとPの事前マージをベースに。
[x.com](https://x.com/nana_tsukisuwa/status/1782186812846543000)

anytestはv3が正確、v4がちょっとガバらしい。
[SDXL用ControlNetモデルの使い方【Anytest + ComfyUI】](https://sorenuts.jp/11742/)
でも試してるとv4で全部いい気がしてくる。

手と顔さえあれば体を生成してくれる。
[x.com](https://x.com/nana_tsukisuwa/status/1796855622585205176)

## LLLite
ControlNetのちょっと変更ver。clipじゃなくmodelにかかるのでちょっとどころじゃないが。
ComfyUIで使うとなんかやたら重い。

## 応用

- DazでキャラとNormal抜き、ついでに背景のNormalを取る
- 一度キャラをNormalで生成、髪と元でキャラだけ切抜き
- 二人を合わせてタネ画像を作る
- Depthをかけ、再生成
- Facedetailerで顔を修正(lamaで一人だけにして確実に顔を取っている)
[キャラクター描き分け ComfyUI ワークフローの解説｜pipix＠シュガーナイト](https://note.com/pipix/n/ne8fca20b70a2)

## X-Adapter
SD1.5のモデルをSDXLで使う。
ControlNetもLoRAもいけるみたい？

[GitHub - showlab/X-Adapter: \[CVPR 2024\] X-Adapter: Adding Universal Compatibility of Plugins for Upgraded Diffusion Model](https://github.com/showlab/X-Adapter)

ComfyUIで動かす無茶苦茶もできる。

[GitHub - kijai/ComfyUI-Diffusers-X-Adapter: ComfyUI diffusers wrapper node X-Adapter testing](https://github.com/kijai/ComfyUI-Diffusers-X-Adapter)

代替として、Latentを直接SDXLに渡せるcustom nodeもあるらしい。
ニューラルネットワーク使用。

[GitHub - city96/SD-Latent-Interposer: A small neural network to provide interoperability between the latents generated by the different Stable Diffusion models.](https://github.com/city96/SD-Latent-Interposer)

凄いように見えて、その実中身はHiresfixらしい。
そのためsd1.5で上手くいかないとsdxlでは使えない。
なのでforgeは実装しない。

[\[Enhancement\] Adding the X-adapter · Issue #2652 · Mikubill/sd-webui-controlnet · GitHub](https://github.com/Mikubill/sd-webui-controlnet/issues/2652#issuecomment-1972292154)

## StarLine
Line2colorをさらに線画に忠実にしたもの。
一度l2cしてから線画太くして線重ねて太くした分を機械的に除去して…ということをやっている。

[GitHub - mattyamonaca/starline: Strict coloring machine for line drawings.](https://github.com/mattyamonaca/starline)

## Tile
大きな画像を小さなタイルに分割し、全体の画像を作る手法。
派生のHyperTileはVAEもtile化している。

resample, color, color + sharpはその順でバージョンアップしたもの。
色がくすまないようにしたもの、鮮明さを追加したもの。

[Control Net v1.1.196に搭載されたTileの新モード：Tile\_colorfixとTile\_colorfix+Sharp｜アリタマナブ](https://note.com/aritamanabu1985/n/n20ff74974218)

## QR
qrコードを埋め込む。
応用でいろいろ埋め込むことが出来る。

## Temporalnet
時間的一貫性を付与する。
SDXL版もある。

[CiaraRowles/TemporalNet · Hugging Face](https://huggingface.co/CiaraRowles/TemporalNet)

## Densepose


## ComfyUI上
合計の強度が1を超えると不味いという噂。

[【Stable-Diffusion】🔰人物と背景を合成！ComfyUIでAnimatediff ＜マスクと合成編：後編＞ #animatediff  #sam #ipadapter - YouTube](https://youtu.be/hULnILp-24E?t=1378)

## Depth
深度情報。
2024/06/15くらいにプリプロセッサ、Depth Anything V2が出た。大体これでいい。

## 852_a_clone
anystyle同様絵の構図を保ったままにする。
i2iだと問題ないが、t2iだと色を雰囲気保ったまま変更してしまう。注意。
絵の構図を保ったままなのでアップスケールに使える。あとAnimatediff。

https://civitai.com/models/463436/controlnet-852aclonexl

## Depth Hand Refiner
手だけ深度情報を取って作り直し、適用することで手を修正する。
中身はGraphomorというもの。[ComfyUI-Impact-Pack](comfy%20Custom%20Nodes.md#ComfyUI-Impact-Pack)でも出た奴。

## 線画の種類
lineart　そんな正確じゃない　雰囲気を変えられる
softedge 正確　hedのほうが忠実
[ControlNet(v1.1)を使って塗り直す方法【Stable Diffusion】 | 謎の技術研究部](https://www.ultra-noob.com/blog/2023/18/)

##