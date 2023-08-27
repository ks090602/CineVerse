import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect, useState } from "react";
import CardMovies from "../Components/CardMovies";
import Pagination from "../Components/Pagination";

import LeftListBar from "../Components/LeftListBar";
import useGenres from "../Hooks/useGenres";
import SkeletonLoading from "../Components/SkeletonLoading";

const TVSeries = () => {
  const [content, setContent] = useState([]);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [pageno, setPageno] = useState(1);
  const [paginationno, setPaginationno] = useState(0);
  const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

  const genreforURL = useGenres(selectedGenres);
  const GetDataTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${pageno}&with_genres=&language=en-US&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setPaginationno(data.total_pages);
  };

  useEffect(() => {
    GetDataTrending();
    //eslint-disable-next-line
  }, [pageno, genreforURL]);

  const handleClick = (number) => {
    setPageno(number);
  };

  return (
    <main className="homePage">
      <Container>
        <Row>
          <Col className="col-12">
            <section>
              <h1 className="txtCenter">Top Trending TV Series</h1>
              <h3 className="txtCenter"> For You</h3>
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={4} md={3} lg={2} xl={2}>
            <LeftListBar
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              setGenres={setGenres}
              type="tv"
              setPage={setPageno}
            />
          </Col>
          <Col xs={12} sm={8} md={9} lg={10} xl={10}>
            <Row>
              {content && content.length > 0 ? (
                content.map((item) => {
                  return (
                    <CardMovies key={item.id} data={item} mediatype="tv" display = ""/>
                  );
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
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default TVSeries;
