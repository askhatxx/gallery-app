import React from 'react';

const ImageBox = ({image}) => {
    
  return (
    <div className='gallery-block'>
      <img src={image.urls.small} alt={image.alt_description}/>
    </div>
  );
}

export default ImageBox;