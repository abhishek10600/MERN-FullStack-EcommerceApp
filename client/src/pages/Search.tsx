import { useState } from "react"
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category,setCategory] = useState("");
  const [page,setPage] = useState(1);

  const addToCartHandler = ()=>{

  }
  const isPrevPage = page > 1
  const isNextPage = page < 5;
  return (
    <div className="productSearchPage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={ev=>setSort(ev.target.value)}>
            <option value="">None</option>
            <option value="ascending">Price (low to high)</option>
            <option value="descending">Price (high to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={100000} value={maxPrice} onChange={(ev)=>setMaxPrice(Number(ev.target.value))} />
        </div>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={ev=>setSort(ev.target.value)}>
            <option value="">None</option>
            <option value="ascending">Price (low to high)</option>
            <option value="descending">Price (high to low)</option>
          </select>
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={ev=>setCategory(ev.target.value)}>
            <option value="">All</option>
            <option value="">Sample1</option>
            <option value="">Sample2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={(ev)=>setSearch(ev.target.value)} />
        <div className="searchProductList">
          <ProductCard productId="afncsidvy2e8713" 
          photo="https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg" 
          name="MacBook" 
          price={150000} 
          stock={45} 
          handler={addToCartHandler}/>
          <ProductCard productId="afncsidvy2e8713" 
          photo="https://m.media-amazon.com/images/I/71S4sIPFvBL._SX679_.jpg" 
          name="MacBook" 
          price={150000} 
          stock={45} 
          handler={addToCartHandler}/>
        </div>
        <article>
          <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev - 1)}>Prev</button>
          <span>{page} of {5}</span>
          <button disabled={!isNextPage} onClick={()=>setPage(prev=>prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search