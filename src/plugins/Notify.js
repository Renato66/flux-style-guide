import Vue from 'vue'
import FAlertController from '../components/FAlert/FAlertController'
import { isSSR } from './Platform.js'

let defaults = {}

function init() {
  if (isSSR) return false

  const node = window.document.createElement('div')
  window.document.body.appendChild(node)

  this.__vm = new Vue(FAlertController)
  this.__vm.$mount(node)
}

export default {
  create(opts) {
    if (isSSR === true || this.__vm === void 0) {
      return () => {}
    }
    return this.__vm.add(opts)
  },
  setDefaults(opts) {
    Object.assign(defaults, opts)
  },
  install(args) {
    if (!isSSR) {
      init.call(this, args)

      args.cfg.notify && this.setDefaults(args.cfg.notify)

      args.$f.notify = this.create.bind(this)
      args.$f.notify.setDefaults = this.setDefaults
    }
  }
}
