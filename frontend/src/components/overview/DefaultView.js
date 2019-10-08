import React, { useState, useEffect } from 'react'
import Quotes from './Quotes'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import './defaultView.css'

export default function DefaultView() {
  const [ isVisible, setIsVisible ] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false)
    }
  }, [])

  return (
    <CSSTransitionGroup
      transitionName="collection-overview"
      transitionAppearTimeout={600}
      transitionEnterTimeout={250}
      transitionLeaveTimeout={200}
      component="div"
    >
      { isVisible ? 
        <div className="default-view">
          <h2><FontAwesomeIcon icon={ faClock } /> Recent</h2>
          <Quotes />
        </div>
      : undefined }
    </CSSTransitionGroup>
  )
}
