import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { savedQuote, updateQuote } from '../../services/editor'
import Editor from './Editor'
import Camera from 'react-html5-camera-photo'
import Tesseract from 'tesseract.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCamera } from '@fortawesome/free-solid-svg-icons'

import { CSSTransitionGroup } from 'react-transition-group' 

import 'react-html5-camera-photo/build/css/index.css';
import './quote.css'


export default class Quote extends Component {
  state ={
    id: this.props.id ? this.props.id : undefined,
    ocrText: undefined,
    imageUrl: '',
    isLoading: false,
    progress: 0,
    id: this.props.id,
    cameraActive: false,
    isVisible: false
  }

  componentDidMount = () => {
    this.setState({ isVisible: true})
  }

  scanText = async  (image) => {
    this.setState({ isLoading: true })
    const result = await Tesseract
      .recognize(image, 'eng')
      .progress((p) => {
      })

    Tesseract.terminate();

    this.setState({ ocrText: result.text, isLoading: false })
  }

  handleClose = () => {
    console.log(this.props.history)
      this.setState(() => {
        setTimeout(() => this.props.history.goBack(), 200)
        return { isVisible: false}
      })
  }
  
  handleId = (id) => {
    this.setState({ id })
  }

  handleAttachment = async (e) => {
    this.scanText(e.target.files[0])
  }

  handleCamera = () => {
    this.setState({ cameraActive: true })
  }

  handlePhoto = async (dataUri) => {
    this.scanText(dataUri)
    this.setState({ cameraActive: false })
  }

  renderImage = () => {
    if (this.state.imageUrl) return <div><img src={this.state.imageUrl} alt="Quote image" /></div>
  }

  render() {
    return (
      <div className="route-container">
        <div className="back-container" onClick={this.handleClose}></div>
        <CSSTransitionGroup
          transitionName="quote"
          transitionAppearTimeout={600}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={200}
          component="div"
        >
          {this.state.isVisible ? <div className="quote-container">
            <div className="quote">
              <div>
                <div className="quote-menu">
                  <div className="upload-wrapper">
                    <button><FontAwesomeIcon icon={faImage} /></button>
                    <input type="file" onChange={this.handleAttachment} />
                  </div>
                  <button onClick={this.handleCamera}><FontAwesomeIcon icon={faCamera} /></button>
                </div>
                {this.renderImage()}
                {this.state.isLoading ? <div className="spin-circle"></div> : undefined}
              </div>
              <Editor
                handleSaved={savedQuote}
                handleUpdate={updateQuote}
                isQuote={true} id={this.state.id}
                handleId={this.handleId}
              />
            </div>
            {this.state.cameraActive ? <Camera onTakePhoto={this.handlePhoto} isFullscreen={true} /> : undefined}
          </div> : undefined}
        </CSSTransitionGroup>
      </div>
    )
  }
}
