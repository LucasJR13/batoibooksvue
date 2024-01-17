<script>
import AppMessages from './components/AppMessages.vue'
import AppMenu from './components/AppMenu.vue'
import { mapActions } from 'pinia'
import { store } from './stores'

export default{
  components:{
    AppMenu,
    AppMessages,
  },
  methods:{
    ...mapActions(store, ['loadModules', 'loadCart']),
  },
  mounted(){
    this.loadModules()
    this.loadCart()
  },
 
}
</script>

<template>
  <header>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <img src="/logoBatoi.png" class="logo" alt="Vite logo" />
    <h1>BatoiBooks</h1>
  </header>

  <app-menu></app-menu>
  <app-messages></app-messages>
  <RouterView />

  <footer>
    <p>Lucas Juan Riquelme</p>
  </footer>
</template>

