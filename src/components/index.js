import XtxImgVue from './ImgVue/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    app.component('XtxImgVue', XtxImgVue)
    app.component('XtxSku', XtxSku)
  }
}
