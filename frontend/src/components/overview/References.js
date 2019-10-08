import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ReferencesContext } from './../../context/ReferencesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBook } from '@fortawesome/free-solid-svg-icons'

import './references.css'

export default function References() {
  const { references } = useContext(ReferencesContext);
  
  return (
    <div className="references">
      <h3><FontAwesomeIcon icon={faBook} /> References</h3>
      {references.map((({authors, title, _id}) => (
        <div key={_id} className="reference-item">
          <div><NavLink to={`/main/references/${_id}`} activeClassName="current-reference">{`${authors[0].lastName}, ${authors[0].firstName.charAt(0)}. ${title}`}</NavLink></div>
          <div>
            <Link to={`/main/reference/${_id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
          </div>
        </div>
      )))}
    </div>
  )
}
