import React, { Component, useContext, useState, useEffect } from 'react'
import { savedQuote, updateQuote, updatedQuote } from '../../services/editor'
import Editor from './Editor'
import Camera from 'react-html5-camera-photo'
import Tesseract from 'tesseract.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCamera, faBook } from '@fortawesome/free-solid-svg-icons'
import { QuotesContext } from '../../context/quotesContext'
import QUOTES_SERVICE from '../../services/quotes'
import { CSSTransitionGroup } from 'react-transition-group' 

import 'react-html5-camera-photo/build/css/index.css';
import './quote.css'

export default function Quote (props){
  const [ id, setId ] = useState(props.match.params.id);
  const [ ocrText, setOcrText ] = useState(undefined);
  const [ imageUrl, setImageUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isCameraActive, setIsCameraActive ] = useState(false);
  const [ isVisible, setIsVisible ] = useState(false)
  const [ quote, setQuote ] = useState(undefined)

  const { addQuote } = useContext(QuotesContext)

  useEffect(() => {
    setIsVisible(true)

    return () => {
      if(quote) addQuote(quote)
    }
  }, [quote])

  const handleGetDocument = async (cb) => {
    const { data: quote } = await QUOTES_SERVICE.getOneQuote(id)
    setQuote(quote)
    cb(quote)
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      props.history.goBack()
    }, 200)
  }

  const scanText = async (image) => {
    setIsLoading(true)

    const result = await Tesseract
      .recognize(image, 'eng')
      .progress((p) => {
        console.log(p)
      })
    Tesseract.terminate();

    setOcrText(result.text)
    console.log(result.text)
    setIsLoading(false)
  }

  const handlePhoto = (dataUri) => {
    scanText(dataUri)
    setIsCameraActive(false)
  }

  const handleAttachment = async (e) => {
    scanText(e.target.files[0])
  }

  const handleQuote = (quote) => {
    if (quote) {
      updatedQuote((err, quote) => {
        setQuote(quote)
      })
    }
  }

  const renderImage = () => {
    if (imageUrl) return <div><img src={imageUrl} alt="Quote image" /></div>
  }

  return (
    <div className="route-container">
      <div className="back-container" onClick={handleClose}></div>
      <CSSTransitionGroup
        transitionName="quote"
        transitionAppearTimeout={600}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}
        component="div"
      >
        { isVisible ? 
          <div className="quote-container">
            <div className="quote">
              <div>
                <div className="quote-menu">
                  <div className="upload-wrapper">
                    <button><FontAwesomeIcon icon={ faImage } /></button>
                    <input type="file" onChange={ handleAttachment } />
                  </div>
                  <button onClick={ () => setIsCameraActive(true) }><FontAwesomeIcon icon={faCamera} /></button>
                  <button><FontAwesomeIcon icon={faBook}/></button>
                </div>
                {renderImage()}
                { isLoading ? <div className="spin-circle"></div> : undefined }
              </div>
              <Editor
                handleSaved={ savedQuote }
                handleUpdate={ updateQuote }
                isQuote={ true }
                id={ id }
                handleId={ setId }
                handleDocument={ handleQuote }
                ocrText={ ocrText }
                textDocument={ quote }
                handleGetDocument={ handleGetDocument }
              />
            </div>
            { isCameraActive ? <Camera onTakePhoto={handlePhoto} isFullscreen={true} /> : undefined }
          </div> 
        : undefined }
      </CSSTransitionGroup>
    </div>
  )
}