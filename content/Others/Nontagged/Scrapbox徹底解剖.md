---
title: "Scrapbox徹底解剖"
date: 2024-12-20T14:03:44+09:00
tags:
 -
---

```javascript
function DeleteButton({ project: n, page: i, updateState: s }) {
  var w = (function () {
    var _ = (function _asyncToGenerator(n) {
      return function () {
        var i = this,
          s = arguments
        return new Promise(function (_, w) {
          var P = n.apply(i, s)
          function _next(n) {
            asyncGeneratorStep(P, _, w, _next, _throw, 'next', n)
          }
          function _throw(n) {
            asyncGeneratorStep(P, _, w, _next, _throw, 'throw', n)
          }
          _next(void 0)
        })
      }
    })(function* () {
      try {
        if (!confirm('Are you sure you want to delete "'.concat(i.title, '"?')))
          return
        yield $.apiClient.delete(
          '/api/deleted-pages/'.concat(n.name, '/').concat(i.id),
        ),
          s({ deletedPage: null }),
          ne.default.Stream.reload()
      } catch (P) {
        var _, w
        console.error(P),
          alert(
            (null === (_ = P.response) ||
            void 0 === _ ||
            null === (w = _.data) ||
            void 0 === w
              ? void 0
              : w.message) || P.message,
          )
      }
    })
    return function onClick() {
      return _.apply(this, arguments)
    }
  })()
  return _.default.createElement(
    j.default,
    { role: 'button', onClick: w },
    'Delete',
  )
}

```