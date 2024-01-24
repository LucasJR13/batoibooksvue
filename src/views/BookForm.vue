<script>
import BooksRepository from '../repositories/books.repository.js'
import { mapActions, mapState } from 'pinia'
import { store } from '../stores'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  data() {
    const mySchema = yup.object({
      price: yup.number().required('El precio es obligatorio').moreThan(0, 'El precio debe ser mayor que cero'),
      pages: yup.number().required('Las páginas son obligatorias').moreThan(0, 'El libro tiene que tener páginas'),
      publisher: yup.string().required('La editorial es obligatoria'),
      idModule: yup.string().required('El módulo es obligatorio'),
      status: yup.string().required('El estado es obligatorio'),
    })
    return {
      book: {},
      titulo: "Añadir Libro",
      boton: "Añadir",
      mySchema,
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    ...mapState(store, {
      modules: 'modules',
    })
  },
  props: ['id'],
  async mounted() {
    const booksRepository = new BooksRepository();
    try {
      if (this.$route.params.id) {
        this.book = await booksRepository.getBookById(this.$route.params.id);
        this.titulo = "Editar Libro";
        this.boton = "Editar";
      }
    }
    catch {
      this.addMessage('Error al cargar los módulos desde la BD');
    }
  },
  watch: {
    async id(newValue) {
      const booksRepository = new BooksRepository();
      if (newValue) {
        this.titulo = "Editar Libro";
        this.boton = "Editar";
        this.book = await booksRepository.getBookById(newValue);
      } else {
        this.titulo = "Añadir Libro";
        this.boton = "Añadir";
        this.book = {};
      }
    }
  },
  methods: {
    async createBook() {
      const repository = new BooksRepository();
      try {
        if (this.book.id) {
          await repository.changeBook(this.book);
          this.addMessage('Libro editado correctamente');
        }
        else {
          await repository.addBook(this.book);
          this.addMessage('Libro añadido correctamente');
        }
        this.$router.push("/list")
      }
      catch {
        this.addMessage('Error en el libro');
      }
    },
    async reset() {
      if (this.book.id) {
        const booksRepository = new BooksRepository();
        this.book = await booksRepository.getBookById(this.book.id);
      }
      else {
        this.book = {};
      }
    },
    ...mapActions(store, ['addMessage']),
  },

}
</script>

<template>
  <div>
    <Form @reset="reset" @submit="createBook" :validation-schema="mySchema">
      <h1>{{ this.titulo }}</h1>

      <div>
        <label for="id">Id:</label>
        <Field name="id" type="number" v-model="book.id" disabled /><br />
      </div>

      <div>
        <label for="id-module">Módulo:</label>
        <Field name="idModule" as="select" v-model="book.idModule" required>
          <option value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </Field>
        <br><ErrorMessage name="idModule" />
      </div>

      <div>
        <label name="publisher" for="publisher">Editorial:</label>
        <Field name="publisher" type="text" v-model="book.publisher" required /><br />
        <ErrorMessage name="publisher" />
      </div>

      <div>
        <label for="price">Precio:</label>
        <Field name="price" type="number" v-model="book.price" required /><br />
        <ErrorMessage name="price" />
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <Field name="pages" type="number" v-model="book.pages" required /><br />
        <ErrorMessage name="pages" />
      </div>

      <div>
        <label>Estado:</label>
        <Field type="radio" v-model="book.status" name="status" value="new" required />
        <label for="estado-nuevo">Nuevo</label>

        <Field type="radio" v-model="book.status" name="status" value="good" />
        <label for="estado-bueno">Bueno</label>

        <Field type="radio" v-model="book.status" name="status" value="used" />
        <label for="estado-usado">Usado</label>

        <Field type="radio" v-model="book.status" name="status" value="bad" />
        <label for="estado-malo">Malo</label>

        <Field type="radio" v-model="book.status" name="status" value="digital" />
        <label for="estado-digital">Digital</label>
        <br><ErrorMessage name="status" />
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea v-model="book.comments"></textarea>
      </div>

      <button type="submit">{{ this.boton }}</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>
