import React, { Component } from 'react';
import axios from 'axios';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import { getSavedArticles, getSavedArticle } from './getSavedArticles';
import { store } from '../store';

import openSocket from 'socket.io-client';

const socket = openSocket('http://127.0.0.1:8080');
socket.on('message', msg => {
  window.Materialize.toast(msg, 10000)
})

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentIcons: {
        isVisible: true
      },
      editForm: {
        isVisible: false
      },
      commentText: {
        isVisible: true
      },
      comment: this.props.comment.comment
    }

    this.handleCommentView = this.handleCommentView.bind(this)
    this.handleIconsView = this.handleIconsView.bind(this)
    this.handleFormView = this.handleFormView.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleIconsView(bool) {
    this.setState({commentIcons: {isVisible: bool}})
  }
  handleFormView(bool) {
    this.setState({editForm: {isVisible: bool}})
  }
  handleCommentView(bool) {
    this.setState({commentText: {isVisible: bool}})
  }
  handleChange(e) {
    console.log(this.state.comment)
    this.setState({comment: e.target.value})
  }
  render() {
    if(this.props.article.comments.length > 0) {
      return (
        <Collapsible className="z-depth-0">
          <CollapsibleItem header='View comment' id="comment-container" icon='message'>
            {this.state.commentText.isVisible && this.props.comment.comment} 
            <span className="timestamp">{this.state.commentText.isVisible && "Updated : " + this.props.comment.updated}</span>
            {this.state.commentIcons.isVisible && 
              <CommentIcons 
                article={this.props.article}
                comment={this.props.comment} 
                handleFormView={this.handleFormView}
                handleIconsView={this.handleIconsView}
                handleCommentView={this.handleCommentView}
              /> 
            }
            {this.state.editForm.isVisible &&
              <EditForm 
                article={this.props.article} 
                commentVal={this.state.comment}
                comment={this.props.comment}
                handleChange={this.handleChange}
                handleFormView={this.handleFormView}
                handleIconsView={this.handleIconsView}
                handleCommentView={this.handleCommentView}
              />
            }
          </CollapsibleItem>
        </Collapsible>
      )
    } else {
      return <div></div>
    }
  }
}

function updateComment(e, id, title, article_id) {
  e.preventDefault();
  const comment = e.target.comment.value
  axios.put(`/articles/comments/${id}`, { comment })
    .then(response => {
      emit('comment updated for article:<br>' + title.slice(0, 23) + '...')
      getSavedArticle(article_id)
    })
    .catch(err => console.log(err));
}

function EditForm(props) { 
  return (
    <form id="edit-form" onSubmit = {(e) => {
        updateComment(e, props.comment._id, props.article.title, props.article._id)
        props.handleFormView(false)
        props.handleCommentView(true)
        props.handleIconsView(true)
      }}
    >  
    <textarea className="materialize-textarea"
      name="comment"
      value={props.commentVal} 
      onChange={props.handleChange}
    >
    </textarea>
    <button className='btn red lighten-3 comment-btn' type="submit">Add</button>
    </form>
  )
}

function CommentIcons(props) {
  return (
    <div className="comment-icons">
      <i className="material-icons" 
        onClick={(e) => {
          props.handleFormView(true)
          props.handleCommentView(false)
          props.handleIconsView(false)
        } 
        }
      >mode_edit</i>
      <i className="material-icons"
      onClick={(e) => {
        removeComment(props.comment._id, props.article.title, props.article._id)
      } 
      }
      >delete</i>
    </div>
  )
}

function removeComment(id, title, article_id) {
  axios.delete(`/comments/${id}`)
    .then(response => {
      emit('comment deleted for article:<br>' + title.slice(0, 23) + '...')
      getSavedArticle(article_id)
      })
    .catch(err => console.log(err));
}

function emit(msg) {
  socket.emit('message', msg) 
}