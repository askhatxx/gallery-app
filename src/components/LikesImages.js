import React from 'react';
import ImageBox from './ImageBox';

const LikesImages = ({likes, toggleLike, showModal}) => {
  return (
    <>
      {likes.map(item => <ImageBox key={item.id} image={item} toggleLike={toggleLike} isLike={true} showModal={showModal} />)}
    </>
  );
}

export default LikesImages;