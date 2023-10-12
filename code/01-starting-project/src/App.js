import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

// const routeDefs = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage/>}/>
//     <Route path="/products" element={<ProductPage/>}/>
//   </Route>
// )
//const router = createBrowserRouter(routeDefs);

const router = createBrowserRouter([
  {path:"/", element:<RootLayout/>, errorElement:<ErrorPage/>, children:[
    { index:true, element: <HomePage /> }, 
    { path: "/products", element: <ProductPage /> },
    { path: "/products/:productId", element: <ProductDetailPage /> }
  ]}
  
]);
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
