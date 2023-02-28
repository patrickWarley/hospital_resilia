import { Outlet } from 'react-router-dom';
import './App.css';

import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  return (
    <div className="container-fluid overflow-hidden p-0 min-vh-100 w-100">
      <Navbar />
      <main className='container-fluid'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
