<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">
        <img src="./assets/logo-weduka.png" alt="Logo da Weduka">
      </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/listarPessoas" class="nav-link">Listar Pessoa</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addPessoas" class="nav-link">Adicionar Pessoa</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addContatos" class="nav-link">Adicionar Contato</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
  img {
    max-width: 300px;
    max-height: 50px;
  }
</style>
