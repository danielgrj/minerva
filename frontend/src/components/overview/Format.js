import React, { useState, useEffect, useContext } from 'react'
import { StylesContext } from '../../context/StylesContext'
import { CSSTransitionGroup } from 'react-transition-group' 

export default function Format(props) {
  const { styles } = useContext(StylesContext);
  const [references, setReferences] = useState([])
  const [style, setStyle] = useState({})
  
  const getFormat = (style) => {
    references.map((reference) => (
      <div dangerouslySetInnerHTML={style.model
        .replace('{lastName}', reference.authors[0].lastName)
        .replace('{firstName}', reference.authors[0].firstName)
        .replace('{title}', reference.title)
        .replace('{publisher}', reference.publisher)
        .replace('{place}', reference.place)
        .replace('{date}', reference.date.getYear())
      }></div>
    ))
  }

  useEffect(() => {
    setReferences(props.references)
    if(styles) setStyle(styles[0])
    if(style) getFormat(style)

  }, [props.references, styles])

  const handleClose = () => {

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
        <div className="format-container">
          <div className="format-card">
            {getFormat()}
          </div>
        </div>
      </CSSTransitionGroup>
    </div>
  )
}
