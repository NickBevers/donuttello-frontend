import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import "./assets/sass/main.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faEye, faEyeSlash, faEnvelope, faGear } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEye, faEyeSlash, faEnvelope, faGear);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
