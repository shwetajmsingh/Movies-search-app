import styled from "styled-components";
import './App.css';
import { useState } from "react";
import Movies from './components/Movies';
import Axios from "axios";
 export const API_KEY = "27b39e42";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    flex-directin: row;
    background-color: black;
    color: white;
    font-size: 25px;
    font-weight:bold;
    padding: 10x;
`
const AppName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    `   
const SearchInput = styled.input`
    color: black;
    font-size: 16px;
    font-weight: bold;
    margin-left:1000px;
    ` 
const MovieListContainer = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
    padding:30px;
    justify-content: space-evenly;
    `

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeoutId, updateTimeOutId] = useState();
  const [movieList, updateMovieList] = useState([]); 

  const fetchData = async (searchString) => {
    const response = await Axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    updateMovieList(response.data.Search)
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500)
    updateTimeOutId(timeout);  
  };

  return (
    <div className="App">
    <Container>
      <Header>
        <AppName>Movies</AppName>
        <SearchInput placeholder="Search Movie" 
                     value={searchQuery} 
                     onChange={onTextChange}></SearchInput>
      </Header>
      <MovieListContainer>
        {movieList?.length
         ? movieList.map((movie,index) =>(
          <Movies key={index} movie={movie} />
         ))
         :"No Movie Search"
        }
      </MovieListContainer>
    </Container>
    </div>
  );
}

export default App;
