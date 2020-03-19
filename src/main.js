import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(vuetify, {
	iconfont: 'fa',
	icons: {
		video: 'fas fa-video',
		theList: 'fas fa-th-list"'
	}
})

new Vue({
	vuetify,
	render: h => h(App)
}).$mount('#app')
