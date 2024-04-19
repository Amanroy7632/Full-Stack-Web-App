import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiOutlineSearch,
  AiFillFacebook,
  AiFillStepForward,
} from "react-icons/ai";
import {RxCross2} from "react-icons/rx"
import { useState } from "react";
const Header = ({ headerPosition, isBackground, setBackground }) => {
    const [isSearchVisible,setSearchvisible]=useState(false)
    const [inputValue,setInputValue]=useState('')
    if (isSearchVisible) {
        setBackground(true)
    }else{
        if (window.scrollY<100) {
            setBackground(false)
        }
    }
    const closeSearch =()=>{
        setSearchvisible(!isSearchVisible)
    }
    const handleForm=(e)=>{
        e.preventDefault()
        console.log(inputValue);
        setInputValue('')
    }
  return (
    <>
      <header
        className={` navs flex justify-center flex-col top-0 w-full h-[10vh] transition-all duration-500 font-bold z-50 ${
          isBackground ? " bg-white text-black" : " text-white"
        }`}
        style={{ position: headerPosition }}
      >
        <nav className=" flex justify-between items-center w-4/5 px-10 m-auto ">
          <div className="logo">🅱-Log</div>
          <div className="links flex justify-center items-center">
            <ul className=" flex gap-5 justify-center items-center">
              <li>Places</li>
              <li>Styles</li>
              <li>Cities</li>
              <li>Blog</li>
              <li>About</li>
              <li>Resources</li>
            </ul>
          </div>
          <div className="search-section flex justify-center items-center gap-3">
            <div>
              <Link>
                <AiFillStepForward />
              </Link>
            </div>
            <div>
              <Link to={"/instagram"}>
                <AiFillInstagram />
              </Link>
            </div>
            <div>
              <Link to={"/facebook"}>
                <AiFillFacebook />
              </Link>
            </div>
            <div>
              <Link onClick={closeSearch}>
                <AiOutlineSearch />
              </Link>
            </div>
          </div>
        </nav>
        {isSearchVisible &&<div className=" relative w-full top-[10vh] flex justify-center items-center border-t-2 bg-white transition-all duration-500 py-3" style={{position:headerPosition}}>
        <form onSubmit={handleForm} className=" w-4/5 text-black px-10 flex items-center justify-between" >
          <input type="text" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} placeholder="Search..." className=" w-full  p-2 outline-none" />
          <RxCross2 onClick={closeSearch} className=" cursor-pointer" />
        </form>
      </div>}
      </header>
      
    </>
  );
};

export default Header;
