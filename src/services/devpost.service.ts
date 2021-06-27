
import axios from 'axios';

export const DEVPOST_API_URL = "https://devpost.com/";

export const devpostRequest = async (username: string) => {
  return axios.get(DEVPOST_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}
