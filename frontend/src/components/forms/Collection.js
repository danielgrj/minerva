import React, { useEffect, useState, useContext } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { CollectionsContext } from '../../context/CollectionsContext';
import { StylesContext } from '../../context/StylesContext';

import './collection.css';

export default function Collection(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [collectionData, setCollectionData] = useState({
    name: '',
    defaultStyle: ''
  });

  const {
    createOneCollection,
    currentCollection,
    getOneCollection,
    updateOneCollection,
    cleanCurrentCollection
  } = useContext(CollectionsContext);

  const { styles } = useContext(StylesContext);

  useEffect(() => {
    setIsVisible(true);

    document.body.classList.add('block-scroll');

    return () => {
      document.body.classList.remove('block-scroll');
    };
  }, []);

  useEffect(() => {
    if ((!collectionData._id && props.match.params.id) || collectionData._id !== props.match.params.id) {
      getOneCollection(props.match.params.id);
      for (const key in currentCollection) {
        if (currentCollection[key] === null) currentCollection[key] = '';
      }

      setCollectionData(currentCollection);
    }
  }, [currentCollection, collectionData._id, getOneCollection, props.match.params.id]);

  const handleInput = e => {
    setCollectionData({ ...collectionData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (collectionData._id) {
      updateOneCollection(collectionData._id, collectionData);
    } else {
      createOneCollection(collectionData);
    }

    cleanCurrentCollection();
    setIsVisible(false);
    setTimeout(() => {
      props.history.goBack();
    }, 200);
  };

  return (
    <div className="route-container">
      <div
        className="back-container"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            props.history.goBack();
          }, 250);
        }}
      ></div>
      <CSSTransitionGroup
        transitionName="quote"
        transitionAppearTimeout={600}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}
        component="div"
      >
        {isVisible ? (
          <div className="collection-container">
            <form className="collection" onSubmit={onSubmit}>
              <h2>{props.match.params.id ? 'Edit collection' : 'Add collection'}</h2>
              <label htmlFor="name">Name of the collection</label>
              <input type="text" name="name" id="name" onChange={handleInput} value={collectionData.name} />
              <label htmlFor="defaulStyle">Style</label>
              <option name="defaultStyle" id="defaultStyle" onChange={handleInput}>
                {styles.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </option>
              <input type="submit" value="Save collection" />
            </form>
          </div>
        ) : (
          undefined
        )}
      </CSSTransitionGroup>
    </div>
  );
}
