/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 16:49:54
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-25 19:00:52
 */

import PreviewComponent from './preview.vue'
let $vm
export default {
  install (Vue) {
    let Preview = Vue.extend(PreviewComponent)
    if (!$vm) {
      $vm = new Preview({el: document.createElement('div')})
      document.body.appendChild($vm.$el)
    }
    const preview = {
      open (index, list, params) {
        $vm.open(index, list, params)
      },
      close () {
        $vm.close()
      }
    }
    Vue.$preview = preview
    Vue.mixin({
      created () {
        this.$preview = Vue.$preview
      }
    })
  }
}
