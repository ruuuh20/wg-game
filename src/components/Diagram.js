import React, { Component } from 'react'

const styles = {
  character: {
    fill: "none",
    stroke: "black",
    strokeWidth: 3
  },
  post: {
    fill: "none",
    stroke: "black",
    strokeWidth: 8
  }
};

export default class Diagram extends Component {
  render() {
    return (
      <svg width="500" height="550">
        <polyline points="400,500 100,500 150,500 150,100 320,100 320,150"
                  style={styles.post} />
        {this.renderBody()}
        {this.renderLeftArm()}
        {this.renderRightArm()}
        {this.renderLeftLeg()}
        {this.renderRightLeg()}
        {this.renderHead()}
      </svg>
    );
  }

  renderHead() {
    return this.props.head
        ? <circle cx="320" cy="160" r="30" stroke="black" />
        : null;
  }

  renderBody() {
    return this.props.body
      ? <line x1="320" y1="190" x2="320" y2="330" style={styles.character} />
      : null;
  }

  renderLeftArm() {
    return this.props.leftArm
      ? <line x1="320" y1="260" x2="250" y2="250" style={styles.character} />
      : null;
  }

  renderRightArm() {
    return this.props.rightArm
      ? <line x1="320" y1="260" x2="390" y2="250" style={styles.character} />
      : null;
  }

  renderLeftLeg() {
    return this.props.leftLeg
      ? <line x1="320" y1="330" x2="250" y2="450" style={styles.character} />
      : null;
  }

  renderRightLeg() {
    return this.props.rightLeg
      ? <line x1="320" y1="330" x2="390" y2="450" style={styles.character} />
      : null;
  }

}
