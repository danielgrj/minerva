import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,  faFolder  } from '@fortawesome/free-solid-svg-icons'
import { CollectionsContext } from '../../context/CollectionsContext'

import './collections.css'

export default function Collections() {
  const { collections } = useContext(CollectionsContext);
  return (
    <div className="collections">
      <h3><FontAwesomeIcon icon={ faFolder } /> Collections</h3>
      {collections.map((({ name, _id }) => (
        <div key={_id} className="collection-item">
          <div><NavLink to={`/main/collections/${_id}`} activeClassName="current-collection">{name}</NavLink></div>
          <div>
            <Link to={`/main/collection/${_id}/edit`}><FontAwesomeIcon icon={faEdit} /></Link>
          </div>
        </div>
      )))}
    </div>
  )
}
