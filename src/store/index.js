import { reactive } from 'vue'

export default {
  debug: true,
  state: reactive({
    messages: []
  }),

  addMessage(message) {
    this.state.messages.push({
      id: ++id,
      text: message
    })
  },
  removeMessage(id) {
    const index = this.state.messages.findIndex((message) => message.id === id)
    this.state.messages.splice(index, 1)
  }
}
let id = 1