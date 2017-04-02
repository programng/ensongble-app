import React from 'react';

const { string } = React.PropTypes;

class AudioPlayer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <audio id="sound" src={this.props.src} controls />
    );
  }
}

AudioPlayer.propTypes = {
  src: string,
};

AudioPlayer.defaultProps = {
  src: 'test',
};

export default AudioPlayer;
