<script>
import { store } from '../stores/'
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(store, {
      messages: 'messages'
    })
  },

  methods: {
    ...mapActions(store, ['delMessage'])
  }
}
</script>

<template>
  <div v-for="message in messages">
    {{ message.text }}
    <button
      @click="delMessage(message.id)"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    >
      x
    </button>
  </div>
</template>