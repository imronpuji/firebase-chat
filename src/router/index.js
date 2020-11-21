import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chat from '../views/Chat'
Vue.use(VueRouter)
const routes = [
    {path:'/login', component : Login},
    {path:'/register', component : Register},
    {
        path:'/chat', 
        component : Chat,
       
        
    }
]
const router = new VueRouter({
    routes
})

export default router