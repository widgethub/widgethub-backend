
import axios from 'axios';

export const REDDIT_API_URL = "https://reddit.com/user/";

export const redditRequest = async (username: string) => {
  return axios.get(REDDIT_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}