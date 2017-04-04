/* eslint quote-props: "off" */
import React from 'react';
import AudioPlayer from './AudioPlayer';

const { string } = React.PropTypes;

function AudioItem(props) {
  const style = {
    backgroundColor: props.color,
  };
  return (
    <div className="audio-item" style={style}>
      <p>{props.name}</p>
      <AudioPlayer src={props.src} />
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
