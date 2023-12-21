<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    delItem(item) {
      if (confirm("Quieres borrar el libro con id: " + item.id + " y con id de módulo: " + item.idModule)) {
        this.$emit('delItem', item.id)
      }
    },
    editItem(id){
      this.$router.push("/edit/" + id)
    }
  },

  emits: ['delItem']
}
</script>

<template>
  <div>
    <div>
      <h4>Libro: {{ item.id }}</h4>
      <h5>{{ item.idModule }}</h5>
      <h6>Editorial: {{ item.publisher }}</h6>
      <p>Precio: {{ item.price }}€</p>
      <p>Páginas: {{ item.pages }}</p>
      <p>Estado: {{ item.status }}</p>
      <p>{{ item.soldDate === '' ? 'En venta' : item.soldDate }}</p>
      <p>Comentarios: {{ item.comments }}</p>
    </div>
    <div>
      <button>
        <span class="material-icons">add_shopping_cart</span>
      </button>
      <button @click="editItem(item.id)">
        <span class="material-icons">edit</span>
      </button>
      <button @click="delItem(item)">
        <span class="material-icons">delete</span>
      </button>
    </div>
  </div>
</template>
