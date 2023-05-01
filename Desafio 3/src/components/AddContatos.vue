<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <label for="pessoas" class="label-select">Escolha uma pessoa:</label>
      <select id="pessoas" class="custom-select" v-model="selectedPessoa">
        <option v-for="(pessoa, index) in pessoas" :key="index" :value="pessoa.id">{{ pessoa.nome }}</option>
      </select>

      <label for="tipoContatos" class="label-select">Escolha um tipo de contato:</label>
      <select id="tipoContatos" class="custom-select" v-model="selectedTipoContato">
        <option v-for="(tipoContato, index) in tipoContatos" :key="index" :value="index">{{ tipoContato }}</option>
      </select>

      <div class="form-group" v-if="this.selectedTipoContato === 0">
        <label for="telefone">Telefone</label>
        <input
          class="form-control"
          id="telefone"
          required
          v-model="contato.valor"
          name="telefone"
        />
      </div>

      <div class="form-group" v-if="this.selectedTipoContato === 1">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="contato.valor"
          name="email"
        />
      </div>

      <div class="form-group" v-if="this.selectedTipoContato === 2">
        <label for="whatsapp">WhatsApp</label>
        <input
          class="form-control"
          id="whatsapp"
          required
          v-model="contato.valor"
          name="whatsapp"
        />
      </div>

      <button @click="saveContato" class="btn btn-success">Adicionar Contato</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newContato">Add</button>
    </div>
  </div>
</template>

<script>
import PessoasDataService from "../services/PessoasDataService";
import ContatosDataService from "../services/ContatosDataService";

export default {
  name: "add-contato",
  data() {
    return {
      contato: {
        id: null,
        pessoaId: null,
        tipo: null,
        valor: "",
      },
      selectedPessoa: '',
      selectedTipoContato: '',
      tipoContatos: ['Telefone', 'Email', 'WhatsApp'],
      pessoas: [],
      submitted: false
    };
  },
  methods: {
    saveContato() {
      var data = {
        pessoaId: this.selectedPessoa,
        tipo: this.selectedTipoContato,
        valor: this.contato.valor 
      }
      ContatosDataService.create(data)
        .then(response => {
          this.contato.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
          console.log('RESPONSE');
        });
    },
    
    newContato() {
      this.submitted = false;
      this.contato = {};
    }
  },
  mounted() {
    PessoasDataService.getAll()
    .then(response => {
      this.pessoas = response.data
    })
    .catch(e => {
      console.log(e);
    });
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.label-select {
  display: block;
  margin-bottom: 5px;
}

.custom-select {
  display: block;
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 0.75rem center;
  background-size: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.custom-select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.custom-select:disabled {
  background-color: #e9ecef;
  opacity: 0.65;
}
.btn {
  padding: 10px;
  margin-top: 5px;
  width: 100%
}

</style>
