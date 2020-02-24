import React from 'react';

const ImageBox = ({image, toogleLike, isLike}) => {
  const likeClick = () => {
    toogleLike(image);
  }

  const classLike = () => {
    return isLike ? 'gallery-like like-yes' : 'gallery-like like-no';
  }

  return (
    <div className='gallery-block'>
      <img src={image.urls.small} alt={image.alt_description}/>
      <div className={classLike()} onClick={likeClick}></div>
    </div>
  );
}

export default ImageBox;