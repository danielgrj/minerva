import React, { Component } from 'react'
import { savedQuote, updateQuote } from './../services/editor'
import Editor from './editor/Editor'


export default class Quote extends Component {
  state ={
    id: this.props.id ? this.props.id : undefined
  }
  
  handleId = (id) => {
    this.setState({ id })
  }

  render() {
    return (
      <div className="quote-container">
        <Editor handleSaved={savedQuote} handleUpdate={updateQuote} isQuote={true} id={this.state.id} handleId={this.handleId}/>
      </div>
    )
  }
}
