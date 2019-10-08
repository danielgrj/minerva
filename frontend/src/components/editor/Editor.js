import React, { Component } from 'react'
import { 
  Editor as DraftEditor, 
  EditorState, 
  RichUtils, 
  convertToRaw,
  convertFromRaw, 
  ContentState,
} from 'draft-js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faFont } from '@fortawesome/free-solid-svg-icons'
import draftToHtml from 'draftjs-to-html'

import 'react-html5-camera-photo/build/css/index.css';
import './editor.css'

export default class Editor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    id: this.props.id,
    textDocument: this.props.textDocument
  }

  componentDidMount = async () => {
    this.props.handleSaved((err, textDocument) => {
      this.props.handleId(textDocument._id)
      this.setState({ id: textDocument._id })
      })

    this.props.handleGetDocument((quote) => {
      const blocks = convertFromRaw(JSON.parse(quote.body))
      this.setState({ editorState: EditorState.createWithContent(blocks) })
    })
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.ocrText && this.props.ocrText !== prevProps.ocrText ) {
      this.setState({ editorState: EditorState.createWithContent(ContentState.createFromText(this.props.ocrText))})
    }
    this.props.handleDocument(this.state.id)
  }

  componentWillUnmount = () => {
    this.props.handleDocument(this.state.textDocument)
    this.props.handleUnmount()
  }

  editorOnChange = (editorState) => {
    const rawContent = convertToRaw(editorState.getCurrentContent())
    this.props.handleUpdate(rawContent, this.state.id, draftToHtml(rawContent))
    this.setState({ editorState })
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.editorOnChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick = () => {
    this.editorOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  _onItalicClick = () => {
    this.editorOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  _onUnderlineClick = () => {
    this.editorOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }


  render() {
    return (
      <div className="min-editor">
        <div className="menu-styles">
          <button><FontAwesomeIcon icon={ faFont }/></button>
          <div>
            <button onClick={ this._onBoldClick }><FontAwesomeIcon icon={ faBold } /></button>
            <button onClick={ this._onItalicClick }><FontAwesomeIcon icon={ faItalic } /></button>
            <button onClick={ this._onUnderlineClick }><FontAwesomeIcon icon={ faUnderline } /></button>
          </div>
        </div>
        <DraftEditor 
          editorState={ this.state.editorState } 
          onChange={ this.editorOnChange } 
          handleKeyCommand={ this.handleKeyCommand }
        />
      </div>
    )
  }
}
