import React, { useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { CSSTransitionGroup } from 'react-transition-group'
import { CollectionsContext } from '../../context/CollectionsContext'

import './members.css'

export default function Members(props) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ email, setEmail ] = useState('')

  const { currentCollection, updateOneCollection } = useContext(CollectionsContext)

  useEffect(() => {
    setIsVisible(true)
  }, [currentCollection])

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      props.history.goBack()
    }, 200)
  }

  const handleAddUser = () => {
    updateOneCollection(currentCollection._id, { email })
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
          <div className="members-container">
            <div className="members-card">
              <div className="members-header">
                <FontAwesomeIcon icon={faUserFriends} />
                <h2>Add members</h2>
              </div>
              <div className="add-members">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button onClick={handleAddUser}><FontAwesomeIcon icon={faUserPlus} /></button>
              </div>
              <div className="members-list">
                <div>
                  <h3>Creator</h3>
                  <div className="collection-creator">
                    <div><img src={currentCollection.userFrom.avatar} alt={currentCollection.userFrom.avater}/></div>
                    <p>{currentCollection.userFrom.name}</p>
                  </div>
                </div>
                <h4>Current members</h4>
                {}
                {currentCollection.contributors.map((contributor) => (
                  <div>
                    <div><img src={contributor.avatar} alt={contributor.name} /></div> 
                    {contributor.name}
                  </div>
                ))}
              </div>
              <div className="pending-members">
                {currentCollection.pending.map((pendingContributor) => (
                  <div>{pendingContributor}</div>
                ))}
              </div>
            </div>
          </div>
        : undefined }
      </CSSTransitionGroup>
    </div>
  )
}
