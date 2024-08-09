<template>
  <div class="admin-container">
    <Navbar />
    <div class="content">
      <h1 class="page-title">Product Management</h1>
      <ProductForm/>
      <AdminProducts @edit="startEditing" @delete="confirmDelete" />
    </div>
    <Footer />
  </div>
</template>

<script>
import ProductForm from '../components/ProductForm.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import AdminProducts from '@/components/AdminProducts.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ProductForm,
    Navbar,
    Footer,
    AdminProducts
  },
  data() {
    return {
      submissionStatus: '',
      isSuccess: false,
      editingProduct: null
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async handleAddProduct(productData) {
      try {
        await this.$store.dispatch('addProduct', productData);
        this.submissionStatus = 'Product added successfully!';
        this.isSuccess = true;
        this.editingProduct = null;
        await this.$store.dispatch('fetchProducts');
      } catch (error) {
        this.submissionStatus = 'Failed to add product. Please try again.';
        this.isSuccess = false;
      }
    },
    startEditing(product) {
      this.editingProduct = { ...product };
    },
    async handleEditProduct(productData) {
      try {
        await this.$store.dispatch('updateProduct', productData);
        this.submissionStatus = 'Product updated successfully!';
        this.isSuccess = true;
        this.editingProduct = null;
        await this.$store.dispatch('fetchProducts');
      } catch (error) {
        this.submissionStatus = 'Failed to update product. Please try again.';
        this.isSuccess = false;
      }
    },
    confirmDelete(productId) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.handleDeleteProduct(productId);
      }
    },
    async handleDeleteProduct(productId) {
      try {
        await this.$store.dispatch('deleteProduct', productId);
        this.submissionStatus = 'Product deleted successfully!';
        this.isSuccess = true;
        await this.$store.dispatch('fetchProducts');
      } catch (error) {
        this.submissionStatus = 'Failed to delete product. Please try again.';
        this.isSuccess = false;
      }
    }
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  margin-top: 100px;
  padding: 20px;
}

.page-title {
  font-size: 25px;
  text-align: center;
  margin-top: 30px;
}

.feedback {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}

.feedback.success {
  background-color: #d4edda;
  color: #155724;
}

.feedback.error {
  background-color: #f8d7da;
  color: #721c24;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content {
    padding: 15px;
  }

  .page-title {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 10px;
  }

  .page-title {
    font-size: 18px;
  }
}
</style>
