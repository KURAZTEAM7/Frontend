import Navbar from './Navbar.jsx'
import MainBody from './MainBody.jsx'
import Filter from './Filter.jsx'


export default function App(){
  return(
    <div className="container">
      <Filter />
      <Navbar /> 
    </div>
  )
}
