import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './main.css'; // Import Tailwind CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);



axios.defaults.baseURL = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

app.use(router);
app.use(store);
app.mount('#app');
