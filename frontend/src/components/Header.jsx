import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiOutlineSearch,
  AiFillFacebook,
  AiFillStepForward,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const Header = ({ headerPosition, isBackground, setBackground }) => {
  const [isSearchVisible, setSearchvisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [toggle, setToggle] = useState(false);
  if (isSearchVisible) {
    setBackground(true);
  } else {
    if (window.scrollY < 100) {
      setBackground(false);
    }
  }
  const closeSearch = () => {
    setSearchvisible(!isSearchVisible);
    if (toggle) {
      setToggle(false);
    }
  };
  const hideToggle = () => {
    if (toggle) {
      setToggle(false);
    }
    return;
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <>
      <header
        className={` navs flex justify-center flex-col top-0 w-full h-[10vh] transition-all duration-500 font-bold z-50 ${
          isBackground ? " bg-white text-black" : " text-white"
        }`}
        style={{ position: "fixed" }}
      >
        <nav className=" flex justify-between items-center w-4/5 px-10 m-auto ">
          <div className="logo">🅱-Log</div>
          <div
            className={`links lg:flex lg:justify-between lg:w-2/3 lg:items-center max-lg:absolute top-0 transition-all duration-300 ${
              toggle
                ? "flex flex-col bg-white text-black p-10 text-5xl w-full tracking-wide"
                : "hidden bg-transparent"
            }  w-full`}
          >
            {toggle && (
              <div
                className=" absolute top-10 right-[20%] border "
                onClick={hideToggle}
              >
                <RxCross2 className=" text-2xl" />
              </div>
            )}
            <ul
              className={` flex gap-5 justify-center ${
                toggle ? "flex-col" : "items-center"
              }`}
            >
              <li onClick={hideToggle}>Places</li>
              <li onClick={hideToggle}>Styles</li>
              <li onClick={hideToggle}>Cities</li>
              <li onClick={hideToggle}>Blog</li>
              <li onClick={hideToggle}>About</li>
              <li onClick={hideToggle}>Resources</li>
            </ul>
            <div className={`search-section lg:pl-10 flex lg:justify-center lg:items-center gap-3 ${toggle?" flex-col ":""}`}>
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
                  {toggle?<span className="flex items-center gap-2"><AiOutlineSearch />Search</span>:<AiOutlineSearch />} 
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="search-section flex justify-center items-center gap-3">
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
          </div> */}
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
            className=" lg:hidden flex flex-col justify-between items-center gap-1 border cursor-pointer"
          >
            <span className=" w-[42px] h-[5px] bg-white "></span>
            <span className=" w-[42px] h-[5px] bg-white"></span>
            <span className=" w-[42px] h-[5px] bg-white"></span>
          </div>
        </nav>
        {isSearchVisible && (
          <div
            className=" relative w-full top-[10vh] flex justify-center items-center border-t-2 bg-white transition-all duration-500 py-3"
            style={{ position: headerPosition }}
          >
            <form
              onSubmit={handleForm}
              className=" w-4/5 text-black px-10 flex items-center justify-between"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Search..."
                className=" w-full  p-2 outline-none"
              />
              <RxCross2 onClick={closeSearch} className=" cursor-pointer" />
            </form>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
