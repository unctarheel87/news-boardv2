import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { store } from '../store';
import { clearArticles } from '../actions';
import Search from './Search'

export default (props) => {
  return (
    <Navbar brand='NewsBoard' right>
      <NavItem onClick={() => {
            $('#search_modal').modal('open')
          }}
      >
        <Icon>search</Icon><span>Search</span>
      </NavItem>
      <NavItem onClick={clear}><Icon>clear_all</Icon><span>Clear Articles</span></NavItem>
      <Search />
    </Navbar>
  ) 
}

function clear() {
  store.dispatch(clearArticles())
}