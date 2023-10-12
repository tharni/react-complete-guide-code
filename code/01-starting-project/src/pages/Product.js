import { Link } from "react-router-dom";

const PRODUCTS=[
    {id:1, title:"Mac book"},
    {id:2, title:"iPAD"},
]
function ProductPage() {
  return(
  <>
    <h1>My product page</h1>
    <ul>
        {PRODUCTS.map((product) => (
            <li key={product.id}><Link to={`/products/${product.id}`}>{product.title}</Link></li>
        ))}
    </ul>
  </>
  );
}
export default ProductPage;
