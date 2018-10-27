import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import { getSavedArticle } from './getSavedArticles';
import { setStars } from '../actions';
import { store } from '../store';
import openSocket from 'socket.io-client';

const socket = openSocket();
 
export default class SavedArticlePage extends Component {
  state = {
    stars:[]
  }
  componentDidMount() {
    getSavedArticle(this.props.match.params.id);
  }
  toggleStar = (i, id, stars) => {
    this.setState({
      stars: stars.map((star, index) => {
        if(index <= i && !star.star) {
          star.star = true
        } else if(index >= i && star.star) {
          star.star = false
        }
        return star
      }) 
    })
    updateRating(id, stars)
  } 
  render() {
    if(store.getState().savedArticle) {
      const article = store.getState().savedArticle
      const stars = (() => {
        const stars = []
        for(let i = 0; i < 4; i++) {
          if(i < article.rating) {
            stars.push({star: true})
          } else {
            stars.push({star: false})
          }
        }
        return stars
      })()
      console.log(stars)
      return (
        <div>
        <a className="arrow" href="/"><i className="material-icons">keyboard_backspace</i><span>Back</span></a>
        <div className="saved-article">
          <img src={article.image} />
          <h5><a href='/' target="_blank">{article.title}</a></h5>
          <p>{article.summary}</p>
          <p className="author">{article.author}</p>
          {stars.map((star, i) => {
            if(star.star) {
              return <i className="material-icons star-i" key={i} onClick={() => this.toggleStar(i, article._id, stars)}>star</i>
            } else {
              return <i className="material-icons star-i" key={i} onClick={() => this.toggleStar(i, article._id, stars)}>star_border</i>
            }
          })}
          <div className="comments-block">
            {article.comments.map(comment => (
              <Comment article={store.getState().savedArticle} comment={comment}/>
            ))}
          </div>
          <form onSubmit = {(e) => {
                saveComment(e, article._id, article.title)
              }}
            >  
              <h5>Add a comment:</h5>
              <textarea className="materialize-textarea" name="comment" id="text-area"></textarea>
              <button className='btn red lighten-3 comment-btn' type="submit">Add</button>
          </form>
          <button className='btn red lighten-3 delete-btn' 
                  onClick={(e) => { removeArticle(article._id) }}
          >
          x</button>
        </div>
        </div>
      );
    } else {
      return <h3 className="center-align">the requested article no longer exists...</h3>
    }
  }
}

function saveComment(e, id, title) {
  e.preventDefault();
  const comment = e.target.comment.value
  axios.post(`/articles/${id}/comments`, { comment })
    .then(response => {
      emit('comment added to article:<br>' + title.slice(0, 23) + '...')
      getSavedArticle(id)
      $('#text-area').val('');
    })
    .catch(err => console.log(err));
}

function removeArticle(id) {
  axios.delete(`/articles/saved/${id}`)
    .then(response => getSavedArticle(id))
    .catch(err => console.log(err));
}

function updateRating(id, stars) {
  let rating = 0
  stars.forEach(star => {
    star.star ? rating++ : rating
  })
  axios.put(`/articles/saved/${id}`, { rating })
    .then(response => getSavedArticle(id))
    .catch(err => console.log(err));
}

function emit(msg) {
  socket.emit('message', msg) 
}