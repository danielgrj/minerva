import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ReferencesContext } from './../../context/ReferencesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faBook } from '@fortawesome/free-solid-svg-icons'

import './references.css'

export default function References() {
  const { references } = useContext(ReferencesContext);
  
  return (
    <div className="references">
      <h3><FontAwesomeIcon icon={faBook} /> References</h3>
      {references.map((({author, title, _id}) => (
        <div key={_id} className="reference-item">
          <div><Link to={`/main/references/${_id}`}>{`${author.lastName}, ${author.firstName.charAt(0)}. ${title}`}</Link></div>
          <div>
            <Link to={`/main/reference/${_id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
          </div>
        </div>
      )))}
    </div>
  )
}
