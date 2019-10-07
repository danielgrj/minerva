import React, { Component, createContext } from 'react'
import STYLES_SERVICE from '../services/styles'

export const StylesContext = createContext()

export default class StylesProvider extends Component {
  state ={
    styles: [],
    currentStyle: {},
    filtersStyles: {}
  }

  componentDidMount = async () => {
    this.getAllStyles()
  }

  getAllStyles = async () => {
    const { data: styles } = await STYLES_SERVICE.getAllStyles()
    this.setState({ styles })
  }

  getOneStyle = async (id) => {
    const currentStyle = this.state.styles.find((currentStyle) => currentStyle._id === id )
    this.setState({ currentStyle })
  }

  createOneStyle = async (data) => {
    const { data: style } = await STYLES_SERVICE.createStyle(data);
    this.setState(prevState => {
      const { styles } = prevState;

      return { styles: [...styles, style] }
    })
  }

  deleteOneStyle = async (id) => {
    const { data: styleToRemove } = await STYLES_SERVICE.deleteStyle(id);
    this.setState((prevState) => {
      const { styles: oldStyles } = prevState
      const styles = oldStyles.filter((style) => style._id !== styleToRemove._id);

      return { styles }
    })
  }

  render() {
    const { styles, currentStyle, filtersStyles } = this.state
    const {
      getAllStyles,
      getOneStyle,
      createOneStyle,
      deleteOneStyle,
      updateOneStyle,
      cleanCurrentStyle
    } = this

    return (
      <StylesContext.Provider
        value={{
          styles,
          currentStyle,
          filtersStyles,
          getAllStyles,
          getOneStyle,
          createOneStyle,
          updateOneStyle,
          deleteOneStyle,
          cleanCurrentStyle
        }}
      >
        {this.props.children}
      </StylesContext.Provider>
    )
  }
}
