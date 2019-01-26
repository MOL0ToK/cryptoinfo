import Vue from 'nativescript-vue'
import router from './router'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon'


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './font-awesome.css',
  'ion': './ionicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

Vue.prototype.$router = router

Vue.prototype.$apikey = '76f568923337ff52670dde729d7464aa6e61f6b153bf8158dc3c98ee6975ebc4'

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(router['app'])])
}).$start()
