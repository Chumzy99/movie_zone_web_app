import React from "react";

// Config imports
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// COMPONENTS
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

// Hooks
import { useHomeFetch } from "../Hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

// const randomKey = Math.round(Math.random() * 100);
let randomKey = 1;

const Home = () => {
  const { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore } =
    useHomeFetch();
  console.log(state);

  if (error) return <div>Something went wrong...</div>;

  // take off searchTerm
  return (
    <>
      {!searchTerm && state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {state.results.map((movie) => {
          randomKey++;
          return (
            <Thumb
              key={movie.id + randomKey}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
            />
          );
        })}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text="Load More" callback={() => setIsLoadingMore(true)} />
      )}
    </>
  );
};

export default Home;
