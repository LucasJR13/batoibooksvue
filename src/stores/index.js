import { ref, computed } from 'vue'
import { defineStore, mapState } from 'pinia'
import ModulesRepository from '../repositories/modules.repository.js'

export const store = defineStore('store', {
    state(){
        return {
            messages: [],
            modules : [],
            cart: [],
        }
    },
    actions: {
        addMessage(message){
            this.messages.push({
                id: ++id,
                text: message
            })
        },
        delMessage(id){
            const index = this.messages.findIndex((message) => message.id === id)
            this.messages.splice(index, 1)
        },
        async loadModules(){
            const modulesRepository = new ModulesRepository()
            this.modules = await modulesRepository.getAllModules()   
        },
        addBook(book){
            if(!this.cart.find((cart) => cart.id === book.id)){
                this.cart.push(book)
                this.updateCart()
            }
        },
        removeBook(id){
            const index = this.cart.findIndex((cart) => cart.id === id)
            this.cart.splice(index, 1)
            this.updateCart()
        },
        emptyCart(){
            if (confirm("¿Quieres vaciar el carrito?")) {
                this.cart = []
                this.updateCart()
            }
        },
        buyCart(){
            if (confirm("¿Quiere relizar la compra?")) {
                this.cart = []
                this.updateCart()
            }
        },
        loadCart() {
            const savedCart = JSON.parse(localStorage.getItem('cart'));
            if (savedCart) {
              this.cart = savedCart;
            }
        },
        updateCart(){
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    },
    getters:{
        getModuleById: (state) => (id) => {
            return state.modules.find((module) => module.code === id) || {}
          },
    }
})
let id = 1