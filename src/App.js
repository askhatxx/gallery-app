import React, {useState} from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  
  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      fetchImages(query);
    }
  }

  const fetchImages = query => {
    const key = process.env.REACT_APP_CLIENT_ID;
    
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${key}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setResult(prev => [...prev, ...result.results]);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='container'>
      <header>
        <input 
          value={query} 
          onChange={e => setQuery(e.target.value)}
          onKeyPress={keyPressHandler}
        />
      </header>
      <div className='gallery'>
        {result.map((item) => {
          return <img key={item.id} src={item.urls.small} alt={item.alt_description}/>
        })}
      </div>
    </div>
  );
}

export default App;
