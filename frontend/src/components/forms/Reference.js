import React, { useState, useEffect, useContext } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import REFERENCE_SERVICE from './../../services/references'

import './reference.css'
import { ReferencesContext } from '../../context/ReferencesContext'



export default function Reference(props) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ referenceData, setReferenceData ] = useState({
    type: 'BOOK',
    title: '',
    firstName: '',
    lastName: '',
    volume: 1,
    edition: '',
    place: '',
    publisher: '',
    date: '',
    numberOfPages: 0,
    language: '',
    isbn: '',
    url: '',
    doi: '',
    accessed: '',
    archive: ''
  })

  const { 
    currentReference, 
    getOneReference, 
    createOneReference, 
    updateOneReference, 
    cleanCurrentReference 
  } = useContext(ReferencesContext)

  useEffect(() => { 
    setIsVisible(true)
    
    if ((!referenceData._id && props.match.params.id) || referenceData._id !== props.match.params.id) {
      getOneReference(props.match.params.id)

      for(const key in currentReference) {
        if (currentReference[key] === null) currentReference[key] = ''
      }

      setReferenceData({ 
        ...currentReference,
        lastName: currentReference.author ? currentReference.author.lastName : '', 
        firstName: currentReference.author ? currentReference.author.firstName : '',
      }) 
    }
  }, [currentReference])

  const handleInput = (e) => {
    setReferenceData({ ...referenceData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if(referenceData._id){
      updateOneReference(referenceData._id, {
        ...referenceData, author: {
          firstName: referenceData.firstName,
          lastName: referenceData.lastName
        }
      })
    } else {
      createOneReference({
        ...referenceData, author: {
          firstName: referenceData.firstName,
          lastName: referenceData.lastName
        }
      })
    }

    cleanCurrentReference()
    props.history.goBack()
  }

  return (
    <div className="route-container">
      <div className="back-container" onClick={() => {
        setIsVisible(false)
        setTimeout(() => {
          props.history.goBack()
        }, 250)
      }}></div>
      <CSSTransitionGroup
        transitionName="quote"
        transitionAppearTimeout={600}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}
        component="div"
      >
        {isVisible ? 
          <div className="reference-container">
            <form className="reference" onSubmit={onSubmit}>
              <h2>{props.match.params.id ? 'Edit reference' : 'Add reference'}</h2>
              <select name="type" id="type">
                <option value="BOOK">Book</option>
                <option value="BOOK_SECTION">Book Section</option>
                <option value="ENCYCLOPEDIA_ARTICLE">Encyclopedia article</option>
                <option value="JOURNAL_ARTICLE">Journal article</option>
                <option value="MAGAZINE_ARTICLE">Magazine article</option>
                <option value="NEWSPAPER_ARTICLE">Newspaper article</option>
                <option value="THESIS">Thesis</option>
                <option value="WEB_PAGE">Web page</option>
              </select>
              <div className="fields">
                <label htmlFor="Title">Title</label>
                <input type="text" name="title" value={referenceData.title} onChange={handleInput}/>
                <label htmlFor="author.firstName">First name</label>
                <input type="text" name="firstName" id="firstName" value={referenceData.firstName} onChange={handleInput} />
                <label htmlFor="author.lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={referenceData.lastName} onChange={handleInput} />
                <label htmlFor="publiser">Publiser</label>
                <input type="text" name="publisher" id="publiser" value={referenceData.publisher} onChange={handleInput}/>
                <label htmlFor="place">Place</label>
                <input type="text" name="place" id="place" value={referenceData.place} onChange={handleInput}/>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={referenceData.date} onChange={handleInput}/>
                <label htmlFor="numberOfPages">Number of pages</label>
                <input type="number" name="numberOfPages" id="numberOfPages" value={referenceData.numberOfPages} onChange={handleInput}/>
                <label htmlFor="volume">Volume</label>
                <input type="number" name="volume" id="volume" value={referenceData.volume} onChange={handleInput}/>
                <label htmlFor="url">Website url</label>
                <input type="url" name="url" id="url" value={referenceData.url} onChange={handleInput}/>
                <label htmlFor="accessed">Date of access</label>
                <input type="date" name="accessed" id="accessed" value={referenceData.accessed} onChange={handleInput}/>
                <label htmlFor="edition">Edition</label>
                <input type="text" name="edition" id="edition" value={referenceData.edition} onChange={handleInput}/>
                <label htmlFor="archive">Archive</label>
                <input type="text" name="archive" id="archive" value={referenceData.archive} onChange={handleInput}/>
                <label htmlFor="language">Language</label>
                <input type="text" name="language" id="language" value={referenceData.language} onChange={handleInput}/>
                <label htmlFor="isbn">ISBN</label>
                <input type="text" name="isbn" id="isbn" value={referenceData.isbn} onChange={handleInput}/>
                <label htmlFor="doi">DOI</label>
                <input type="text" name="doi" id="doi" value={referenceData.doi} onChange={handleInput}/>
              </div> 
              <input type="submit" value="Save reference" />
            </form>
          </div> 
        : undefined}
      </CSSTransitionGroup>
    </div>
  )
}
