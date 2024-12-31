import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Main from './components/main';
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Main/>
    </BrowserRouter>

  )
}

export default App
