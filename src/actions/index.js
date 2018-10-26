export function setArticles (articles) {
  return {
    type: "SET_ARTICLES",
    articles
  }
}

export function setSavedArticles (articles) {
  return {
    type: "SET_SAVED_ARTICLES",
    articles
  }
}

export function setSavedArticle (article) {
  return {
    type: "SET_SAVED_ARTICLE",
    article
  }
}

export function clearArticles () {
  return {
    type: "CLEAR_ARTICLES"
  }
}

export function isLoading (isLoading) {
  return {
    type: "IS_LOADING",
    isLoading
  }
}