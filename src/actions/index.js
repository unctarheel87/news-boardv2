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

export function clearArticles () {
  return {
    type: "CLEAR_ARTICLES"
  }
}

export function changeNoteState (noteValue, id) {
  return {
    type: "CHANGE_NOTE_STATE",
    noteValue,
    id
  }
}