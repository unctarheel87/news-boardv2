export default (state, action) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.articles.filter((article, i) => {
          return state.savedArticles.every(savedArticle => {
            return article.title !== savedArticle.title
          })
        })
      };
    case "CLEAR_ARTICLES":
      return {
        ...state,
        articles: []
      };
    case "SET_SAVED_ARTICLES":
      return {
        ...state,
        savedArticles: action.articles,
        articles: state.articles.filter((article, i) => {
          return action.articles.every(savedArticle => {
            return article.title !== savedArticle.title
          })
        })
      };
    case "CHANGE_NOTE_STATE": 
      return {
        ...state,
        savedArticles: state.savedArticles.map(article => {
          if(article._id === action.id) {
            article.comments.comment = action.noteValue
            return article
          }
          return article
        })
      }
    default:
      return state;
  }
};