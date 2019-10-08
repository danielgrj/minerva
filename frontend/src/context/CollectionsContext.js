import React, { Component, createContext } from 'react'
import COLLECTIONS_SERVICE from './../services/collections'

export const CollectionsContext = createContext()

export default class CollectionsProvider extends Component {

  state = {
    collections: [],
    currentCollection: {
      name: '',
      contributors: [],
      quotes: []
    },
    filtersCollections: {}
  }

  componentDidMount = async () => {
    this.getAllCollections()
  }

  cleanCurrentCollection = () => {
    this.setState({})
  }

  getAllCollections = async () => {
    const { data: collections } = await COLLECTIONS_SERVICE.getAllCollections()
    this.setState({ collections })
  }

  getOneCollection = async (id) => {
    const { data: currentCollection } = await COLLECTIONS_SERVICE.getOneCollection(id)
    console.log('On context', currentCollection)
    this.setState({ currentCollection })
  }

  createOneCollection = async (data) => {
    const { data: collection } = await COLLECTIONS_SERVICE.createCollection(data);
    this.setState(prevState => {
      const { collections } = prevState;

      return { collections: [...collections, collection] }
    })
  }

  updateOneCollection = async (id, data) => {
    const { data: newCollection } = await COLLECTIONS_SERVICE.updateCollection(id, data);
    this.setState(prevState => {
      const { collections: oldCollections } = prevState;

      const collections = oldCollections.map((collection) => {
        if (collection._id === newCollection._id) return newCollection
        return collection
      })

      return { collections }
    })
  }

  deleteOneCollection = async (id) => {
    const { data: collectionToRemove } = await COLLECTIONS_SERVICE.deleteCollection(id);
    this.setState((prevState) => {
      const { collections: oldCollections } = prevState
      const collections = oldCollections.filter((collection) => collection._id !== collectionToRemove._id);

      return { collections }
    })
  }

  render() {
    const { collections, currentCollection, filtersCollections } = this.state
    const {
      getAllCollections,
      getOneCollection,
      createOneCollection,
      deleteOneCollection,
      updateOneCollection,
      cleanCurrentCollection
    } = this
    return (
      <CollectionsContext.Provider
        value={{
          collections,
          currentCollection,
          filtersCollections,
          getAllCollections,
          getOneCollection,
          createOneCollection,
          updateOneCollection,
          deleteOneCollection,
          cleanCurrentCollection
        }}
      >
        {this.props.children}
      </CollectionsContext.Provider>
    )
  }
}
