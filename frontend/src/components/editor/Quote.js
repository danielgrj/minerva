import React, { Component, useContext, useState, useEffect } from 'react'
import { savedQuote, updateQuote, updatedQuote } from '../../services/editor'
import Editor from './Editor'
import Camera from 'react-html5-camera-photo'
import Tesseract from 'tesseract.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCamera, faBook } from '@fortawesome/free-solid-svg-icons'
import { QuotesContext } from '../../context/QuotesContext'
import QUOTES_SERVICE from '../../services/quotes'
import { CSSTransitionGroup } from 'react-transition-group' 

import 'react-html5-camera-photo/build/css/index.css';
import './quote.css'
import { CollectionsContext } from '../../context/CollectionsContext'

export default function Quote (props){
  const [ id, setId ] = useState(props.match.params.id);
  const [ ocrText, setOcrText ] = useState(undefined);
  const [ imageUrl, setImageUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isCameraActive, setIsCameraActive ] = useState(false);
  const [ isVisible, setIsVisible ] = useState(false)
  const [ quote, setQuote ] = useState(undefined)

  const { addQuote } = useContext(QuotesContext)
  const { collections, updateOneCollection } = useContext(CollectionsContext)

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
      })
    Tesseract.terminate();

    setOcrText(result.text)
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

  const setCollection = () => {
    const id = document.querySelector('#collection').value;
    const collection = collections.find((currentCollection) => currentCollection._id === id)

    collection.quotes.push(quote._id)
    updateOneCollection(id, collection)
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
              <div className="quote-editor">
                <div>
                  <div className="quote-menu">
                    <div className="upload-wrapper">
                      <button><FontAwesomeIcon icon={faImage} /></button>
                      <input type="file" onChange={handleAttachment} />
                    </div>
                    <button onClick={() => setIsCameraActive(true)}><FontAwesomeIcon icon={faCamera} /></button>
                    <button><FontAwesomeIcon icon={faBook} /></button>
                    {isLoading ? <div className="spin-circle"></div> : undefined}
                  </div>
                  {renderImage()}
                </div>
                <Editor
                  handleSaved={savedQuote}
                  handleUpdate={updateQuote}
                  isQuote={true}
                  id={id}
                  handleId={setId}
                  handleDocument={handleQuote}
                  ocrText={ocrText}
                  textDocument={quote}
                  handleGetDocument={handleGetDocument}
                />
              </div>
              { quote ?
                <div className="add-to-collection">
                  <select name="collection" id="collection">
                    {collections.map(({ _id, name }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                  <button onClick={setCollection}>Set</button>
                </div>
              : undefined}
            </div>
            { isCameraActive ? <Camera onTakePhoto={handlePhoto} isFullscreen={true} /> : undefined }
          </div> 
        : undefined }
      </CSSTransitionGroup>
    </div>
  )
}