import React from 'react';
import { setArticles, clearArticles } from '../actions';
import axios from 'axios';
import { store } from '../store';

export default(props) => {
  return (
    <div className="topic-buttons">
      <button data-topic='world' onClick={scrape}>World</button>
      <button data-topic='us' onClick={scrape}>US</button>
      <button data-topic='politics' onClick={scrape}>Politics</button>
      <button data-topic='science' onClick={scrape}>Science</button>
      <button data-topic='technology' onClick={scrape}>Technology</button>
      <button data-topic='arts' onClick={scrape}>Arts</button>
      <button data-topic='sports' onClick={scrape}>Sports</button>
    </div>
  )
}

function scrape(e) {
  clear();
  document.getElementById('preloader').style.display = 'block';
  axios.get(`/scrape/${e.target.dataset.topic}`)
  .then(response => {
    store.dispatch(setArticles(response.data))
    document.getElementById('preloader').style.display = 'none';
  })
  .catch(err => console.log(err));
}

function clear() {
  store.dispatch(clearArticles())
}