<template>
  <div class="list row">
    <div class="col-md-6 table-container">
      <h4>Lista de pessoas</h4>
      <table class="table">
        <thead>
          <tr>
            <th style="min-width: 200px;">Nome</th>
            <th>CPF</th>
            <th>Contatos</th>
            <th>Edit</th> 
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pessoa, index) in pessoas" :key="index">
            <td>
              <span v-if="!pessoa.edit">{{ pessoa.nome }}</span>
              <input v-else v-model="pessoa.nome" />
            </td>
            <td>
              <span class="btn-success" v-if="!pessoa.edit">{{ pessoa.cpf }}</span>
              <input v-else v-model="pessoa.cpf" />
            </td>
            <td>
              <router-link :to="{ name: 'listarContatos', params: { pessoaId: pessoa.id } }" class="nav-link">
                <button class="btn">{{ pessoa.contatos.length }}</button>
              </router-link>
            </td>
            <td>
              <button v-if="!pessoa.edit" @click="edit(pessoa, index)" class="btn btn-green">Edit</button>
              <button v-else @click="save(pessoa, index)" class="btn btn-success">Save</button>
            </td>
            <td><button @click="deletePessoa(pessoa.id)" class="btn btn-delete">Delete</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import PessoasDataService from "../services/PessoasDataService";

export default {
  name: "pessoas-list",
  data() {
    return {
      pessoas: [],
    };
  },
  methods: {
    retrievePessoas() {
      PessoasDataService.getAll()
        .then(response => {
          this.pessoas = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    edit(pessoa, index){
      this.$set(this.pessoas[index], 'edit', true);
    },

    save(pessoa, index){
      this.pessoas[index].edit = false;
      PessoasDataService.update(pessoa.id, pessoa)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    addPessoa() {
      PessoasDataService.create()
        .then(response => {
          this.pessoas.push({
            id: response.data.id,
            nome: "",
            cpf: "",
            contatos: [],
            edit: false // inicializa como false
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePessoa(pessoaId){
      PessoasDataService.delete(pessoaId)
        .then(response => {
          const index = this.pessoas.findIndex(pessoa => pessoa.id === pessoaId)
          if (index !== -1) {
            this.pessoas.splice(index, 1)
          }
          console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
      this.retrievePessoas();
    },
  },
  mounted() {
    this.retrievePessoas();
  }
};
</script>

<style>
.table-container {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #333;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.btn-green {
  color: green
}
.btn-delete {
  color: red
}

.table td {
  font-size: 0.9rem;
}

.btn {
  border-color: black;
  width: 100px;
  
}

button:hover {
  font-size: 1.1rem;
  background-color: grey;
}
</style>