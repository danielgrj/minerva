import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faQuoteRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import Quote from '../editor/Quote'

import { CSSTransitionGroup } from 'react-transition-group' 

import './layout.css'
import Reference from '../forms/Reference'
import Navbar from './Navbar'

export default class Layout extends Component {
  state = {
    editorModal: undefined,
    isPlusActive: false
  }

  handleCloseModal = (e) => {
    if (e.target.className === 'modal-container') this.setState({ editorModal: undefined })
  }

  handleQuote = () => {
    this.setState({ editorModal: (
      <div className="modal-container" onClick={this.handleCloseModal}>
        <Quote />
      </div>
    )})
  }

  handlePlusButton = () => {
    this.setState(prevState => {
      const { isPlusActive } = prevState;

      return { isPlusActive: !isPlusActive }
    })
  }

  render() {
    return (
      <div className="layout-container">
        <Navbar />
        <div className="layout">
          {this.state.editorModal}
          <div className="collections"></div>
          <div className="references"></div>
          <div className="main-content">
            <div className="add-content">
              <CSSTransitionGroup
                transitionName="plus-button"
                transitionEnterTimeout={250}
                transitionLeaveTimeout={200}
                component="div"
              >
                {this.state.isPlusActive ?
                  <div className="add-content-buttons">
                    <div>Add quote <Link to="/main/quote/add" onClick={this.handlePlusButton}><button><FontAwesomeIcon icon={faQuoteRight} /></button></Link></div>
                    <div>Add reference <Link to="/main/reference/add"><button><FontAwesomeIcon icon={faBookOpen} /></button></Link></div>
                  </div>
                  : undefined}
              </CSSTransitionGroup>

              <button onClick={this.handlePlusButton}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
          </div>
          <Switch>
            <Route exact path="/main/quote/add" component={Quote} />
            <Route exact path="/main/reference/add" component={Reference} />
          </Switch>
        </div>
      </div>
    )
  }
}
