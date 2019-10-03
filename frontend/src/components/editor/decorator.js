import React from 'react';
import { CompositeDecorator } from 'draft-js'

const strategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null 
      );
    },
    callback
    )
}

const component = (props) => {
  const entity = props.contentState.getEntity(props.entityKey)
  console.log(entity);

  return (
    <div>im</div>
  )
}

const decorator = new CompositeDecorator([{
  strategy,
  component 
}])

export default decorator