import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import ImageBox from './components/ImageBox';
import useScrollBottom from './useScrollBottom';

function App() {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('art');
  const [page, setPage] = useState(1);
  const [onBottom, setOnBottom] = useScrollBottom();

  useEffect(() => {
    console.log(query);
    setPage(1);
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
        <Header setQuery={setQuery} />
      </div>
      <div className='container'>
        <div className='gallery'>
          {result.length === 0 ? (
            <div>0</div>
          ) : (
            result.map((item) => {
              return <ImageBox key={item.id} image={item} />
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
