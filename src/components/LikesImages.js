import React from 'react';
import ImageBox from './ImageBox';

const LikesImages = ({likes, toogleLike}) => {
  return (
    <>
      {likes.map(item => <ImageBox key={item.id} image={item} toogleLike={toogleLike} isLike={true} />)}
    </>
  );
}

export default LikesImages;