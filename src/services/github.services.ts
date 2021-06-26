
import axios from 'axios';
import { GITHUB_BEARER_TOKEN } from '../config';

export const GITHUB_API_URL = "https://api.github.com/graphql";

export const githubRequest = (githubUsername: string) => {

  const query = {
      query: `
        {
          user(login: "${githubUsername}") {
            contributionsCollection(from: "2019-09-28T23:05:23Z", to: "2020-09-28T23:05:23Z") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        } 
      `
  }
  const config = {
    headers: {
      Authorization: `bearer ${GITHUB_BEARER_TOKEN}`
    }
  }

  return axios.post(GITHUB_API_URL, query, config)
    .then(response => {
      return response.data
    });
}
