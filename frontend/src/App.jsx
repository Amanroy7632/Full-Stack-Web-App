import { useState,useEffect } from 'react'
import Header from './components/Header'
import Home from './components/home/Home'
import Abc from './components/Abc'
import {BrowserRouter} from "react-router-dom"
import Masonary from './components/Masonary'
import Head from './components/Head'
function App() {
  const [count, setCount] = useState(0)
  // const [headPosition,setHeadPosition] = useState(false)
  // if (!headPosition) {
  //   window.addEventListener("scroll",()=>{
  //     const header=document.querySelector(".navs");
  //     setHeadPosition(true)
  //     console.log(headPosition);
  //     console.log(header);
  //   })
  // }
  const [headerPosition, setHeaderPosition] = useState('absolute');
  const [isBackground,setBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      // console.log(currentPosition);
      if (currentPosition > 10) {
        // Change header position when scrolled past a certain point (e.g., 100px)
        setBackground(true)
        setHeaderPosition('fixed');
      } else {
        setHeaderPosition('absolute');
        setBackground(false)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <BrowserRouter>    
      <Header headerPosition={headerPosition} isBackground={isBackground} setBackground={setBackground}/>
      <Home/>
      
        {/* <Head/> */}
      {/* <Abc/> */}
      <Masonary/>
      </BrowserRouter>
  )
}

export default App
