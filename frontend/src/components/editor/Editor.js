import React, { Component } from 'react'
import { Editor as DraftEditor, EditorState, RichUtils } from 'draft-js'

export default class Editor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  editorOnChange = (editorState) => this.setState({editorState})

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.editorOnChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  
  render() {
    return (
      <div>
        <DraftEditor editorState={this.state.editorState} onChange={this.editorOnChange} handleKeyCommand={this.handleKeyCommand.bind(this)}/>
      </div>
    )
  }
}
