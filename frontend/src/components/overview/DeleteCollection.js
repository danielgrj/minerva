import React, { useState, useEffect, useContext } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { CollectionsContext } from '../../context/CollectionsContext'

import './deleteCollection.css'

export default function DeleteCollection(props) {
  const [isVisible, setIsVisible] = useState(false)
  const [name, setName] = useState('')
  const { currentCollection, deleteOneCollection } = useContext(CollectionsContext)

  useEffect(() => {
    setIsVisible(true)
    console.log('mounting')
  }, [])

  // useEffect(() => {
  //   if(name === currentCollection.name){
  //     document.querySelector('#delete').disabled
  //   }
  // })

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      props.history.goBack()
    }, 200)
  }

  const deleteCollection = () => {
    deleteOneCollection(currentCollection._id);
    props.history.push('/main')
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
          {isVisible ?
            <div className="delete-container">
              <div className="delete-card">
                <div className="delete-close"><button onClick={handleClose}><FontAwesomeIcon icon={faTimesCircle} /></button></div>
                <p>This action <b>cannot</b> be undone. This will permanently remove <b>{currentCollection.name}</b> from your collections.</p>
                <p>Please type in the name of the collection to confirm</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button id="delete" disabled={name !== currentCollection.name} onClick={deleteCollection} >Delete collection</button>
              </div>
            </div>
            : undefined}
        </CSSTransitionGroup>
    </div>
  )
}
