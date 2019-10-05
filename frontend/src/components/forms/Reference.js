import React, { useState, useEffect } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './reference.css'

const handleInput = (referenceData, setReferenceData) => (e) =>{
  setReferenceData({...referenceData, [e.target.name]: e.target.value});
}

export default function Reference(props) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ referenceData, setReferenceData ] = useState({
    title: '',
    firstName: '',
    lastName: '',
    volume: 1,
    edition: '',
    place: '',
    publisher: '',
    date: '',
    numberOfPages: '',
    language: '',
    isbn: '',
    url: '',
    accessed: '',
    archive: ''
  })

  useEffect(() => { 
    setIsVisible(true) 
  }, [])

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
            <form className="reference" onSubmit={(e) => { e.preventDefault(); console.log(referenceData) }}>
              <select name="type" id="type">
                <option value="BOOK">Book</option>
                <option value="MAGAZINE">Magazine</option>
              </select>
              <div className="fields">
                <label htmlFor="Title">Title</label>
                <input type="text" name="title" value={referenceData.title} onChange={handleInput(referenceData, setReferenceData)}/>
                <label htmlFor="author.firstName">First name</label>
                <input type="text" name="firstName" id="firstName" value={referenceData.firstName} onChange={handleInput(referenceData, setReferenceData)} />
                <label htmlFor="author.lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={referenceData.lastName} onChange={handleInput(referenceData, setReferenceData)} />
                <label htmlFor="publiser">Publiser</label>
                <input type="text" name="publisher" id="publiser" value={referenceData.publisher} onChange={handleInput(referenceData, setReferenceData)}/>
                <label htmlFor="place">Place</label>
                <input type="text" name="place" id="place" value={referenceData.place} onChange={handleInput(referenceData, setReferenceData)}/>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" value={referenceData.date} onChange={handleInput(referenceData, setReferenceData)}/>
              </div>
              <input type="submit" value="Save reference" />
            </form>
          </div> 
        : undefined}
      </CSSTransitionGroup>
    </div>
  )
}
