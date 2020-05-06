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
    },
    {
        path: "/preview/id/:id",
        name: "Preview",
        component: Preview,
    },
    {
        path: "/add",
        name: "Add",
        component: Add,
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: Edit,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
