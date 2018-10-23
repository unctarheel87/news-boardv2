import React from 'react';
import Article from './Article';
import SavedArticle from './SavedArticle';
import { Col, Preloader } from 'react-materialize';

export default(props) => {
  return (
    <main>
      <Col id="preloader" s={4}>
        <Preloader color="red" />
      </Col>
      <div className="articles">
        {
        props.store.articles.map((article, i) => {
          return <Article key={`article${i}`} article={article} />
        })
        }
      </div>
      <div className="savedArticles">
      <h4>My Articles</h4>
        {
        props.store.savedArticles.map((article, i) => {
          return <SavedArticle key={`savedArticle${i}`} article={article} />
        })
        }
      </div>
    </main>
  );
}