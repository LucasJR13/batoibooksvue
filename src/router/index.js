import { createRouter, createWebHistory } from 'vue-router'
import BookList from "../views/BookList.vue"
import BookForm from "../views/BookForm.vue"
import AppCart from "../views/AppCart.vue"
import AppAbout from "../components/AppAbout.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/list',
      name: 'booklist',
      component: BookList
    },
    {
      path: '/form',
      name: 'bookform',
      component: BookForm
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
    {
      path: '/edit/:id',
      name: 'edit',
      props: true,
      component: BookForm
    },
  ]
})

export default router
