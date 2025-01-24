import axios  from 'axios'

export default await axios.create({
    baseURL: 'http://localhost:3001'
});