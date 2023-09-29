import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'; // Importación del router
import store from './store';   // Importación del store

import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(router); // Uso del router
app.use(store);  // Uso del store

app.mount('#app');