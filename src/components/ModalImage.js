import React, {useState , useEffect, useRef} from 'react';
import Loading from './Loading';

const ModalImage = ({image, closeModal, likes, toogleLike}) => {
  console.log('ModalImage------', image);
  const [zoom, setZoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);

  const clickZoom = () => {
    setIsLoading(true);
    setZoom(prev => !prev);
  }

  const onLoadStatus = () => {
    setIsLoading(false);
  }

  const clickClose = () => {
    closeModal(null);
  }

  const clickUnderModal = (event) => {
    if (event.target === modalRef.current) {
      closeModal(null);
    }
  }

  const getUrl = () => {
    return zoom ? image.urls.full : image.urls.regular;
  }

  const getClassesImg = () => {
    return zoom ? 'modal-img full' : 'modal-img';
  }

  const likeClick = () => {
    toogleLike(image);
  }

  const classLike = () => {
    const isLike = likes.findIndex(like => like.id === image.id) >= 0;
    return isLike ? 'gallery-like like-yes' : 'gallery-like like-no';
  }

  useEffect(() => {
    document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
    document.body.style.overflow = 'hidden';
    return () => {document.body.style = ''};
  }, []);

  return (
    <div className='modal show' ref={modalRef} onClick={clickUnderModal}>
      <div className='modal-box'>
        <div className='modal-top'>
          <div className={classLike()} onClick={likeClick}></div>
          <button className='btn-close' onClick={clickClose}>×</button>
        </div>
        <div className={getClassesImg()}>
          <img src={getUrl()} alt={image.alt_description} onClick={clickZoom} onLoad={onLoadStatus} />
          {isLoading && <Loading/>}
        </div>
        <div className='modal-bottom'>
          <div>{image.description}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalImage;