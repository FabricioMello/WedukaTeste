<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          required
          v-model="pessoa.nome"
          name="nome"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          class="form-control"
          id="cpf"
          required
          v-model="pessoa.cpf"
          name="cpf"
        />
      </div>


      <button @click="savePessoa" class="btn btn-success">Adicionar Pessoa</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPessoa">Add</button>
    </div>
  </div>
</template>

<script>
import PessoasDataService from "../services/PessoasDataService";

export default {
  name: "add-pessoa",
  data() {
    return {
      pessoa: {
        id: null,
        nome: "",
        cpf: "",
        text:""
      },
      submitted: false
    };
  },
  methods: {
    savePessoa() {
      var pessoas = PessoasDataService.getAll()
      .then(response => {
        console.log(response.data);
      })
      console.log('pessoas', pessoas)
      var data = {
        nome: this.pessoa.nome,
        cpf: this.pessoa.cpf,
        contatos: []
      };

      PessoasDataService.create(data)
        .then(response => {
          this.pessoa.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
          console.log('RESPONSE');
        });
    },
    
    newPessoa() {
      this.submitted = false;
      this.pessoa = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
