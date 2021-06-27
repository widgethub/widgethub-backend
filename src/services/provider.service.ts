
import axios from 'axios';
import { GITHUB_BEARER_TOKEN } from '../config';

export const GITHUB_API_URL = "https://api.github.com/graphql";
export const DEVPOST_API_URL = "https://devpost.com/";
export const REDDIT_API_URL = "https://reddit.com/user/";
export const TWITTER_API_URL = "https://twitter.com/";

export const githubRequest = (githubUsername: string) => {

  const query = {
      query: `
        {
          user(login: "${githubUsername}") {
            login
            avatarUrl
            followers {
              totalCount
            }
            following {
              totalCount
            }
            repositories {
              totalCount
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
            itemShowcase {
              items(first: 6) {
                edges {
                  node {
                    ... on Repository {
                      nameWithOwner
                      description
                      primaryLanguage {
                        name
                      }
                      forkCount
                      stargazerCount
                      url
                    }
                  }
                }
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
    .then(res => res.data)
    .catch(err => err)
}

export const devpostRequest = async (username: string) => {
  return axios.get(DEVPOST_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}

export const redditRequest = async (username: string) => {
  return axios.get(REDDIT_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}

export const twitterRequest = async (username: string) => {
  return axios.get(TWITTER_API_URL+username)
    .then(res => res.data)
    .catch(err => err)
}