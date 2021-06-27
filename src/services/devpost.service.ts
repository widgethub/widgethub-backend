
import axios from 'axios';

export const DEVPOST_API_URL = "https://devpost.com/";

export const devpostRequest = () => {
  return axios.get(DEVPOST_API_URL+"pinosaur")
    .then(res => res)
    .catch(err => err)
}