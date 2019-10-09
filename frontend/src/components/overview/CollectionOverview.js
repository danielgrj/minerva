import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faEllipsisV, faUserFriends, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import { CollectionsContext } from '../../context/CollectionsContext'
import Quotes from './Quotes';

import './collectionOverview.css'

export default function CollectionOverview(props) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isOptionsActive, setIsOptionsActive ] = useState(false)
  const { currentCollection, getOneCollection, cleanCurrentCollection } = useContext(CollectionsContext);
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    getOneCollection(props.match.params.id)
    setIsVisible(false)
    setTimeout(() => {
      setIsVisible(true)
    }, 280)    

    return () => {
      cleanCurrentCollection()
    }
  }, [props.match.params.id, getOneCollection, cleanCurrentCollection])
  

  return (
    <CSSTransitionGroup
      transitionName="collection-overview"
      transitionAppearTimeout={600}
      transitionEnterTimeout={250}
      transitionLeaveTimeout={200}
      component="div"
    >
      { isVisible ? 
        <div className="collection-overview">
          <nav className="collection-nav">
            <div className="collection-name"><h2><FontAwesomeIcon icon={faFolder} /> {currentCollection.name}</h2></div>
            <div className="collection-actions">
              <Link to={`/main/collections/${currentCollection._id}/members`} ><button><FontAwesomeIcon icon={faUserFriends} /></button></Link>
              <button onClick={() => setIsOptionsActive(!isOptionsActive)}><FontAwesomeIcon icon={faEllipsisV} /></button>
              <CSSTransitionGroup
                transitionName="menu-popup"
                transitionAppearTimeout={600}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={200}
                component="div"
              >
                {isOptionsActive ?
                  <div className="collection-options">
                    <Link to={`/main/collection/${currentCollection._id}/edit`}><FontAwesomeIcon icon={faEdit} /> Edit</Link>
                    <Link to={`/main/collections/${currentCollection._id}/delete`}><FontAwesomeIcon icon={faTrash} /> Delete</Link>
                  </div>
                  : undefined}
              </CSSTransitionGroup>
            </div>
          </nav>
          <Quotes quotes={currentCollection.quotes} />
        </div>
      : undefined }
    </CSSTransitionGroup>
  )
}
