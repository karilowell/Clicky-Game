
import React, { Component } from 'react'
import './App.css'
import { NavBarComp, NavPill, PillContainer } from './components/NavBarComp'
// import Navbar from 'react-bootstrap/Navbar'
import { ImageContainer, Image } from './components/ImageContainer'
import HeaderComp from './components/HeaderComp'

import _ from 'lodash'

class App extends Component {
  /**
   * State
   */
  state = {
    characters: [],
    score: 0,
    topscore: 0,
    navbarMsg: 'Click on an image!'
  }
  /**
   * Reload Game Method
   
   */
  reloadGame = () => {
    fetch('assets/data/data.json')
      .then(response => response.json())
      .then(results => {
        this.setState({ 
          characters: results,
          score: 0, 
          navbarMsg: 'Give it a try!',
        })
      })
      .catch(err => console.log(err))
  }
  /**
   * componentDidMount
   
   */
  componentDidMount () {
    this.reloadGame()
  }
  /**
   * OnCardClick()
   * This will handle when user click on image card
   */
  OnCardClick = event => {
    // Save the instance of the clicked element
    const elementClicked = event.target
    // Check
    // if  card clicked === true reset score to 0 and reload game
    if (this.state.characters[elementClicked.id].clicked) {
      // GameOver, Reload Game will reset score
      this.reloadGame()
    } else {
      // User got a point
      let updatedCharacters = this.state.characters.map((element, index) => {
        
        if (index === parseInt(elementClicked.id)) {
          // Using Sprad to give whatever its left from the object
          return { ...element, clicked: true }
        } else return { ...element }
      })

      let updatedScore = this.state.score + 1;
      let updatedTopScore = Math.max(updatedScore, this.state.topscore)

      this.setState({
        characters: updatedCharacters,
        score: updatedScore,
        topscore: updatedTopScore,
        navbarMsg: 'You guessed correctly!'
      })
    }
  }
  /**
   * renderScores()
   * This method will render the score and top score
   */
  renderScores = ({score, topscore}) => {
    return(
      <PillContainer>
        <NavPill text='Score' bg='bg-success'>{score}</NavPill>
        <NavPill text='Top Score' bg='bg-primary'>{topscore}</NavPill>
      </PillContainer>
    )
  }
  /**
   * renderCharacters()
   * This method will render images cards
   */
  renderCharacters = () => {
    let _characters = this.state.characters.map((character, index) => (
      <Image
        src={character.image}
        key={index}
        id={index}
        onClick={this.OnCardClick}
      />
    ))

    
    return _.shuffle(_characters)
  }
  /**
   * Render Page
   */
  render () {
    return (
      // Using React Fragment <> </>
      <>
        <NavBarComp
          fixed='top'
          brandName='Clicky Game'
          text={this.state.navbarMsg}
          pills={this.renderScores(this.state)}
        />
        <HeaderComp />
        <ImageContainer>{this.renderCharacters()}</ImageContainer>
        <NavBarComp brandName='Clicky Game'/>
      </>
    )
  }
}

export default App



