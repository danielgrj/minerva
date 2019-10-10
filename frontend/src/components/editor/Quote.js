import React, { useContext, useState, useEffect } from 'react'
import { savedQuote, updateQuote, updatedQuote, cleanConnection } from '../../services/editor'
import Camera from 'react-html5-camera-photo'
import Tesseract from 'tesseract.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faCamera, faBook } from '@fortawesome/free-solid-svg-icons'
import { CSSTransitionGroup } from 'react-transition-group' 

import Editor from './Editor'
import { CollectionsContext } from '../../context/CollectionsContext'
import { QuotesContext } from '../../context/QuotesContext'
import { ReferencesContext } from '../../context/ReferencesContext'
import QUOTES_SERVICE from '../../services/quotes'

import './quote.css'

export default function Quote (props){
  const { addQuote, updateOneQuote } = useContext(QuotesContext)
  const { collections: allCollections, updateOneCollection, getAllCollections  } = useContext(CollectionsContext)
  const { references, currentReference, getOneReference } = useContext(ReferencesContext)

  const [ id, setId ] = useState(props.match.params.id);
  const [ ocrText, setOcrText ] = useState(undefined);
  const [ imageUrl, setImageUrl ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isCameraActive, setIsCameraActive ] = useState(false);
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isFormatVisible, setIsFormatVisible ] = useState(false)
  const [ quote, setQuote ] = useState(undefined)
  const [ collections, setCollections] = useState(allCollections)

  useEffect(() => {
    setIsVisible(true)

    document.body.classList.add('block-scroll')

    return () => {
      document.body.classList.remove('block-scroll')
    }
  }, [])

  useEffect(() => {
    if(quote) {
      setCollections(allCollections.filter(collection => !collection.quotes.includes(quote._id)))
      getAllCollections()
    }

    return () => {
      if(quote) addQuote(quote)
    }
  }, [quote, allCollections, addQuote, getAllCollections])

  useEffect(() => {
    if(quote) getOneReference(quote._id)
  }, [quote])

  const handleGetDocument = async (cb) => {
    if(props.match.params.id) {
      const { data: quote } = await QUOTES_SERVICE.getOneQuote(id)
      setQuote(quote)
      cb(quote)
    }
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      props.history.goBack()
    }, 200)
  }

  const scanText = async (image) => {
    setIsLoading(true)

    console.log(isLoading)

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

  const setReference = () => {
    const referenceFrom = document.querySelector('#reference').value;
    
    updateOneQuote(quote._id, {referenceFrom})
  }

  const renderImage = () => {
    if (imageUrl) return <div><img src={imageUrl} alt="attached" /></div>
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
                    <button onClick={() => setIsFormatVisible(!isFormatVisible)}><FontAwesomeIcon icon={faBook} /></button>
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
                  handleUnmount={cleanConnection}
                />
              </div>
              { quote ?
                <div className="editor-meta">
                  <div className="add-to-collection">
                    <select name="collection" id="collection">
                      {collections.map(({ _id, name }) => (
                        <option key={_id} value={_id}>{name}</option>
                      ))}
                    </select>
                    <button onClick={setCollection}>Add</button>
                  </div>
                  <div className="add-to-reference">
                    <select name="refrence" id="reference" >
                      {references.map(({_id, authors, title}) => (
                        <option key={_id} value={_id}>{`${authors[0].lastName}, ${authors[0].lastName.charAt(0)}. ${title}`}</option>
                      ))}
                    </select>
                    <button onClick={setReference}>Set</button>
                  </div>
                </div>
              : undefined}
              
                { isLoading ? 
                <div className="loading-sect">
                  <div className="spin-circle"></div>
                </div>
                : undefined }
              
            </div>
            {isCameraActive ? <Camera className="camera-quote" onTakePhoto={handlePhoto} isFullscreen={true} isImageMirror={false} /> : undefined }
          </div> 
        : undefined }
      </CSSTransitionGroup>
    </div>
  )
}