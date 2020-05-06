import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Preview from "../views/Preview.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            guest: false
        }
    },
    {
        path: "/preview/id/:id",
        name: "Preview",
        component: Preview,
        meta: {
            guest: false
        }
    },
    {
        path: "/add",
        name: "Add",
        component: Add,
        meta: {
            guest: false
        }
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: Edit,
        meta: {
            guest: false
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            guest: true
        }
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
