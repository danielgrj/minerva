import React, { useState, useContext, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CSSTransitionGroup } from 'react-transition-group' 

import { CollectionsContext } from '../../context/CollectionsContext';
import { QuotesContext } from '../../context/QuotesContext';
import { ReferencesContext } from '../../context/ReferencesContext';

export default function Search() {
  const [ isVisible, setIsVisible ] = useState(false);
  // const [ search, setSearch ] = useState('');
  const [ foundArray, setFoundArray ] = useState([])

  const { collections } = useContext(CollectionsContext);
  const { quotes } = useContext(QuotesContext);
  const { references } = useContext(ReferencesContext);

  useEffect(() => {
    setIsVisible(true)
  })

  const handleSearch = (e) => {
    const search = e.target.value
    const filteredCollections = collections.filter((collection) => collection.name.includes(search))
      .map((collection) => (
        <div>{collection.name}</div>
      ))
    const filteredQuotes = quotes.filter((quote) => quote.html.includes(search))
      .map((quote) => (
        <div>{quote._id}</div>
      ))
    const filteredReference = references.filter((reference) => {
      return reference.title.includes(search) || reference.author[0].firstName || reference.author[0].lastName
        || reference.publisher.includes(search)
    }).map(({authors, title}) => (
      <div>{`${authors[0].lastName}, ${authors[0].firstName.charAt(0)}. ${title}`}</div>
    ))

    setFoundArray([...filteredCollections, ...filteredQuotes, ...filteredReference])
  }

  return (
    <>
      <div className="search"><FontAwesomeIcon icon={faSearch} /><input type="text" placeholder="Search" onChange={handleSearch}/></div>
      <CSSTransitionGroup
        transitionName="menu-popup"
        transitionAppearTimeout={600}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}
        component="div"
      >
        {isVisible ?
          <div className="search-results">
            {foundArray}
          </div>
          : undefined}
      </CSSTransitionGroup>
    </>
  )
}
