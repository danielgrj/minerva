import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/references';

const SERVICE = axios.create({ baseURL, withCredentials: true })

const REFERENCE_SERVICE = {
  createReference: (reference) => SERVICE.post('/', reference),
  getAllReferences: () => SERVICE.get('/'),
  getOneReference: (id) => SERVICE.get(`/${id}`),
  updateReference: (id, update) => SERVICE.put(`/${id}`, update),
  deleteReference: (id) => SERVICE.delete(`/${id}`)
}

export default REFERENCE_SERVICE;