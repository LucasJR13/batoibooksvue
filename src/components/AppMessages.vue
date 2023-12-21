<script>
import store from '../store/'

export default {
  computed: {
    messages() {
      return store.state.messages
    }
  },

  methods: {
    delMessage(message) {
      store.removeMessage(message.id)
    }
  }
}
</script>

<template>
  <div v-for="message in messages">
    {{ message.text }}
    <button
      @click="delMessage(message)"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    >
      x
    </button>
  </div>
</template>
