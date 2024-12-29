import './App.css'
import Navbar from './Navbar'
import './index.css';
import Footer from './Footer';
import CategoryList from './CategoryList';
import SponsoredItems from './SponsoredItems'

function App() {
  
  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <h1 className='product' >Product Categories</h1>
      <CategoryList />
      
      <Footer></Footer>
    </div>
  
  )
}

export default App
 