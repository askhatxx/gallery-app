import React, {useState} from 'react';

const Header = ({setQuery}) => {
  const [value, setValue] = useState('');

  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      setQuery(value);
    }
  }
  
  return (
    <header className='container header'>
      <div className='logo'>Gallery App</div>
      <div className='search'>
        <input 
          className='search-input'
          value={value} 
          onChange={e => setValue(e.target.value)}
          onKeyPress={keyPressHandler}
          placeholder='Search...'
        />
      </div>
      <div className='options'>Favorites</div>
    </header>
  );
}

export default Header;