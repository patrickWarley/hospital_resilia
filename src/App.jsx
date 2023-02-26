import { Outlet } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  return (
    <div className="container-fluid p-0 min-vh-100">
      <Navbar />
      <main className='container-fluid'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
