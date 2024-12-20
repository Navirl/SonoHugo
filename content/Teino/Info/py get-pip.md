---
title: "py get-pip"
tags:
  - Info
---

date: 2024-12-20T14:08:06+09:00
up:: [py](../Bar/Program/Python.md)

たまにpipが無い環境のpythonを触ることがある。
その際にこれを使う。

といっても基本は`python -m ensurepip --upgrade`で済む。
それが効かないときだけ`python get-pip.py`を使う。

[Installation - pip documentation v24.3.1](https://pip.pypa.io/en/stable/installation/)

uvでpypy入れた場合は外部環境になるためpipが入れられない。
uv使う。

[py uv](py%20uv.md)
