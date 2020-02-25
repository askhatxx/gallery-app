import React from 'react';
import ImageBox from './ImageBox';

const LikesImages = ({likes, toogleLike, showModal}) => {
  return (
    <>
      {likes.map(item => <ImageBox key={item.id} image={item} toogleLike={toogleLike} isLike={true} showModal={showModal} />)}
    </>
  );
}

export default LikesImages;