import React, { createContext, Component } from 'react'
import QUOTES_SERVICE from '../services/quotes'

export const QuotesContext = createContext()

export default class QuotesProvider extends Component {
  state = {
    quotes: [],
    currentQuote: {},
    filters: {}
  }

  componentDidMount = async () => {
    this.getAllQuotes()
  }

  getAllQuotes = async () => {
    const { data: quotes} = await QUOTES_SERVICE.getAllQuotes()
    this.setState({ quotes })
  }

  getOneQuote = async (id) => {
    const { data: currentQuote } = await QUOTES_SERVICE.getOneQuote(id)
    this.setState({ currentQuote })
  }

  createOneQuote = async (data) => {
    const { data: quote } = await QUOTES_SERVICE.createQuote(data);
    this.setState(prevState => {
      const { quotes } = prevState;
      
      return { quotes: [...quotes, quote]}
    })
  }

  updateOneQuote = async (id, data) => {
    await QUOTES_SERVICE.updateQuote(id, data);
  }
  
  addQuote = (quote) => {
    this.setState(prevState => {
      const { quotes: oldQuotes } = prevState;
      
      if (!JSON.stringify(oldQuotes).includes(quote._id)) return { quotes: [...oldQuotes, quote] }
      const quotes = oldQuotes.map((currentQuote) => {
        if(currentQuote._id === quote._id) {
          return quote
        }
        return currentQuote
      })
      return { quotes }
    })
  }

  deleteOneQuote = async (id) => {
    const { data: quoteToRemove } = await QUOTES_SERVICE.deleteQuote(id);
    this.setState((prevState) => {
      const { quotes: oldQuotes } = prevState
      const quotes = oldQuotes.filter((quote) => quote._id !== quoteToRemove._id );

      return { quotes }
    })
  }

  render() {
    const { quotes, currentQuote, filter } = this.state
    const { getAllQuotes, getOneQuote, createOneQuote, deleteOneQuote, addQuote, updateOneQuote } = this
    return (
      <QuotesContext.Provider value={ {quotes, currentQuote, filter, getAllQuotes, getOneQuote, createOneQuote, deleteOneQuote, addQuote, updateOneQuote} }>
        {this.props.children}
      </QuotesContext.Provider>
    )
  }
}