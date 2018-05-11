(function (doc, win) {
  var docEl, resizeEvt, recalc
  docEl = doc.documentElement
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth > 640) {
      docEl.style.fontSize = '100px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)

// dpr
!(function (x) {
  function w () {
    var a = r.getBoundingClientRect().width;
    a / v > 750 && ((a = 750 * v), x.rem = a / 7.5, r.style.fontSize = x.rem + 'px')
  }
  var v, u, t, s, r, q
  s = x.document
  r = s.documentElement
  q = s.querySelector('meta[name="viewport"]')
  if (q) {
    var o = q.getAttribute('content').match(/initial-scale=(["‘]?)([\d.]+)\1?/)
    o && (u = parseFloat(o[2]), v = parseInt(1 / u))
  }
    // if (!v && !u) {
    //     var n = (x.navigator.appVersion.match(/android/gi), x.navigator.appVersion.match(/iphone/gi)), v = x.devicePixelRatio;
    //     v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, u = 1 / v
    // }
  if (!v && !u) {
    // devicePixelRatio这个属性是可以获取到设备的dpr
    var devicePixelRatio = window.devicePixelRatio
    // console.log(devicePixelRatio);
    // console.log(1)
    // 判断dpr是否为整数
    var isRegularDpr = devicePixelRatio.toString().match(/^[1-9]\d*$/g)
    if (isRegularDpr) {
            // 对于是整数的dpr，对dpr进行操作
      if (devicePixelRatio >= 3 && (!v || v >= 3)) {
        v = 1
      } else if (devicePixelRatio >= 2 && (!v || v >= 2)) {
        v = 1
      } else {
        v = 1
      }
    } else {
      // 对于其他的dpr，仍采用dpr为1的方案
      v = 1
    }
    u = 1 / v
  }

  if ((r.setAttribute('data-dpr', v), !q)) {
    if ((q = s.createElement('meta'), q.setAttribute('name', 'viewport'), q.setAttribute('content', 'initial-scale=' + u + ', maximum-scale=' + u + ', minimum-scale=' + u + ', user-scalable=no'), r.firstElementChild)) {
      r.firstElementChild.appendChild(q)
    } else {
      var m = s.createElement('div')
      m.appendChild(q)
      s.write(m.innerHTML)
    }
  }
  x.dpr = v
  x.addEventListener('resize', function () {
    clearTimeout(t)
    t = setTimeout(w, 300)
  }, !1)
  x.addEventListener('pageshow', function (b) {
    b.persisted && (clearTimeout(t), t = setTimeout(w, 300))
  }, !1)
  s.readyState === 'complete' ? s.body.style.fontSize = 12 * v + 'px' : s.addEventListener('DOMContentLoaded', function () {
    s.body.style.fontSize = 12 * v + 'px'
  }, !1)
  w()
}(window))
