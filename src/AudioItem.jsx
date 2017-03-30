import React from 'react';

const { string } = React.PropTypes;

function AudioItem(props) {
  return (
    <div className="audio-item">
      <p>{props.name}</p>
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
  name: string,
};

AudioItem.defaultProps = {
  src: 'test',
  predictedGenre: '',
  name: '',
};

export default AudioItem;
