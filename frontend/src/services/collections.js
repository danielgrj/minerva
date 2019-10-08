import axios from 'axios';

const SERVICE = axios.create({ baseURL: 'http://localhost:3000/api/collections', withCredentials: true })

const COLLECTIONS_SERVICE = {
  createCollection: (collection) => SERVICE.post('/', collection),
  getAllCollections: () => SERVICE.get('/'),
  getOneCollection: (id) => SERVICE.get(`/${id}`),
  updateCollection: (id, update) => SERVICE.put(`/${id}`, update),
  deleteCollection: (id) => SERVICE.delete(`/${id}`)
}

export default COLLECTIONS_SERVICE;