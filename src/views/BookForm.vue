<script>
import BooksRepository from '../repositories/books.repository.js'
import { mapActions, mapState } from 'pinia'
import { store } from '../stores'

export default {
  data() {
    return {
      book: {},
      titulo: "Añadir Libro",
      boton: "Añadir"
    }
  },

  computed: {
    ...mapState(store, {
      modules: 'modules',
    })
  },

  props: ['id'],

  async mounted() {
    const booksRepository = new BooksRepository()
    try {
      if(this.$route.params.id){
        this.book = await booksRepository.getBookById(this.$route.params.id)
        this.titulo = "Editar Libro"
        this.boton = "Editar"
      }
    } catch {
      this.addMessage('Error al cargar los módulos desde la BD')
    }
  },

  watch: {
    async id(newValue){
      const booksRepository = new BooksRepository()

      if (newValue) {
        this.titulo = "Editar Libro"
        this.boton = "Editar"
        this.book = await booksRepository.getBookById(newValue)
      } else {
        this.titulo = "Añadir Libro"
        this.boton = "Añadir"
        this.book = {}
      }
      
    }
  },

  methods: {
    async createBook() {
      const repository = new BooksRepository()
      try {
        if (this.book.id){
          await repository.changeBook(this.book)
          this.addMessage('Libro editado correctamente')
        } else {
          await repository.addBook(this.book)
          this.addMessage('Libro añadido correctamente')
        }
        this.$router.push("/list")
      } catch {
        this.addMessage('Error en el libro')
      }
    },
    async reset(){
      if(this.book.id){
        const booksRepository = new BooksRepository()
        this.book = await booksRepository.getBookById(this.book.id)
      } else {
        this.book = {}
      }
    },
    ...mapActions(store, ['addMessage']),
  }
}
</script>

<template>
  <div>
    <form novalidate @submit.prevent="createBook()">
      <h1>{{ this.titulo }}</h1>

      <div>
        <label for="id">Id:</label>
        <input type="text" v-model="book.id" disabled /><br />
        <span class="error"></span>
      </div>

      <div>
        <label for="id-module">Módulo:</label>
        <select v-model="book.idModule" required>
          <option value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select>
        <span class="error"></span>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" v-model="book.publisher" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" v-model="book.price" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" v-model="book.pages" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Estado:</label>
        <input type="radio" v-model="book.status" name="estado" value="new" required />
        <label for="estado-nuevo">Nuevo</label>

        <input type="radio" v-model="book.status" name="estado" value="good" />
        <label for="estado-bueno">Bueno</label>

        <input type="radio" v-model="book.status" name="estado" value="used" />
        <label for="estado-usado">Usado</label>

        <input type="radio" v-model="book.status" name="estado" value="bad" />
        <label for="estado-malo">Malo</label>

        <input type="radio" v-model="book.status" name="estado" value="digital" />
        <label for="estado-digital">Digital</label>
        <span class="error"></span>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
        <span class="error"></span>
      </div>

      <button type="submit">{{ this.boton }}</button>
      <button type="reset" @click="reset()">Reset</button>
    </form>
  </div>
</template>
