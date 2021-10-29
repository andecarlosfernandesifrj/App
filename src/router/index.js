import Vue from 'vue'
import VueRouter from 'vue-router'
import ListProdutos from '../views/ListProdutos.vue'
import ListCustos from '../views/ListCustos.vue'
import Custo from '../views/Custo.vue'
import Produto from '../views/Produto.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/listprodutos',
    name: 'listprodutos',
    component: ListProdutos
  },
  {
    path: '/listcustos',
    name: 'listcustos',
    component: ListCustos
  },
  {
    path: '/custo',
    name: 'custo',
    component: Custo
  },
  {
    path: '/produto',
    name: 'produto',
    component: Produto
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
