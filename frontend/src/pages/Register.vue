<template>
  <div class="register-page">
    <Navbar />
    <div class="form-container">
      <div class="register-form">
        <h2>Create Your Account</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input
              v-model="firstname"
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input
              v-model="lastname"
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              placeholder="Choose a username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" class="btn-primary">Register</button>
        </form>
        <div class="additional-options">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password,
        });
        // Navigate to the homepage after registration
        this.$router.push('/');
      } catch (error) {
        console.error('Failed to register:', error);
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f7f7f7;
}

.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  margin-bottom: 80px;
}

.register-form {
  width: 100%;
}

.register-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.additional-options {
  margin-top: 20px;
  text-align: center;
}

.additional-options p {
  margin-bottom: 10px;
}

.additional-options a {
  color: #333;
  text-decoration: none;
}

.additional-options a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 30px;
    margin-top: 80px;
    margin-bottom: 60px;
  }

  .register-form h2 {
    font-size: 22px;
  }

  .btn-primary {
    font-size: 14px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 20px;
    margin-top: 130px;
    margin-bottom: 40px;
  }

  .register-form h2 {
    font-size: 20px;
  }

  .btn-primary {
    font-size: 13px;
    padding: 7px;
  }
}
</style>
