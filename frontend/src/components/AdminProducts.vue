<template>
    <div class="products-page">
      <div class="filters">
        <Sidebar @filter="applyFilter" />
      </div>
      <div class="products">
        <SearchBar @search="applySearch" />
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else class="products-grid">
          <AdminProductsCard
            v-for="product in paginatedProducts"
            :key="product._id"
            :product="product"
            @edit="startEditing(product)"
            @delete="confirmDelete(product._id)"
          />
        </div>
  
        <!-- Edit Product Modal -->
        <EditProductModal
          v-if="editingProduct"
          :visible="!!editingProduct"
          :product="editingProduct"
          @close="closeEditModal"
          @save="handleEditProduct"
        />
  
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
  import AdminProductsCard from './AdminProductsCard.vue';
  import EditProductModal from '../components/EditProductModal.vue'; // Import the modal component
  
  export default {
    components: {
      Sidebar,
      AdminProductsCard,
      EditProductModal,
    },
    data() {
      return {
        currentPage: 1,
        filters: {},
        productsPerPage: 16,
        editingProduct: null, // For storing the product to be edited
      };
    },
    computed: {
      ...mapGetters(['products', 'loading']),
      filteredProducts() {
        let filtered = this.products;
        if (this.filters.category && this.filters.category.length > 0) {
          filtered = filtered.filter(product =>
            this.filters.category.includes(product.category)
          );
        }
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
        this.currentPage = 1;
      },
      applySearch(query) {
        this.searchQuery = query;
        this.currentPage = 1;
      },
      changePage(page) {
        this.currentPage = page;
      },
      startEditing(product) {
        this.editingProduct = { ...product }; // Clone the product object
      },
      closeEditModal() {
        this.editingProduct = null;
      },
      async handleEditProduct(updatedProduct) {
        try {
          await this.$store.dispatch('updateProduct', updatedProduct);
          this.closeEditModal();
          await this.$store.dispatch('fetchProducts'); // Refresh the product list
        } catch (error) {
          console.error('Failed to update product:', error);
        }
      },
      confirmDelete(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
          this.$emit('delete', productId);
        }
      },
    },
    created() {
      this.$store.dispatch('fetchProducts');
    },
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

  