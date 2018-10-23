import { setSavedArticles } from '../actions';
import axios from 'axios';
import { store } from '../store';

export default() => {
  axios.get('/articles/saved')
    .then(response => {
      store.dispatch(setSavedArticles(response.data))
  })
  .catch(err => console.log(err));
}