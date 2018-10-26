import { setSavedArticles, setSavedArticle } from '../actions';
import axios from 'axios';
import { store } from '../store';

export const getSavedArticles = () => {
  axios.get('/articles/saved')
    .then(response => {
      store.dispatch(setSavedArticles(response.data))
      console.log('refresh')
  })
  .catch(err => console.log(err));
}

export const getSavedArticle = (id) => {
  axios.get('/articles/saved/' + id)
    .then(response => {
      store.dispatch(setSavedArticle(response.data))
  })
  .catch(err => console.log(err));
}