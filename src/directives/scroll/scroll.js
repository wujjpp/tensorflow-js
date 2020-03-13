/**
* Created by Wu Jian Ping on - 2019/07/02.
*/

import IScroll from 'better-scroll'
import resizeDetector from 'element-resize-detector'
import _ from 'underscore'

export default {
  install(Vue, options) {
    Vue.directive('scroll', {
      inserted(el, binding, vnode, oldVnode) {
        let vtype = binding.value ? [].toString.call(binding.value) : undefined

        let iscrollOptions = vtype === '[object Object]' ? _.extend(options, binding.value) : options

        el.addEventListener('touchmove', event => {
          event.preventDefault()
        })

        el.scroll = new IScroll(el, iscrollOptions)
        if (binding.value && typeof binding.value === 'function') {
          el.scroll.on('scrollEnd', () => {
            if (el.scroll.y <= el.scroll.maxScrollY) {
              let cb = binding.value
              cb()
            }
          })
        }

        let detector = resizeDetector()
        detector.listenTo(el, _.debounce(() => {
          el.scroll.refresh()
        }, 100))
        el.detector = detector
      },

      update(el, binding, vnode, oldVnode) {
        setTimeout(() => {
          if (el.scroll) {
            el.scroll.refresh()
          }
        }, 50)
      },

      unbind(el, binding, vnode, oldVnode) {
        el.scroll.destroy()
        el.scroll = null
        el.detector.uninstall(el)
        el.detector = null
      }
    })
  }
}
