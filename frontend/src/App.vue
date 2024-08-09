<template>
 <div id="app">
    <Notification />
    <router-view />
  </div>
</template>

<script>
import Notification from './components/Notification.vue';
export default {
  components: {
    Notification,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
