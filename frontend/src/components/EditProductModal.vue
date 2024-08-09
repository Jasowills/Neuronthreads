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
    top: 30px;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    position: relative;
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
}

.form-group input, .form-group textarea {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.submit-btn {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}


</style>
