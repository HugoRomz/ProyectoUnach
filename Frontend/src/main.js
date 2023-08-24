import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primeicons/primeicons.css';

import router from './router/'; // Asegúrate de tener este import

createApp(App).use(router).mount('#app');
