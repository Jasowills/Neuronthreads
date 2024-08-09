<template>
  <nav class="header">
    <div class="container">
      <div class="rep">
        <router-link to="/">
          <div class="logo">NeuroThreads</div>
        </router-link>
        <button  @click="toggleMenu" class="menu-toggle">
          <img src="../assets/menu.png" alt="menu" />
        </button>
      </div>

      <div class="menu">
        <router-link to="/">Shop</router-link>
        <router-link to="/">Categories</router-link>
        <router-link v-if="isAuthenticated" to="/admin">Admin</router-link>
      </div>

      <div class="search">
        <SearchBar @search="applySearch" />
      </div>

      <div class="icons">
        <router-link to="/cart"><img src="../assets/cart.png" alt="cart" /></router-link>
        <template v-if="!isAuthenticated">
          <router-link to="/login"><img src="../assets/person.png" alt="person" /></router-link>
        </template>
        <template v-if="isAuthenticated">
          <div class="user-info">
            Hi {{ user?.firstname || 'User' }}!
          </div>
          <div @click="showLogoutConfirm = true" class="logout-icon">
            <img src="../assets/logout.png" alt="logout" />
          </div>
        </template>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <router-link to="/" @click="toggleMenu">Shop</router-link>
      <router-link to="/" @click="toggleMenu">Categories</router-link>
      <template v-if="!isAuthenticated"> <router-link to="/login">Login</router-link></template> 

      <router-link v-if="isAuthenticated" to="/admin">Admin</router-link>

      <button v-if="isAuthenticated" @click="showLogoutConfirm = true" class="mobile-logout-btn">
        Logout
      </button>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="overlay">
      <div class="logout-modal">
        <p>Are you sure you want to logout?</p>
        <div class="buttons">
          <button @click="cancelLogout" class="cancel-btn">Cancel</button>
          <button @click="confirmLogout" class="confirm-btn">Yes, Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      showLogoutConfirm: false,
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
    ...mapMutations(['clearAuthData']),
    applySearch(query) {
      this.$emit('search', query);
    },
    cancelLogout() {
      this.showLogoutConfirm = false;
    },
    confirmLogout() {
      this.clearAuthData(); // Clear authentication data from Vuex store
      this.$router.push('/login'); // Redirect to login page
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
@import url('../assets/fonts.css');

.header {
  background: #fff;
  padding: 20px 0;
  width: 100%;
  font-family: "Outfit", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.rep {
  display: flex;
  justify-content: space-between;
  /* width: 50%; */
}

.logo {
  font-size: 1.5em;
  cursor: pointer;
  font-weight: bold;
}

.menu {
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 20%;
}

.menu a {
  margin: 0 15px;
  color: #333;
  text-decoration: none;
}

.menu a:hover {
  color: #000;
}

.search {
  flex-grow: 1;
}

.icons {
  display: flex;
  align-items: center;
}

.icons a,
.logout-icon {
  margin-left: 20px;
  color: #333;
  text-decoration: none;
}

.icons a img,
.logout-icon img {
  width: 24px;
}

.logout-icon {
  cursor: pointer;
}

.menu-toggle {
  display: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.logout-modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn {
  background: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-btn {
  background: red;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu {
    display: none;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
  }

  .menu-toggle img {
    width: 24px;
  }

  .search {
    width: 100%;
    margin-top: 10px;
  }

  .icons {
    margin-top: 10px;
    display: none;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .mobile-menu a {
    margin: 10px 0;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 1.2em;
  }

  .menu-toggle img {
    width: 20px;
  }
  .rep {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
}
</style>
