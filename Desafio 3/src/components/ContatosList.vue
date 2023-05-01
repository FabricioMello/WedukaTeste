<template>
  <div class="list row">
    <div class="col-md-6 table-container">
      <h4>Lista de contatos</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Contato</th>
            <th>Edit</th> 
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contato, index) in contatos" :key="index">
            <td>
              <span v-if="!contato.edit">{{ labelsTipo[contato.tipo] }}</span>
              <select v-else id="labelsTipo" class="custom-select" v-model="contato.tipo">
                <option v-for="(tipoContato, index) in labelsTipo" :key="index" :value="index">{{ tipoContato }}</option>
              </select>
            </td>
            <td>
              <span v-if="!contato.edit">{{ contato.valor }}</span>
              <input v-else v-model="contato.valor" />
            </td>
            <td>
              <button v-if="!contato.edit" @click="edit(contato, index)" class="btn btn-edit">Edit</button>
              <button v-else @click="save(contato, index)" class="btn btn-success">Save</button>
            </td>
            <td><button @click="deleteContato(contato.id)" class="btn btn-delete">Delete</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import ContatosDataService from "../services/ContatosDataService";

export default {
  name: "contatos-list",
  data() {
    return {
      pessoaId: this.$route.params.pessoaId,
      contatos: [],
      labelsTipo: ['Telefone', 'Email', 'WhatsApp']
    };
  },
  methods: {
    retrieveContatos() {
      ContatosDataService.getAllById(this.pessoaId)
        .then(response => {
          this.contatos = response.data;
          console.log('conattos', this.contatos)
        })
        .catch(e => {
          console.log(e);
        });
    },

    edit(pessoa, index){
      this.$set(this.contatos[index], 'edit', true);
      console.log(this.contatos[index])
    },

    save(contato, index){
      this.contatos[index].edit = false;
      ContatosDataService.update(contato.id, contato)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteContato(pessoaId){
      ContatosDataService.delete(pessoaId)
        .then(response => {
          const index = this.contatos.findIndex(pessoa => pessoa.id === pessoaId)
          if (index !== -1) {
            this.contatos.splice(index, 1)
          }
          console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
      this.retrieveContatos();
    },
  },
  mounted() {
    this.retrieveContatos();
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

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.table th {
  background-color: #f5f5f5;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.table td {
  font-size: 0.9rem;
}

button {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

button:hover {
  background-color: #0069d9;
  border-color: #0062cc;
  color: #fff;
}
</style>