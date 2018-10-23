import React, { Component } from 'react';
import { Row, Input, Button, Icon, Modal } from 'react-materialize';
import API from '../utils/API'
import { store } from '../store'
import { setArticles, clearArticles } from '../actions'

export default class Search extends Component {
  state = {
    search: '',
    numRecords: 0,
    startYear: '',
    endYear: ''
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    clear();
    document.getElementById('preloader').style.display = 'block';
    API.nytSearch(
      this.state.search, 
      this.state.startYear, 
      this.state.endYear
    ).then(res => {
      $('#search_modal').modal('close')
      const records = res.data.response.docs.filter((rec, i) => i <= this.state.numRecords-1 )
      const articles = []
      console.log(records)
      records.forEach(record => {
        const title = record.headline.main
        const summary = record.snippet
        const img = record.multimedia[14] ? "https://www.nytimes.com/" + record.multimedia[14].url : ''
        const author = record.byline ? record.byline.original : ''
        const link = record.web_url
        articles.push({ title, summary, img, author, link })
      })
      document.getElementById('preloader').style.display = 'none';
      store.dispatch(setArticles(articles))
    })
     .catch(err => console.log(err))
  }
  render() {
    return (
      <Modal id='search_modal' header="Article Search">
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Input s={12} label="Search Field" onChange={this.handleChange('search')} required/>
            <Input type="number" s={12} label="# of records" onChange={this.handleChange('numRecords')} required/>
            <Input label="start year" s={6} onChange={this.handleChange('startYear')}/>
            <Input label="end year" s={6} onChange={this.handleChange('endYear')}/>
            <Button type="submit" className="btn red lighten-3 search-btn"><Icon>search</Icon></Button>
          </Row>
        </form>
      </Modal>
    )   
  }
}

function clear() {
  store.dispatch(clearArticles())
}