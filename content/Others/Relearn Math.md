---
title: "Relearn Math"
date: 2024-12-21T15:13:35+09:00
tags:
 - Program/Math
---
relation:
 - [UCSheet](CS_and_SR/Unity%20Cheat%20Sheet.md)
 - [UE4_cheat_sheet](../Unreal%20Engine%20Cheat%20Sheet.md)

## Cross
外積。返ってくるのは **$\vec{a}$と$\vec{b}$について垂直**で、 **$\vec{a}$と$\vec{b}$が作る平行四辺形の面積と大きさが一致する** ベクトル。
それ二つあるじゃん、となる。そのどちらを取るかは右ねじでわかる。指の付け根側のベクトルから掛けて、親指方向に出ていくのが外積ベクトル。

当然、順序を変えれば逆方向に伸びるし、掛けるベクトルの方向が同じなら0になる。

$\vec{a} \times \vec{b} = |a| |b| \sin \theta \hat{n}$

### 計算法1
いつもの。

$\vec{a} = \begin{pmatrix} a_1\\a_2\\a_3 \end{pmatrix}$、
$\vec{b} = \begin{pmatrix} b_1\\b_2\\b_3 \end{pmatrix}$  として
$\vec{a} \times \vec{b} = \begin{pmatrix}a_2b_3-a_3b_2\\a_3b_1-a_1b_3\\a_1b_2-a_2b_1\end{pmatrix}$

### 計算法2
計算法1は計算で出せる。
ベクトルの書き方として、$a = a_1e_1+a_2e_2+a_3e_3$というのがあるので、これを掛け算する。eはそれぞれの単位ベクトル。即ち$e_1 = (1,0,0),e_2 = (0,1,0),e_3 = (0,0,1)$。

計算を始める前に、$e_i \times e_j = e_k$を定義。計算すると分かるが、これは$\begin{align*} \left\{\begin{matrix} \boldsymbol{e}_{1}\times\boldsymbol{e}_{2}=\boldsymbol{e}_{3}\\ \boldsymbol{e}_{2}\times\boldsymbol{e}_{3}=\boldsymbol{e}_{1}\\ \boldsymbol{e}_{3}\times\boldsymbol{e}_{1}=\boldsymbol{e}_{2} \\\boldsymbol{e}_{j}\times\boldsymbol{e}_{i}=-\boldsymbol{e}_{k}\\\boldsymbol{e}_{i}\times\boldsymbol{e}_{i}=0 \end{matrix}\right.\end{align*}$という性質を持つので、これを利用して$\vec{a}\times\vec{b}$を計算する。

$\begin{align*}  \boldsymbol{a}\times\boldsymbol{b}&=(a_{1}\boldsymbol{e}_{1}+a_{2}\boldsymbol{e}_{2}+a_{3}\boldsymbol{e}_{3})\times (b_{1}\boldsymbol{e}_{1}+b_{2}\boldsymbol{e}_{2}+b_{3}\boldsymbol{e}_{3})\\  &=a_{1}b_{1}\boldsymbol{e}_{1}\times\boldsymbol{e}_{1}+a_{1}b_{2}\boldsymbol{e}_{1}\times\boldsymbol{e}_{2}+a_{1}b_{3}\boldsymbol{e}_{1}\times\boldsymbol{e}_{3}\\  &=a_{2}b_{1}\boldsymbol{e}_{2}\times\boldsymbol{e}_{1}+a_{2}b_{2}\boldsymbol{e}_{2}\times\boldsymbol{e}_{2}+a_{2}b_{3}\boldsymbol{e}_{2}\times\boldsymbol{e}_{3}\\  &=a_{3}b_{1}\boldsymbol{e}_{3}\times\boldsymbol{e}_{1}+a_{3}b_{2}\boldsymbol{e}_{3}\times\boldsymbol{e}_{2}+a_{3}b_{3}\boldsymbol{e}_{2}\times\boldsymbol{e}_{3}\\  &=(a_{2}b_{3}-a_{3}b_{1})\boldsymbol{e}_{1}+(a_{3}b_{1}-a_{1}b_{3})\boldsymbol{e}_{2}+(a_{1}b_{2}-a_{2}b_{1})\boldsymbol{e}_{3}\tag{4}  \end{align*}$

出せるには出せるが、やっぱり1を覚えたほうが早い。

## 計算法3
[レヴィチヴィタ記号](%E3%83%AC%E3%83%B4%E3%82%A3%E3%83%81%E3%83%B4%E3%82%A3%E3%82%BF%E8%A8%98%E5%8F%B7.md)

これを使い、外積を$a \times b =\begin{pmatrix}\varepsilon_{1jk}a_{j}b_{k}\\\varepsilon_{2jk}a_{j}b_{k}\\\varepsilon_{3jk}a_{j}b_{k}\end{pmatrix}$と表して計算する。

残りのj,kに入る123を一つずつ計算する。すなわち一つの行列要素について9個の項の足し算が入る。

計算し終わると$\begin{align*}  \boldsymbol{a}\times\boldsymbol{b}=\begin{pmatrix}  a_{2}b_{3}-a_{3}b_{2}\\  a_{3}b_{1}-a_{1}b_{3}\\  a_{1}b_{2}-a_{2}b_{1}  \end{pmatrix}  \end{align*}$になる。

[外積とは何か。ベクトルの外積の定義・意味・大きさについて｜アタリマエ！](https://atarimae.biz/archives/23716)
[外積（ベクトル積）とは？具体的な計算方法と力学のモーメントを理解する。｜宇宙に入ったカマキリ](https://takun-physics.net/11678/)
[LaTeXの外積記号-LaTeX-Tutorial.com](https://latex-tutorial.com/cross-product-symbol-in-latex/)