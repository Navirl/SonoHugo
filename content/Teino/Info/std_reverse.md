---
title: "std_reverse"
tags:
 - Info
---

date: 2024-12-20T14:08:15+09:00
up:: [Cpp](../Bar/Program/Cpp.md)
source:: [reverse - cpprefjp C++日本語リファレンス](https://cpprefjp.github.io/reference/algorithm/reverse.html)

```cpp
#include <algorithm>
#include <iostream>
#include <string>

int main() {
  std::string str = "reverse";

  std::reverse(str.begin(), str.end());
  std::cout << str << std::endl;
}
```

algorithm.h。要素を逆順にする。
Swappableなクラスでないと使えない。

Swappableでないなら自分でクラスを作るという手がある。

```cpp
template <class BidirectionalIterator>
void reverse(BidirectionalIterator first, BidirectionalIterator last) {
  for ( ; first != last && first != --last; ++first)
    std::iter_swap(first, last);
}
```
