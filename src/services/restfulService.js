import axios from "axios";

const baseURL = "http://staccah.fattureincloud.it/testfrontend";
const MONTH_DATA_ENDPOINT = "/data.json";

const RESTfulService = axios.create({
  baseURL,
  timeout: 25000,
  withCredentials: false,
});

export async function getData() {
  return new Promise((resolve, reject) => {
    RESTfulService.get(MONTH_DATA_ENDPOINT)
      .then((response) => {
        if (response.status != 200) reject('Error on request')
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}