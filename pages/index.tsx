// E:\programming\Project\sciclon\pages\index.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5">
      <h1>Welcome to Sciclon</h1>
      <p>Sciclonは、「AWS」と「GCP」の基礎が効率的に学べるサイトです。</p>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
