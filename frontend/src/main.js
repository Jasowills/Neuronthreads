import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './main.css'; // Import your custom CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

// Create Vue app instance
const app = createApp(App);

// Set Axios default baseURL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

// Set Authorization header if token is present in localStorage
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Use router and store in the app
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');
