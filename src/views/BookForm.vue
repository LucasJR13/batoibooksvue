<script>
import ModulesRepository from '../repositories/modules.repository.js'
import BooksRepository from '../repositories/books.repository.js'
import store from '@/store'

export default {
  data() {
    return {
      book: {},
      modules: [],
      titulo: "Añadir Libro",
      boton: "Añadir"
    }
  },

  async mounted() {
    const modulesRepository = new ModulesRepository()
    const booksRepository = new BooksRepository()
    try {
      if(this.$route.params.id){
        this.book = await booksRepository.getBookById(this.$route.params.id)
        this.titulo = "Editar Libro"
        this.boton = "Editar"
      }
      const modulesInDB = await modulesRepository.getAllModules()
      this.modules = modulesInDB
    } catch {
      store.addMessage('Error al cargar los módulos desde la BD')
    }
  },

  methods: {
    async createBook() {
      const repository = new BooksRepository()
      try {
        if (this.book.id){
          await repository.changeBook(this.book)
          store.addMessage('Libro editado correctamente')
        } else {
          await repository.addBook(this.book)
          store.addMessage('Libro añadido correctamente')
        }
        this.$router.push("/list")
      } catch {
        store.addMessage('Error en el libro')
      }
    },
    async reset(){
      if(this.book.id){
        const booksRepository = new BooksRepository()
        this.book = await booksRepository.getBookById(this.book.id)
      } else {
        this.book = {}
      }
    }
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
