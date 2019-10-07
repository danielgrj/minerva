import React, { createContext, Component } from 'react'
import QUOTES_SERVICE from './../services/quotes'

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
    console.log(quotes)
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
  
  addQuote = (quote) => {
    this.setState(prevState => {
      const { quotes } = prevState;
      
      if (!JSON.stringify(quotes).includes(quote._id)) return { quotes: [...quotes, quote] }
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
    const { getAllQuotes, getOneQuote, createOneQuote, deleteOneQuote, addQuote } = this
    return (
      <QuotesContext.Provider value={ {quotes, currentQuote, filter, getAllQuotes, getOneQuote, createOneQuote, deleteOneQuote, addQuote} }>
        {this.props.children}
      </QuotesContext.Provider>
    )
  }
}