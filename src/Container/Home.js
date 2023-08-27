import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import CardMovies from "../Components/CardMovies";
import Pagination from "../Components/Pagination";
import SkeletonLoading from "../Components/SkeletonLoading";

const Home = () => {
  const [content, setContent] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [paginationno, setPaginationno] = useState(0);
  const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

  const GetDataTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageno}`
      );
      // console.log(data);
      setContent(data.results);
      setPaginationno(data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClick = (num) => {
    setPageno(num);
  };

  useEffect(() => {
    GetDataTrending();
  }, [pageno]);

  return (
    <main className="homePage">
      <Container>
        <Row>
          <Col className="col-12">
            <section>
              <h1 className="txtCenter">Top Trending </h1>
            </section>
          </Col>
          {content && content.length > 0 ? (
            content.map((item) => {
              return <CardMovies key={item.id} data={item} mediatype="tv" display = {item.media_type}/>;
            })
          ) : (
            <SkeletonLoading />
          )}
          {paginationno && paginationno > 1 ? (
            <Pagination
              maxnum={paginationno}
              activenum={pageno}
              handleClick={handleClick}
            />
          ) : (
            ""
          )}
        </Row>
      </Container>
    </main>
  );
};

export default Home;
