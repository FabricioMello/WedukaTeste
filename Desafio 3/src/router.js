import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/pessoas",
      name: "pessoas",
      component: () => import("./components/PessoasList")
    },
    {
      path: "/listarPessoas",
      alias: "/pessoas",
      name: "pessoas",
      component: () => import("./components/PessoasList")
    },
    {
      path: "/addPessoas",
      name: "addPessoas",
      component: () => import("./components/AddPessoas")
    },
    {
      path: '/listarContatos/:pessoaId',
      name: 'listarContatos',
      component: () => import('./components/ContatosList'),
      props: (route) => ({ pessoaId: route.params.pessoaId })
    },    
    {
      path: "/addContatos",
      name: "addContatos",
      component: () => import("./components/AddContatos")
    }
  ]
});
