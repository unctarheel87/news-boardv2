import React from 'react';
import axios from 'axios';
import { store } from '../store';
import getSavedArticles from './getSavedArticles';
 
export default(props) => {
  const saveArticle = (e) => {
    const title = props.article.title
    const summary = props.article.summary
    const image = props.article.img
    const author = props.article.author
    const link = props.article.link
    const article = { title, summary, image, author, link }
    
    axios.post('/save', article)
      .then(response => {
        getSavedArticles();
      })
      .catch(err => console.log(err));
  }
  return (
    <div>
      <img src={props.article.img} />
      <h5><a href={props.article.link} target="_blank">{props.article.title}</a></h5>
      <p>{props.article.summary}</p>
      <p className="author">{props.article.author}</p>
      <button className="btn grey lighten-3" onClick={saveArticle}>Save Article</button>
    </div>
  );
}