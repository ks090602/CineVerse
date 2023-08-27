import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMovies from '../Components/CardMovies';
import Pagination from '../Components/Pagination';
import SearchBarCard from '../Components/SearchBarCard';
import SkeletonLoading from '../Components/SkeletonLoading';

const Search = ()=>{
    const [content, setContent] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [paginationno, setPaginationno] = useState(0);

    const [searchValue, setSearchValue] = useState('crime');
    const [typeValue, setTypeValue] = useState('movie');
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;
    
    
    const GetDataTrending = async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${typeValue}?api_key=${API_KEY}&page=${pageno}&language=en-US&query=${searchValue}&include_adult=false`);
        // console.log('data', data.results)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    
    useEffect(()=>{
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno]);

    const fetchDataQuery = ()=>{
        GetDataTrending()
    }
    
    const handleClick = (number)=>{
        setPageno(number);
    }

    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Search Movies /  TV Series</h1>
                            <SearchBarCard 
                                searchValue={searchValue}
                                setSearchValue={(value)=>{setSearchValue(value)}}
                                typeValue={typeValue}
                                setTypeValue={(value)=>{setTypeValue(value)}}
                                filterData={fetchDataQuery} />
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-12'>
                        <Row>
                                {
                                    content && content.length > 0 ? content.map((item)=>{
                                        return (<CardMovies key={item.id} data={item} mediatype={typeValue} display={item.media_type} />)
                                    }) : ""
                                }

                            {
                                paginationno && paginationno > 1 ? <Pagination maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ""
                            }
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        </main>
    )
}

export default Search;