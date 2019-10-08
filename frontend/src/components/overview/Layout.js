import React, { useState, useEffect } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faQuoteRight, faPlus, faFolder } from '@fortawesome/free-solid-svg-icons'
import { CSSTransitionGroup } from 'react-transition-group' 

import Quote from '../editor/Quote'
import Reference from '../forms/Reference'
import Navbar from './Navbar'
import References from './References'
import Collection from '../forms/Collection'
import Collections from './Collections'
import CollectionOverview from './CollectionOverview'
import DefaultView from './DefaultView'
import ReferenceOverview from './ReferenceOverview'
import QuotesProvider from './../../context/QuotesContext'
import ReferencesProvider from './../../context/ReferencesContext'
import CollectionsProvider from './../../context/CollectionsContext'

import './layout.css'
import StylesProvider from '../../context/StylesContext'

export default function Layout (props) {
  const [ isPlusActive, setIsPlusActive ] = useState(false);

  useEffect(() => {
    if(!localStorage.user) return props.history.push('/login')
  }, [props.history])

  return (
    <StylesProvider>
      <CollectionsProvider>
        <ReferencesProvider>
          <QuotesProvider>
            <div className="layout-container">
              <Navbar />
              <div className="layout">
                <Collections />
                <References />
                <div className="main-content">
                  <Switch>
                    <Route exact path="/main" component={DefaultView} />
                    <Route exact path="/main/collections/:id" component={CollectionOverview} />
                    <Route exact path="/main/references/:id" component={ReferenceOverview} />
                  </Switch>
                  {/* <Quotes /> */}
                  <div className="add-content">
                    <CSSTransitionGroup
                      transitionName="plus-button"
                      transitionEnterTimeout={250}
                      transitionLeaveTimeout={200}
                      component="div"
                    >
                      {isPlusActive ?
                        <div className="add-content-buttons">
                          <div>Add quote
                          <Link to="/main/quote/add" onClick={() => setIsPlusActive(!isPlusActive)}>
                              <button className="plus-quote"><FontAwesomeIcon icon={faQuoteRight} /></button>
                            </Link>
                          </div>
                          <div>Add reference <Link to="/main/reference/add"><button className="plus-reference"><FontAwesomeIcon icon={faBook} /></button></Link></div>
                          <div>Add collection <Link to="/main/collection/add"><button className="plus-collection"><FontAwesomeIcon icon={faFolder} /></button></Link></div>
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
                  <Route exact path="/main/collection/add" component={Collection} />
                  <Route exact path="/main/collection/:id/edit" component={Collection} />
                </Switch>
              </div>
            </div>
          </QuotesProvider>
        </ReferencesProvider>
      </CollectionsProvider>
    </StylesProvider>
  )
}