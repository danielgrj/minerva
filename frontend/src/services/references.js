import axios from 'axios';

const SERVICE = axios.create({ baseURL: 'http://localhost:3000/api/references', withCredentials: true })

const REFERENCE_SERVICE = {
  createReference: (reference) => SERVICE.post('/', reference),
  findAllReferences: () => SERVICE.get('/'),
  findOneReference: (id) => SERVICE.get(`/${id}`),
  updateReference: (id, update) => SERVICE.put(`/${id}`, update),
  deleteReference: (id) => SERVICE.delete(`/${id}`)
}

export default REFERENCE_SERVICE;