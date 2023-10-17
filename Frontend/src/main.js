import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Router import
import store from './store';   // Store import

import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(router); // Use the router
app.use(store);  // Use the store

app.mount('#app');
