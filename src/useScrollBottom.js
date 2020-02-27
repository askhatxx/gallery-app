import {useState, useEffect} from 'react';

const useScrollBottom = () => {
  const [onBottom, setOnBottom] = useState(false);

  const onBottomCheck = () => {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100 && !onBottom) {
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