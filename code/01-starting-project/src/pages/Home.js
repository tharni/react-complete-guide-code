import { Link, useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const navigateHandelr = () =>{
        navigate("/Products")
    }
    return(
        <>
        <h1>My Home page</h1>
        <Link to="/products">List of products</Link>
        <p><button onClick={navigateHandelr}>Navigate</button></p>
        </>
    ); 
}
export default HomePage;