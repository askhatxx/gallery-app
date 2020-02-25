import React from 'react';
import ImageBox from './ImageBox';

const FoundImages = ({result, likes, toogleLike, showModal}) => {
  return (
    <>
      {
        result.length === 0 ? (
          <div className='no-results'>No results</div>
        ) : (
          result.map((item) => {
            const isLike = likes.findIndex(like => like.id === item.id) >= 0;
            return <ImageBox key={item.id} image={item} toogleLike={toogleLike} isLike={isLike} showModal={showModal} />
          })
        )
      }
    </>
  );
}

export default FoundImages;