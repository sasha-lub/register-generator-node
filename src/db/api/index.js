import axios from 'axios';

const apiPrefix = 'http://localhost:3030';

export default {
    listModels() {
        return axios.get(`${apiPrefix}/models`);
    },

    createModel(data) {
        return axios.post(`${apiPrefix}/models`, data);
    },

    findModel(name) {
      return axios.get(`${apiPrefix}/models/${name}`);
    },

    deleteModel(id) {
      return axios.delete(`${apiPrefix}/models/${id}`);
    }
}
