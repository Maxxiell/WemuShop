import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './containers/Header'
import HolidayBanner from './containers/HolidayBanner'
import Footer from './containers/Footer'
import ProductListing from './containers/ProductListing'
import ProductDetail from './containers/ProductDetail'
import Cart from './containers/Cart'
import Profile from './containers/Profile'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <HolidayBanner />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h2>404 Not Found!</h2>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App