<template>
  <div class="sidebar">
    <h4>Category</h4>
    <ul>
      <li v-for="category in categories" :key="category">
        
        <a href="#" @click.prevent="toggleCheckbox(category)">{{ category }}</a>
        <input
          type="checkbox"
          :value="category"
          v-model="selectedCategories"
          @change="applyFilter"
         
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ['Shirts', 'Trousers', 'Shoes', 'Accessories', 'Bag'],
      selectedCategories: ['Shirts', 'Trousers', 'Shoes', 'Accessories', 'Bag'],
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter', {
        type: 'category',
        value: this.selectedCategories,
      });
    },
    toggleCheckbox(category) {
      if (this.selectedCategories.includes(category)) {
        this.selectedCategories = this.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        this.selectedCategories.push(category);
      }
      this.applyFilter();
    },
  },
  created() {
    this.applyFilter(); // Emit the initial selected categories when the component is created
  },
};
</script>

<style scoped>
.sidebar {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
}

.sidebar h4 {
  margin-bottom: 10px;
  background-color: #f8f8f8;
  padding: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar ul li {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.sidebar ul li a {
  color: #333;
  text-decoration: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}
</style>
