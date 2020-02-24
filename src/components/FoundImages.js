import React from 'react';
import ImageBox from './ImageBox';

const FoundImages = ({result, likes, toogleLike}) => {
  return (
    <>
      {
        result.length === 0 ? (
          <div>0</div>
        ) : (
          result.map((item) => {
            const isLike = likes.findIndex(like => like.id === item.id) >= 0;
            return <ImageBox key={item.id} image={item} toogleLike={toogleLike} isLike={isLike} />
          })
        )
      }
    </>
  );
}

export default FoundImages;