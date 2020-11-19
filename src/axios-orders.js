import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-react-d6624.firebaseio.com/'
})

export default instance;