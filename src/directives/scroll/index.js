/**
* Created by Wu Jian Ping on - 2019/07/02.
*/

import Vue from 'vue'
import VIscroll from './scroll'

Vue.use(VIscroll, {
  scrollbar: { fade: false, interactive: true },
  mouseWheel: true,
  interactiveScrollbars: true,
  disableTouch: true,
  stopPropagation: true,
  disableMouse: false,
  disablePointer: true
  // preventDefault: false
})
