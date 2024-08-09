<template>
  <div>
    <Navbar @search="applySearch" />
    <Products :searchQuery="searchQuery"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Products from '../components/Products.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Products,
    Footer,
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    applySearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style scoped>
/* Home.vue specific styles */
</style>
