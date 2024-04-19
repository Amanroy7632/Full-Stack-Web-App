import React, { useEffect, useState } from 'react';
// import './App.css'; // You can import your CSS file here

function Abc() {
  const [headerPosition, setHeaderPosition] = useState('fixed');

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 100) {
        // Change header position when scrolled past a certain point (e.g., 100px)
        setHeaderPosition('absolute');
      } else {
        setHeaderPosition('fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Header component with dynamic position */}
      <header style={{ position: headerPosition, top: 0, left: 0, width: '100%', backgroundColor: 'lightblue', padding: '10px 0', zIndex: 1000 }}>
        <h1>My Header</h1>
      </header>

      {/* Main content */}
      <div style={{ paddingTop: '100px', minHeight: '2000px' }}>
        {/* Add content here */}
        <p>Scroll down to see the header position change.</p>
      </div>
    </div>
  );
}

export default Abc;
