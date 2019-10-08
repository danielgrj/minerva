import React, { useState, useContext, useEffect } from 'react'
import { CollectionsContext } from '../../context/CollectionsContext'
import Quotes from './Quotes';
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

import './collectionOverview.css'

export default function CollectionOverview(props) {
  const [ isVisible, setIsVisible ] = useState(false)
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
          <h2><FontAwesomeIcon icon={ faFolder } /> {currentCollection.name}</h2>
          <Quotes quotes={currentCollection.quotes} />
        </div>
      : undefined }
    </CSSTransitionGroup>
  )
}
