import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import data from "../../data.json";
import Footer from "../Footer";

class Game extends Component {
  // Entailing scores within navigation bar
  state = {
    data,
    score: 0,
    topScore: 0
  };
  // After use selects an image - the album will shuffle
  componentDidMount() {
    this.setState({ data: this.shuffleData(this.state.data) });
  }
  // Updates Correct Guesses
  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);
  // Shuffles new album when a new score is given
    this.setState({
      data: this.shuffleData(newData),
      score: newScore,
      topScore: newTopScore
    });
  };
  // No score is given when guessed incorrectly but, still shuffles album
  handleIncorrectGuess = data => {
    this.setState({
      data: this.resetData(data),
      score: 0
    });
  };
  // Initiliazing images via data.json and combining shuffle utilities
  resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false }));
    return this.shuffleData(resetData);
  };

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };
  // Updating the state when the user changes any of the values by targeting the correct object
  handleItemClick = id => {
    let guessedCorrectly = false;
    const newData = this.state.data.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleCorrectGuess(newData)
      : this.handleIncorrectGuess(newData);
  };
  // Rendering all of our components
  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Header />
        <Container>
          {this.state.data.map(item => (
            <ClickItem
              key={item.id}
              id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleItemClick}
              image={item.image}
            />
          ))}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Game;
