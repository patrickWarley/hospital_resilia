import { Outlet } from 'react-router-dom';
import './App.css';

import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  return (
    <div className="container-fluid overflow-hidden p-0 min-vh-100 min-vw-100 bg-light">
      <Navbar />
      <main className='container-fluid' style={{ paddingTop: '50px', paddingBottom:"100px"}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
