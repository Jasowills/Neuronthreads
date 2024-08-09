<template>
  <div class="search-bar">
    <input 
      type="text" 
      v-model="query" 
      @input="onSearch" 
      class="search-input"
      placeholder="Search"
    />
    <i class="fas fa-search search-icon"></i>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      query: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.query);
    }
  }
};
</script>

<style scoped>
.search-bar {
  position: relative;
  max-width: 300px;
}
.search-input {
  width: 100%;
  padding: 8px 12px 8px 40px; /* Adjust padding to make space for the icon */
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #eee;
  transition: all 0.3s ease;
}
.search-input:focus {
  outline: none;
  border-color: #333;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 14px;
}
.search-input:focus + .search-icon {
  color: #333;
}
</style>
