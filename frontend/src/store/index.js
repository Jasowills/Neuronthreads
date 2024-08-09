import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router/index';

const store = createStore({
  state: {
    products: [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || '',
    tokenExpiration: localStorage.getItem('tokenExpiration') || null,
    loading: true,
    notifications: [], // Add notifications state
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
      state.loading = false;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
    },
    setToken(state, { token, expiration }) {
      state.token = token;
      state.tokenExpiration = expiration;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', expiration);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    clearAuthData(state) {
      state.token = '';
      state.user = null;
      state.tokenExpiration = null;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = '';
    },
    updateProductInState(state, updatedProduct) {
      const index = state.products.findIndex(product => product._id === updatedProduct._id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(product => product._id !== productId);
    },
    addNotification(state, notification) {
      state.notifications.push(notification);
      setTimeout(() => {
        state.notifications.shift();
      }, 3000); // Remove notification after 5 seconds
    },
    removeNotification(state, index) {
      state.notifications.splice(index, 1);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/products');
        commit('setProducts', response.data);
        commit('addNotification', { type: 'success', message: 'Products fetched successfully!' });
      } catch (error) {
        console.error('Failed to fetch products:', error);
        commit('addNotification', { type: 'error', message: 'Failed to fetch products.' });
      }
    },
    async login({ commit }, userData) {
      try {
        const response = await axios.post('/auth/login', userData);
        const token = response.data.token;
        const user = response.data.user;
        const expiration = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours expiration
        commit('setUser', user);
        commit('setToken', { token, expiration });
        commit('addNotification', { type: 'success', message: 'Login successful!' });
        router.push('/');
      } catch (error) {
        console.error('Failed to login:', error);
        commit('addNotification', { type: 'error', message: 'Login failed.' });
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/auth/register', userData);
        const token = response.data.token;
        const user = response.data.user;
        const expiration = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours expiration
        commit('setUser', user);
        commit('setToken', { token, expiration });
        commit('addNotification', { type: 'success', message: 'Registration successful!' });
        router.push('/');
      } catch (error) {
        console.error('Failed to register:', error);
        commit('addNotification', { type: 'error', message: 'Registration failed.' });
      }
    },
    async addProduct({ state, commit }, product) {
      try {
        const response = await axios.post('/products', product, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('ADD_PRODUCT', response.data);
        commit('addNotification', { type: 'success', message: 'Product added successfully!' });
      } catch (error) {
        console.error('Failed to add product:', error);
        commit('addNotification', { type: 'error', message: 'Failed to add product.' });
      }
    },
    async updateProduct({ state, commit }, updatedProduct) {
      try {
        const response = await axios.put(`/products/${updatedProduct._id}`, updatedProduct, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('updateProductInState', response.data);
        commit('addNotification', { type: 'success', message: 'Product updated successfully!' });
      } catch (error) {
        console.error('Failed to update product:', error);
        commit('addNotification', { type: 'error', message: 'Failed to update product.' });
      }
    },
    async deleteProduct({ state, commit }, productId) {
      try {
        await axios.delete(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        commit('DELETE_PRODUCT', productId);
        commit('addNotification', { type: 'success', message: 'Product deleted successfully!' });
      } catch (error) {
        console.error('Failed to delete product:', error);
        commit('addNotification', { type: 'error', message: 'Failed to delete product.' });
      }
    },
    checkTokenExpiration({ commit }) {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date().getTime() > tokenExpiration) {
        commit('clearAuthData');
        commit('addNotification', { type: 'info', message: 'Session expired. Please log in again.' });
      }
    },
  },
  getters: {
    products: state => state.products,
    loading: state => state.loading,
    isAuthenticated: state => !!state.token && new Date().getTime() <= state.tokenExpiration,
    user: state => state.user,
    notifications: state => state.notifications, // Add a getter for notifications
  }
});

export default store;
