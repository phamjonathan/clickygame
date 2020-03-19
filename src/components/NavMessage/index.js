import React, { Component } from "react";
import "./style.css";

// NavMessage renders an li tag containing an message for the user

class NavMessage extends Component {
  state = {
    message: "",
    animating: false
  };
  // This updates messages accordingly whether its correct or incorrect
  componentDidUpdate({ score, topScore }, prevState) {
    const newState = { animating: true };

    if (score === 0 && topScore === 0) {
      newState.message = "";
    } else if (score === 0 && topScore > 0) {
      newState.message = "incorrect";
    } else {
      newState.message = "correct";
    }

    if (score !== this.props.score || this.state.message !== newState.message) {
      this.setState(newState);
    }
  }
  // Rendering the message
  renderMessage = () => {
    switch (this.state.message) {
    case "correct":
      return "Nice!";
    case "incorrect":
      return "Try again!";
    default:
      return "Click an image to begin!";
    }
  };

  render() {
    return (
      <li
        className={this.state.animating ? this.state.message : ""}
        onAnimationEnd={() => this.setState({ animating: false })}
      >
        {this.renderMessage()}
      </li>
    );
  }
}

export default NavMessage;
