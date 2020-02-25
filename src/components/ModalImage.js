import React, {useState , useEffect} from 'react';

const ModalImage = ({image, closeModal}) => {
  console.log('ModalImage------', image);
  const [zoom, setZoom] = useState(false);

  const clickZoom = () => {
    setZoom(prev => !prev);
  }

  const getUrl = () => {
    return zoom ? image.urls.full : image.urls.regular;
  }

  const getClassesImg = () => {
    return zoom ? 'modal-img full' : 'modal-img';
  }

  useEffect(() => {
    document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
    document.body.style.overflow = 'hidden';
    return () => {document.body.style = ''};
  }, []);

  return (
    <div className='modal show'>
      <div className='modal-box'>
        <div className={getClassesImg()}>
          <img src={getUrl()} alt={image.alt_description} onClick={clickZoom} />
        </div>
        <div className='modal-bottom' onClick={() => closeModal(null)}>Close</div>
      </div>
    </div>
    );
}

export default ModalImage;