import axios from 'axios';

const SERVICE = axios.create({ baseURL: 'http://localhost:3000/api/files', withCredentials: true })

const FILES_SERVICE = {
  uploadFile: (formData) => SERVICE.post('/', formData)
}

export default FILES_SERVICE;