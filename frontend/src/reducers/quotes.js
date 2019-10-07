import QUOTES_SERVICE from './../services/quotes'

export default (state, action) => {
  switch(action.type) {
    case 'GET_ALL_QUOTES': 
      return action.quotes
    case 'GET_ONE_QUOTE':
      const { quote: currentQuote } =  QUOTES_SERVICE.getOne(action.id)
      return { currentQuote }
    case 'CREATE_QUOTE': 
      const { data: quote } =  QUOTES_SERVICE.createQuote(action.data);
      return { ...state, quotes: [...state.quotes, quote] }
    case 'DELETE_QUOTE':
      const { data: quoteToRemove } =  QUOTES_SERVICE.deleteQuote(action.id);
      const quotes = state.quotes.filter((quote) => quote._id !== quoteToRemove._id);
      return { ...state, quotes }
    default:
      return state
  }
}