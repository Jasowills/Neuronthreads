<template>
  <div v-if="notifications.length" class="notifications">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      :class="`notification ${notification.type}`"
      @click="removeNotification(index)"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['notifications']),
  },
  methods: {
    ...mapMutations(['removeNotification']),
  },
};
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 30px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.notification {
  background-color: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  animation: fadeOut 0.5s ease-out forwards;
  animation-delay: 4.5s;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

.notification.info {
  background-color: #2196f3;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
@media (max-width: 480px) {
  .notifications {
  position: fixed;
  top: 150px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
}
</style>
