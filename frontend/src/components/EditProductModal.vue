<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Edit Product</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input v-model="localProduct.name" type="text" id="name" required />
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea v-model="localProduct.description" id="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input v-model="localProduct.price" type="number" id="price" required />
                </div>
                <div class="form-group">
                    <label for="imageURL">Image URL:</label>
                    <input v-model="localProduct.imageURL" type="text" id="imageURL" />
                </div>
                <div class="form-group">
                    <label for="category">Category:</label>
                    <input v-model="localProduct.category" type="text" id="category" required />
                </div>
                <button type="submit" class="submit-btn">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        product: Object
    },
    data() {
        return {
            localProduct: { ...this.product } // Clone the product to avoid directly mutating the prop
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async submitForm() {
            try {
                await this.$store.dispatch('updateProduct', this.localProduct);
                this.$emit('save', this.localProduct);
                this.closeModal();
            } catch (error) {
                console.error('Failed to save product:', error);
            }
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px; /* Add padding to avoid content hitting the screen edges on small devices */
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    position: relative;
    box-sizing: border-box; /* Ensures padding is included in width calculations */
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
    font-size: 14px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-sizing: border-box; /* Ensures padding is included in width calculations */
}

.submit-btn {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .modal-content {
        width: 100%; /* Make the modal take more width on smaller screens */
        padding: 15px;
    }

    .form-group label,
    .form-group input,
    .form-group textarea,
    .submit-btn {
        font-size: 14px; /* Slightly reduce font size for better readability */
    }

    .close {
        font-size: 20px; /* Adjust close button size */
    }
}

@media (max-width: 480px) {
    .modal-content {
        width: 100%; /* Full width on very small screens */
        padding: 10px;
        border: 1px solid red;
    }

    .form-group label,
    .form-group input,
    .form-group textarea,
    .submit-btn {
        font-size: 12px; /* Further reduce font size for very small screens */
    }

    .close {
        font-size: 18px; /* Adjust close button size */
    }
}
</style>
