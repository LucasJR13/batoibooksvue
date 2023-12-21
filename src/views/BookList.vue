<script>
import BooksRepository from '@/repositories/books.repository'
import BookLi from '../components/BookLi.vue'
import store from '@/store'

export default {
  components: {
    BookLi
  },

  methods: {
    async delBook(id) {
      const repository = new BooksRepository()
      try {
        await repository.removeBook(id)
        this.delBookFromArray(id)
        store.addMessage('Libro borrado con éxito')
      } catch {
        store.addMessage('No se ha podido borrar el libro')
      }
    },
    delBookFromArray(id) {
      const index = this.books.findIndex((book) => book.id === id)
      this.books.splice(index, 1)
    }
  },

  data() {
    return {
      books: []
    }
  },

  async mounted() {
    const repository = new BooksRepository()
    try {
      const booksInDB = await repository.getAllBooks()
      this.books = booksInDB
    } catch {
      store.addMessage('No se han podido cargar los libros de la DB')
    }
  },

  computed: {
    totalBooks() {
      return this.books.length
    }
  }
}
</script>

<template>
  <div>
    <book-li @delItem="delBook" v-bind:item="book" v-for="book in books"></book-li>
    <h4>Total books: {{ totalBooks }}</h4>
  </div>
</template>
