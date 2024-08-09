<template>
  <div class="product-card">
    <img :src="product.imageURL" class="product-image" alt="Product Image" />
    <div class="product-info">
      <h5 class="product-name">{{ product.name }}</h5>
      <div class="product-price">
        <span class="product-description">{{ product.description }}</span>
        <span class="current-price">€{{ formatPrice(product.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    }
  }
};
</script>

<style scoped>
.product-card {
  background: #fff;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
  font-family: "Outfit", sans-serif;
}

.product-name {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
}


.product-price {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  color: #000;
}
.product-description {
  font-size: 16px;
  color: #666 !important;
  margin-bottom: 10px;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: space-between;
}

.edit-btn, .delete-btn {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #333;
  color: white;
  font-size: 14px;
}
.current-price{
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-name {
    font-size: 16px;
  }

  .product-description {
    font-size: 12px;
  }

  .product-price {
    font-size: 14px;
  }

  .product-actions {
    flex-direction: column;
    align-items: center;
  }

  .edit-btn, .delete-btn {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .product-image {
    height: 150px;
  }

  .product-info {
    padding: 10px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-description {
    font-size: 11px;
  }

  .product-price {
    font-size: 12px;
  }

  .product-actions {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .edit-btn, .delete-btn {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>
