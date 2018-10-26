import React from 'react';
import Comment from './Comment';
import { Link } from 'react-router-dom'
 
export default(props) => {
  const stars = (() => {
    const stars = []
    for(let i = 0; i < 4; i++) {
      if(i < props.article.rating) {
        stars.push({star: true})
      } else {
        stars.push({star: false})
      }
    }
    return stars
  })()
  return (
    <div>
      <img id="article-img" src={props.article.image} />
      <h5><a href={props.article.link} target="_blank">{props.article.title}</a></h5>
      <p>{props.article.summary}</p>
      <p className="author">{props.article.author}</p>
      {stars.map((star, i) => {
        if(star.star) {
          return <i className="material-icons star-i" key={i} onClick={() => this.toggleStar(i, article._id, stars)}>star</i>
        } else {
          return <i className="material-icons star-i" key={i} onClick={() => this.toggleStar(i, article._id, stars)}>star_border</i>
        }
      })}
      <Link to={`/saved/${props.article._id}`}>
        <button className="btn-floating btn-medium waves-effect waves-light red lighten-2">
          <i className="material-icons">edit</i>
        </button>
      </Link>
    </div>
  );
}