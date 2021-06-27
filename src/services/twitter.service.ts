
import axios from 'axios';

export const TWITTER_API_URL = "https://twitter.com/";

export const twitterRequest = async (username: string) => {
  return axios.get(TWITTER_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}