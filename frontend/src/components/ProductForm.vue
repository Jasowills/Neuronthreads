<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="">Add New Product</h2>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input 
            v-model="name" 
            type="text" 
            id="name" 
            required 
            placeholder="Enter product name" 
          />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea 
            v-model="description" 
            id="description" 
            rows="4" 
            required 
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="price">Price (€):</label>
          <input 
            v-model="price" 
            type="number" 
            id="price" 
            min="0" 
            step="0.01" 
            required 
            placeholder="Enter product price"
          />
        </div>

        <div class="form-group">
          <label for="imageURL">Image URL:</label>
          <input 
            v-model="imageURL" 
            type="url" 
            id="imageURL" 
            placeholder="Enter image URL (optional)"
          />
        </div>
        
        <div class="form-group">
          <label for="category">Category:</label>
          <input 
            v-model="category" 
            type="text" 
            id="category" 
            required 
            placeholder="Enter product category"
          />
        </div>

        <button type="submit" class="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      imageURL: '',
      category: '' // Added category field
    };
  },
  methods: {
    addProduct() {
      if (!this.name || !this.description || !this.price || !this.category) {
        alert('Please fill in all required fields.');
        return;
      }

      this.$store.dispatch('addProduct', {
        name: this.name,
        description: this.description,
        price: parseFloat(this.price).toFixed(2),
        imageURL: this.imageURL || null,
        category: this.category // Ensure category is included in the payload
      });

      this.name = '';
      this.description = '';
      this.price = '';
      this.imageURL = '';
      this.category = ''; // Reset the category field
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
}

.form-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}
.text-center{

}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  padding: 10px;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-group input, 
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-card {
    padding: 1.5rem;
    margin: 10px;
  }

  .form-group label {
    font-size: 0.9em;
  }

  .submit-btn {
    font-size: 0.9em;
  }
  
  h2 {
    font-size: 1.5em;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 5px;
  }

  .form-card {
    padding: 1rem;
    margin: 5px;
  }

  .form-group label {
    font-size: 0.8em;
  }

  .submit-btn {
    font-size: 0.8em;
  }

  h2 {
    font-size: 1.2em;
  }
}
</style>
