import React, { Component, createContext } from 'react'
import REFERENCES_SERVICE from './../services/references'

export const ReferencesContext = createContext()

export default class ReferencesProvider extends Component {
  state = {
    references: [],
    currentReference: {
      type: 'BOOK',
      title: '',
      firstName: '',
      lastName: '',
      volume: 1,
      edition: '',
      place: '',
      publisher: '',
      date: '',
      numberOfPages: '',
      language: '',
      isbn: '',
      url: '',
      doi: '',
      accessed: '',
      archive: ''
    },
    filtersReferences: {}
  }

  componentDidMount = async () => {
    this.getAllReferences()
  }

  cleanCurrentReference = () => {
    this.setState({
      currentReference: {
        type: 'BOOK',
        title: '',
        firstName: '',
        lastName: '',
        volume: 1,
        edition: '',
        place: '',
        publisher: '',
        date: '',
        numberOfPages: '',
        language: '',
        isbn: '',
        url: '',
        doi: '',
        accessed: '',
        archive: ''
      }})
  }

  getAllReferences = async () => {
    const { data: references } = await REFERENCES_SERVICE.getAllReferences()
    this.setState({ references })
  }

  getOneReference = async (id) => {
    const { data: currentReference } = await REFERENCES_SERVICE.getOneReference(id)
    this.setState({ currentReference })
  }

  createOneReference = async (data) => {
    const { data: reference } = await REFERENCES_SERVICE.createReference(data);
    this.setState(prevState => {
      const { references } = prevState;

      return { references: [...references, reference] }
    })
  }

  updateOneReference = async (id, data) => {
    const { data: newReference } = await REFERENCES_SERVICE.updateReference(id, data);
    this.setState(prevState => {
      const { references: oldReferences } = prevState;

      const references = oldReferences.map((reference) => {
        if(reference._id === newReference._id ) return newReference
        return reference
      }) 

      return { references }
    })
  }

  deleteOneReference = async (id) => {
    const { data: referenceToRemove } = await REFERENCES_SERVICE.deleteReference(id);
    this.setState((prevState) => {
      const { references: oldReferences } = prevState
      const references = oldReferences.filter((reference) => reference._id !== referenceToRemove._id);

      return { references }
    })
  }

  deleteOneQuoteFromReference = (quoteToRemove) => {
    this.setState((prevState) => {
      const { currentReference } = prevState
      const quotes = currentReference.quotes.filter((quote) => quote._id !== quoteToRemove._id);

      return { currentReference: { ...currentReference, quotes } }
    })
  }



  render() {
    const { references, currentReference, filtersReferences } = this.state
    const { 
      getAllReferences, 
      getOneReference, 
      createOneReference, 
      deleteOneReference, 
      updateOneReference, 
      cleanCurrentReference,
      deleteOneQuoteFromReference
     } = this
    return (
      <ReferencesContext.Provider 
        value={{ 
          references, 
          currentReference, 
          filtersReferences,
          getAllReferences,
          getOneReference,
          createOneReference,
          updateOneReference,
          deleteOneReference,
          cleanCurrentReference,
          deleteOneQuoteFromReference
        }}
      >
        {this.props.children}
      </ReferencesContext.Provider>
    )
  }
}
