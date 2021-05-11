import http from "../http-common";

class CategoryDataService {
  getAll(params) {
    return http.get("/categories", { params });
  }

  get(id) {
    return http.get(`/categories/${id}`);
  }

  create(data) {
    return http.post("/categories", data);
  }

  update(id, data) {
    return http.put(`/categories/${id}`, data);
  }

  // delete(id) {
  //   return http.delete(`/categories/${id}`);
  // }

  // deleteAll() {
  //   return http.delete("/categories");
  // }
}

export default new CategoryDataService();
