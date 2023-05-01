import http from "../http-common";

class PessoasDataService {
  getAll() {
    return http.get("/Pessoas");
  }

  get(id) {
    return http.get(`/Pessoas/${id}`);
  }

  create(data) {
    return http.post("/Pessoas", data);
  }

  update(id, data) {
    return http.put(`/Pessoas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Pessoas/${id}`);
  }
}

export default new PessoasDataService();
