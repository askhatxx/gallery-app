import React, {useState} from 'react';

const Header = ({setQuery, showLikes, setShowLikes}) => {
  const [value, setValue] = useState('');

  const keyPressHandler = event => {
    if (event.key === 'Enter') {
      setQuery(value);
    }
  }

  const clickLogo = () => {
    setShowLikes(false);
  }

  const clickOptions = () => {
    setShowLikes(prev => !prev);
  }

  const getClasses = () => {
    return showLikes ? 'options show-likes' : 'options';
  }
  
  return (
    <header className='container header'>
      <div className='logo' onClick={clickLogo}>Gallery App</div>
      <div className='search'>
        <input 
          className='search-input'
          value={value} 
          onChange={e => setValue(e.target.value)}
          onKeyPress={keyPressHandler}
          placeholder='Search...'
        />
      </div>
      <div className={getClasses()} onClick={clickOptions}>Favorites</div>
    </header>
  );
}

export default Header;