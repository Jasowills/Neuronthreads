<template>
  <div class="products-page">
    <div class="filters">
      <Sidebar @filter="applyFilter" />
    </div>
    <div class="products">
      <div v-if="loading">Loading...</div>
      <div v-else class="products-grid">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product._id"
          :product="product"
        />
      </div>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from '../components/Sidebar.vue';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    Sidebar,
    ProductCard,
  },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentPage: 1,
      filters: {},
      productsPerPage: 16, // Products per page
    };
  },
  computed: {
    ...mapGetters(['products', 'loading']),
    
    filteredProducts() {
      let filtered = this.products;

      // Filter by category
      if (this.filters.category && this.filters.category.length > 0) {
        filtered = filtered.filter(product =>
          this.filters.category.includes(product.category)
        );
      }

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.productsPerPage;
      return this.filteredProducts.slice(start, start + this.productsPerPage);
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.productsPerPage);
    },
  },
  methods: {
    applyFilter(filter) {
      this.filters[filter.type] = filter.value;
      this.currentPage = 1; // Reset to the first page on filter change
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.$store.dispatch('fetchProducts');
  }
};
</script>

<style scoped>
.products-page {
  display: flex;
  width: 100%;
  padding: 20px;
  margin-top: 100px; /* Adjust for fixed navbar */
}

.filters {
  flex: 1;
  max-width: 250px;
}

.products {
  flex: 3;
  padding: 0 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #333;
  color: white;
}

.loading {
  text-align: center;
  font-size: 1.5em;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .products-page {
    flex-direction: column;
    padding: 15px;
  }

  .products {
    padding: 0 10px;
  }

  .filters {
    max-width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .products {
    padding: 0 5px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .pagination button {
    padding: 6px 12px;
    font-size: 0.8em;
  }
}
</style>
