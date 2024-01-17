<script>
import BookLi from '../components/BookLi.vue'

import { mapState, mapActions } from 'pinia'
import { store } from '../stores'

export default {
  components: {
    BookLi
  },

  computed: {
    ...mapState(store, {
      cart: 'cart',
    }),
    totalBooks(){
      return this.cart.length
    },
    actualPrice() {
      return this.cart.reduce((totalPrice, book) => totalPrice + parseInt(book.price), 0)
    }
  },

  methods: {
    ...mapActions(store, ['removeBook', 'emptyCart', 'buyCart']),
    removeItem(id) {
      this.removeBook(id)
    },
    cartEmpty(){
      this.emptyCart()
    },
    cartBuy(){
      this.buyCart()
    }
  }
}
</script>

<template>
  <h1>Libros en el carrito</h1>
  <book-li v-bind:item="book" v-for="book in cart">
    <div>
      <button @click="removeItem(book.id)">
        <span class="material-icons">remove_shopping_cart</span>
      </button>
    </div>
  </book-li><br>
  <button @click="cartEmpty()">
    Vaciar Carrito
  </button>
  <button @click="cartBuy()">
    Comprar: {{ actualPrice }}€
  </button>
  <h4>Total books: {{ totalBooks }}</h4>
</template>
