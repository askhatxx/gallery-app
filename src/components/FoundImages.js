import React from 'react';
import ImageBox from './ImageBox';

const FoundImages = ({result, likes, toggleLike, showModal, isFetching}) => {
  return (
    <>
      {
        result.length === 0 
        ? (
          !isFetching && <div className='no-results'>No results</div>
        ) 
        : (
          result.map((item) => {
            const isLike = likes.findIndex(like => like.id === item.id) >= 0;
            return <ImageBox key={item.id} image={item} toggleLike={toggleLike} isLike={isLike} showModal={showModal} />
          })
        )
      }
    </>
  );
}

export default FoundImages;