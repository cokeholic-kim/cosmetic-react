import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './main';
import ProductPage from './product';
import { Routes,Route } from 'react-router-dom';
import UploadPage from './upload';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/detailView/:p_id' element={<ProductPage/>}/>
        <Route path='/upload' element={<UploadPage></UploadPage>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
