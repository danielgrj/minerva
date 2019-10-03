import React, { Component } from 'react'
import { Editor as DraftEditor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from 'draft-js'
import Tesseract from 'tesseract.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faBold, faItalic, faUnderline, faCamera } from '@fortawesome/free-solid-svg-icons'
import FILES_SERVICE from './../../services/files'
import './editor.css'
import decorator from './decorator'



export default class Editor extends Component {
  state = {
    editorState: EditorState.createEmpty(decorator),
    imageUrl: '',
    isLoading: false,
    progress: 0,
    id: this.props.id
  }

  componentDidMount = () => {
    this.props.handleSaved((err, quote) => {
      this.props.handleId(quote._id)
      this.setState({ id: quote._id})
    })
  }

  editorOnChange = (editorState) => {
    this.props.handleUpdate(convertToRaw(editorState.getCurrentContent()), this.state.id)
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

  handleAttachment = async (e) => {
    this.setState({isLoading: true})

    const result = await Tesseract
      .recognize(e.target.files[0], 'eng')
      .progress((p) => {
      })

    Tesseract.terminate();

    this.setState({editorState: EditorState.createWithContent(ContentState.createFromText(result.text)), isLoading: false})

  }

  renderImage = () => {
    if(this.state.imageUrl) return <div><img src={this.state.imageUrl} alt="Quote image"/></div>
  }

  renderQuoteMenu = () => {
    if (true) return (
    <div className="image">
      <div className="image-wrapper">
        <button><FontAwesomeIcon icon={faImage} /></button>
        <input type="file" onChange={this.handleAttachment} />
        <button onClick={this.handleAttachment}>Test</button>
      </div>
      <button><FontAwesomeIcon icon={faCamera} /></button>
    </div>
    )
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
        <div className="menu">
          <div className="styles">
            <button onClick={this._onBoldClick}><FontAwesomeIcon icon={faBold} /></button>
            <button onClick={this._onItalicClick}><FontAwesomeIcon icon={faItalic} /></button>
            <button onClick={this._onUnderlineClick}><FontAwesomeIcon icon={faUnderline} /></button>
          </div>
          {this.renderQuoteMenu()}
        </div>
        {this.renderImage()}
        {this.state.isLoading ? <div className="spin-circle"></div> : undefined}
        <DraftEditor 
          editorState={this.state.editorState} 
          onChange={this.editorOnChange} 
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    )
  }
}
