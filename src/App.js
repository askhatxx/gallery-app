import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import FoundImages from './components/FoundImages';
import LikesImages from './components/LikesImages';
import ModalImage from './components/ModalImage';
import useScrollBottom from './useScrollBottom';
import useLocalStorage from './useLocalStorage';

function App() {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('art');
  const [page, setPage] = useState(1);
  const [showLikes, setShowLikes] = useState(false);
  const [isModal, setIsModal] = useState(null);
  const [onBottom, setOnBottom] = useScrollBottom();
  const [likes, toogleLike] = useLocalStorage();

  useEffect(() => {
    console.log(query);
    setPage(1);
    setShowLikes(false);
    fetchImagesApi(query, 1);
  }, [query]);

  useEffect(() => {
    if (onBottom) {
      setPage(prev => prev + 1);
    }
  }, [onBottom]);

  useEffect(() => {
    console.log('page', page);
    if (page !== 1) fetchImagesApi(query, page);
  }, [page]);

  useEffect(() => {
    console.log('FIRST', page);
    fetchImagesApi(query, page);
  }, []);

  const showModal = (image) => {
    setIsModal(image);
  }

  const fetchImagesApi = (query, page) => {
    const key = process.env.REACT_APP_CLIENT_ID;
    
    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${key}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.total === 0) {
          setResult([]);
        }
        else if (page <= result.total_pages) {
          if (page === 1) setResult([...result.results]);
          else setResult(prev => [...prev, ...result.results]);
          setOnBottom(false);
        }
      })
      .catch(err => console.log('Error fetch', err));
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
              ? <LikesImages likes={likes} toogleLike={toogleLike} showModal={showModal} />
              : <FoundImages result={result} likes={likes} toogleLike={toogleLike} showModal={showModal} />
          }
        </div>
      </div>
      {isModal && <ModalImage image={isModal} closeModal={setIsModal} likes={likes} toogleLike={toogleLike} />}
    </div>
  );
}

export default App;
