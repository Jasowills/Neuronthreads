<template>
  <div class="login-page">
    <Navbar />
    <div class="form-container">
      <div class="login-form">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" class="btn-submit">Login</button>
        </form>
        <div class="additional-options">
          <p>Don't have an account? <router-link to="/register">Create one</router-link></p>
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
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.login-page {
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
  margin-top: 100px;
  margin-bottom: 100px;
  max-width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  width: 100%;
}

.login-form h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
}

.btn-submit {
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

.btn-submit:hover {
  background-color: #555;
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
    padding: 25px;
    margin-top: 150px;
  }

  .login-form h2 {
    font-size: 22px;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 20px;
  }

  .login-form h2 {
    font-size: 20px;
  }

  .btn-submit {
    font-size: 14px;
  }
}
</style>
