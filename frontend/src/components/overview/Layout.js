import React, { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faQuoteRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CSSTransitionGroup } from 'react-transition-group' 

import Quote from '../editor/Quote'
import Reference from '../forms/Reference'
import Navbar from './Navbar'
import Quotes from './Quotes'
import QuotesProvider from '../../context/quotesContext'
import ReferencesProvider from '../../context/ReferencesContext'

import './layout.css'
import References from './References'

export default function Layout () {
  const [ isPlusActive, setIsPlusActive ] = useState(false);

  return (
    <ReferencesProvider>
      <QuotesProvider>
        <div className="layout-container">
          <Navbar />
          <div className="layout">
            <div className="collections">
            </div>
            <References />
            <div className="main-content">
              <Quotes />
              <div className="add-content">
                <CSSTransitionGroup
                  transitionName="plus-button"
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={200}
                  component="div"
                >
                  {isPlusActive ?
                    <div className="add-content-buttons">
                      <div>Add quote <Link to="/main/quote/add" onClick={() => setIsPlusActive(!isPlusActive)}><button><FontAwesomeIcon icon={faQuoteRight} /></button></Link></div>
                      <div>Add reference <Link to="/main/reference/add"><button><FontAwesomeIcon icon={faBookOpen} /></button></Link></div>
                    </div>
                    : undefined}
                </CSSTransitionGroup>
                <button onClick={() => setIsPlusActive(!isPlusActive)}><FontAwesomeIcon icon={faPlus} /></button>
              </div>
            </div>
            <Switch>
              <Route exact path="/main/quote/add" component={Quote} />
              <Route exact path="/main/quote/:id" component={Quote} />
              <Route exact path="/main/reference/add" component={Reference} />
              <Route exact path="/main/reference/:id/edit" component={Reference} />
            </Switch>
          </div>
        </div>
      </QuotesProvider>
    </ReferencesProvider>
  )
}