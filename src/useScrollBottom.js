import {useState, useEffect} from 'react';

const useScrollBottom = () => {
  const [onBottom, setOnBottom] = useState(false);

  const onBottomCheck = () => {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50 && !onBottom) {
      console.log('ooooooooooooo', onBottom);
      setOnBottom(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onBottomCheck);
    return () => {window.removeEventListener ('scroll', onBottomCheck)};
  }, []);

  return [onBottom, setOnBottom];
}

export default useScrollBottom;