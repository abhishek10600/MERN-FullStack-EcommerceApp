import { FaPlus } from "react-icons/fa";

type ProductsProps = {
    productId:string;
    photo:string;
    name:string;
    price:number;
    stock:number;
    handler: ()=> void;
}

const server = "fbuhsdyfnsdihyfio";


const ProductCard = ({productId, photo, name,price,stock,handler}:ProductsProps) => {
  return (
    <div className="productCard">
        <img src={photo} alt={name} />
        <p>{name}</p>
        <span>&#8377;{price}</span>
        <div>
            <button onClick={()=>handler()}><FaPlus/></button>
        </div>
    </div>
  )
}

export default ProductCard