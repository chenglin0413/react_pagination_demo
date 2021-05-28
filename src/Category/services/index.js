import http from "../../http-common";

class CategoryDataService {
  getAll(params) {
    return http.get("/categories", { params });
  }

  get(id) {
    return http.get(`/categories/${id}`);
  }

}

export default new CategoryDataService();
