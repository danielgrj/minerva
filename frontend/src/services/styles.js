import axios from 'axios';

const SERVICE = axios.create({ baseURL: 'http://localhost:3000/api/styles', withCredentials: true })

const STYLE_SERVICE = {
  createStyle: (style) => SERVICE.post('/', style),
  getAllStyles: () => SERVICE.get('/'),
  getOneStyle: (id) => SERVICE.get(`/${id}`),
  updateStyle: (id, update) => SERVICE.put(`/${id}`, update),
  deleteStyle: (id) => SERVICE.delete(`/${id}`)
}

export default STYLE_SERVICE;