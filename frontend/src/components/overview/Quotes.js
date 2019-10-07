import React, { useContext } from 'react'
import { QuotesContext }  from '../../context/QuotesContext'


import './quotes.css'
import QuoteCard from './QuoteCard'

export default function Quotes(props) {
  const { quotes: contextQuotes }  = useContext(QuotesContext)
  const quotes = props.quotes || contextQuotes

  return (
    <div className="quotes-container">
      {quotes.map((quote) => (
        <div key={quote._id}>
          <QuoteCard quote={quote} />
        </div>
      ))}
    </div>
  )
}
