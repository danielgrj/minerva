import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://atldan-minerva.herokuapp.com/quotes' : 'http://localhost:3000/api/quotes';

const SERVICE = axios.create({ baseURL, withCredentials: true })

const QUOTES_SERVICE = {
  createQuote: (quote) => SERVICE.post('/', quote),
  getAllQuotes: () => SERVICE.get('/'),
  getOneQuote: (id) => SERVICE.get(`/${id}`),
  updateQuote: (id, update) => SERVICE.put(`/${id}`, update),
  deleteQuote: (id) => SERVICE.delete(`/${id}`)
}

export default QUOTES_SERVICE;