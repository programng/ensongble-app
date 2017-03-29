import React from 'react';

const { string } = React.PropTypes;

function AudioItem(props) {
  return (
    <div className="audio-item">
      <audio id="sound" src={props.src} controls />
      <div>
        {props.predictedGenre}
      </div>
    </div>
  );
}

AudioItem.propTypes = {
  src: string,
  predictedGenre: string,
};

AudioItem.defaultProps = {
  src: 'test',
  predictedGenre: '',
};

export default AudioItem;
