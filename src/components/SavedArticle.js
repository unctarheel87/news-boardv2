import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import getSavedArticles from './getSavedArticles';
 
export default(props) => {
  return (
    <div>
      <img src={props.article.image} />
      <h5><a href={props.article.link} target="_blank">{props.article.title}</a></h5>
      <p>{props.article.summary}</p>
      <p className="author">{props.article.author}</p>
      <Comment article={props.article} />
      <button className='btn red lighten-3 delete-btn' 
              onClick={(e) => { removeArticle(props.article._id) }}
      >
      x</button>
    </div>
  );
}

function removeArticle(id) {
  axios.delete(`/articles/saved/${id}`)
    .then(response => getSavedArticles())
    .catch(err => console.log(err));
}