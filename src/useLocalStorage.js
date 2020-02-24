import {useState, useEffect} from 'react';

const useLocalStorage = () => {
  const getLikes = () => {
    const likes = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : [];
    return likes;
  }

  const [likes, setLikes] = useState(getLikes());

  const toogleLike = (imageLike) => {
    const indexLike = likes.findIndex(item => item.id === imageLike.id);

    if (indexLike >= 0) {
      setLikes(prev => [...prev.slice(0, indexLike), ...prev.slice(indexLike + 1)]);
    } else {
      setLikes(prev => [...prev, imageLike]);
    }
  }

  useEffect(() => {
    console.log('LIKES', likes);
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  return [likes, toogleLike];
}

export default useLocalStorage;