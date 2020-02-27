import React from 'react';
import ImageBox from './ImageBox';

const LikesImages = ({likes, toggleLike, showModal}) => {
  return (
    <>
      {
        likes.length === 0 
        ? <div className='no-results'>No results</div> 
        : likes.map(item => (
          <ImageBox key={item.id} image={item} toggleLike={toggleLike} isLike={true} showModal={showModal} />
        ))
      }
    </>
  );
}

export default LikesImages;