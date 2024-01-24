import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const Home = () => {
  const addToCartHandler = ()=>{

  };
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>
      <main>
        <ProductCard 
          productId="afncsidvy2e8713" 
          photo="https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg" 
          name="MacBook" 
          price={150000} 
          stock={45} 
          handler={addToCartHandler}
        />
        <ProductCard productId="afncsidvy2e8713" photo="https://m.media-amazon.com/images/I/51MPjJ3Zb7L._SX522_.jpg" name="CCV Camera" price={5000} stock={22} handler={addToCartHandler}/>
      </main>
    </div>
  )
}

export default Home