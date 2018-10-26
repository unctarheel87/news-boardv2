import React, { Component } from 'react';
import { store } from '../store';  
import Navbar from './Navbar';
import Articles from './Articles';
import Topics from './Topics';
import { getSavedArticles } from './getSavedArticles';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import SavedArticlePage from './SavedArticlePage'

export default class NewsBoard extends Component {
  componentDidMount() {
    getSavedArticles();
  }
  render() {
    return (
        <BrowserRouter>
          <div>
          <Navbar />
          <Switch>
            <Route exact path='/' 
                   component={() => 
                      <div>
                        <Topics />
                        {store.getState().articles && <Articles store={store.getState()}/>} 
                      </div>
                   }
            />
            <Route exact path='/saved/:id' component={SavedArticlePage} />
          </Switch>
          </div>
        </BrowserRouter>
    )
  }
}
