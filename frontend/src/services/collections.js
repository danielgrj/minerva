import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://atldan-minerva.herokuapp.com/api/collections' : 'http://localhost:3000/api/collections';

const SERVICE = axios.create({ baseURL, withCredentials: true })

const COLLECTIONS_SERVICE = {
  createCollection: (collection) => SERVICE.post('/', collection),
  getAllCollections: () => SERVICE.get('/'),
  getOneCollection: (id) => SERVICE.get(`/${id}`),
  updateCollection: (id, update) => SERVICE.put(`/${id}`, update),
  deleteCollection: (id) => SERVICE.delete(`/${id}`)
}

export default COLLECTIONS_SERVICE;