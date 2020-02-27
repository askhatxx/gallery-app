import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import FoundImages from './components/FoundImages';
import LikesImages from './components/LikesImages';
import ModalImage from './components/ModalImage';
import Loading from './components/Loading';
import useScrollBottom from './useScrollBottom';
import useLocalStorage from './useLocalStorage';

function App() {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('art');
  const [page, setPage] = useState(1);
  const [showLikes, setShowLikes] = useState(false);
  const [isModal, setIsModal] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [onBottom, setOnBottom] = useScrollBottom();
  const [likes, toggleLike] = useLocalStorage();

  useEffect(() => {
    setPage(1);
    setShowLikes(false);
    fetchImagesApi(query, 1);
  }, [query]);

  useEffect(() => {
    if (onBottom) {
      if (!showLikes) setPage(prev => prev + 1);
      else setOnBottom(false);
    }
  }, [onBottom]);

  useEffect(() => {
    if (page !== 1) fetchImagesApi(query, page);
  }, [page]);

  useEffect(() => {
    fetchImagesApi(query, page);
  }, []);

  const showModal = (image) => {
    setIsModal(image);
  }

  const fetchImagesApi = (query, page) => {
    const key = process.env.REACT_APP_CLIENT_ID;
    setIsFetching(true);
    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=24&client_id=${key}`)
      .then(response => response.json())
      .then(result => {
        if (result.total === 0) {
          setResult([]);
        }
        else if (page <= result.total_pages) {
          if (page === 1) setResult([...result.results]);
          else setResult(prev => [...prev, ...result.results]);
        }
      })
      .catch(err => console.log('Error fetch', err))
      .finally(() => {
        setIsFetching(false);
        setOnBottom(false);
      });
  }

  return (
    <div>
      <div className='head'>
        <Header setQuery={setQuery} showLikes={showLikes} setShowLikes={setShowLikes} />
      </div>
      <div className='container'>
        <div className='gallery'>
          {
            showLikes 
              ? <LikesImages likes={likes} toggleLike={toggleLike} showModal={showModal} />
              : <FoundImages result={result} likes={likes} toggleLike={toggleLike} showModal={showModal} isFetching={isFetching} />
          }
        </div>
        {isFetching && <Loading/>}
      </div>
      {isModal && <ModalImage image={isModal} closeModal={setIsModal} likes={likes} toggleLike={toggleLike} />}
    </div>
  );
}

export default App;
