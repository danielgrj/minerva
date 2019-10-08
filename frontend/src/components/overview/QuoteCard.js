import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { QuotesContext } from '../../context/QuotesContext'

export default function QuoteCard({ quote }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { deleteOneQuote } = useContext(QuotesContext)

  return (
    <div className="quote-card">
      <Link to={`/main/quote/${quote._id}`} className="content">
        <span dangerouslySetInnerHTML={{ __html: quote.html }}></span>
      </Link>
      <div className="meta">
        <div>
          <h3>Title</h3>
        </div>
        <div className={`options ${ isOptionsVisible ? 'options-active' : ''}`}>
          <button className="options-button" onClick={() => setIsOptionsVisible(!isOptionsVisible)}><FontAwesomeIcon icon={faEllipsisV} /></button>
          <CSSTransitionGroup
            transitionName="options"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={200}
          >
            {isOptionsVisible ?
              <div className="options-actions">
                <button onClick={() => deleteOneQuote(quote._id)} className="delete"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                <button className="edit"><FontAwesomeIcon icon={faPenSquare} /> Change reference</button>
              </div>
              : undefined}
          </CSSTransitionGroup>
        </div>
      </div>
    </div>
  )
}
