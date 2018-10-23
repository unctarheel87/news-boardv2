import axios from "axios";

export default {
  nytSearch: (q, begin_date, end_date, ) => {
    const API_KEY = "110f0771d0db46a5b656e3510c3cc337";
    let url =  
      "https://api.nytimes.com/svc/search/v2/articlesearch.json" +
      "?q=" + q +
      "&api-key=" + API_KEY
     
    if(begin_date) {
      url = url + "&begin_date=" + begin_date + "0101"
    } 
    if(end_date) {
      url = url + "&end_date=" + end_date + "0101"
    }
    return axios.get(url);
  }
};