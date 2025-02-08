import axios  from 'axios'
import { link } from './globals.module';

export default axios.create({
    baseURL: link
});