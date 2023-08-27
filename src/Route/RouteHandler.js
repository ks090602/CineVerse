import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Container/Home"
import Movies from "../Container/Movies"
import Search from "../Container/Search"
import TVSeries from "../Container/TVSeries"
import Details from "../Container/Details"
import Header from "../Components/Header"

const RouteHandler = ()=>{
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />                
                    <Route exact path="/Movies" element={<Movies />} />                
                    <Route exact path="/TVSeries" element={<TVSeries />} />                
                    <Route exact path="/Search" element={<Search />} />  
                    <Route path="/details/:movieid/:mediatype" element={<Details />}/>              
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteHandler;