import http from "../http-common";

class ContatosDataService {
  getAllById(idPessoa) {
    return http.get(`/Contatos?idPessoa=${idPessoa}`);
  }

  get(id) {
    return http.get(`/Contatos/${id}`);
  }

  create(data) {
    return http.post("/Contatos", data);
  }

  update(id, data) {
    return http.put(`/Contatos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Contatos/${id}`);
  }
}

export default new ContatosDataService();
