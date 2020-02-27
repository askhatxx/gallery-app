import React from 'react';

const ImageBox = ({image, toggleLike, isLike, showModal}) => {
  const likeClick = () => {
    toggleLike(image);
  }

  const imageClick = () => {
    showModal(image);
  }

  const classLike = () => {
    return isLike ? 'gallery-like like-yes' : 'gallery-like like-no';
  }

  return (
    <div className='gallery-block'>
      <img src={image.urls.small} alt={image.alt_description} onClick={imageClick}/>
      <div className={classLike()} onClick={likeClick}>♥</div>
    </div>
  );
}

export default ImageBox;