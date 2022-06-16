import { Http } from './http.js';

const API_ENDPOINT = {
  CREATE_TODO: '/todo/todo/create',
  LIST_TODO: '/todo/todo/list',
  GET_TODO: '/todo/todo/get',
  UPDATE_TODO: '/todo/todo/update',
  DELETE_TODO: '/todo/todo/delete',
};
class TransactionService {
  constructor() {
    if (TransactionService._instance) {
      return TransactionService._instance;
    }
    TransactionService._instance = this;
  }
  createSlice(payload) {
    return Http.post(API_ENDPOINT.CREATE_TODO, payload);
  }
  getListSlice() {
    return Http.get(API_ENDPOINT.LIST_TODO);
  }

  getSlice(id) {
    return Http.get(API_ENDPOINT.GET_TODO + `?id=${id}`);
  }

  updateSlice(id, data) {
    return Http.post(API_ENDPOINT.UPDATE_TODO + `?id=${id}`, data);
  }

  deleteSlice(id) {
    return Http.post(API_ENDPOINT.DELETE_TODO + `?id=${id}`);
  }
}

const Service = new TransactionService();

export default Service;
