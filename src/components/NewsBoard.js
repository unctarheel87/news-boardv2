import React, { Component } from 'react';
import { store } from '../store';  
import Navbar from './Navbar';
import Articles from './Articles';
import Topics from './Topics';
import getSavedArticles from './getSavedArticles';

export default class NewsBoard extends Component {
  componentDidMount() {
    getSavedArticles();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Topics />
        {
          store.getState().articles &&
          <Articles store={store.getState()} />
        }
      </div>
    )
  }
}