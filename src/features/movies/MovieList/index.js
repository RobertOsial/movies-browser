import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectError, selectGenres, selectLoading, selectMovies } from "./popularMoviesSlice";
import { Section } from "../../../common/Section";
import { MovieWrapper } from "../../../common/MovieWrapper";
import { Title } from "../../../common/Title";
import { Loader } from "../../../common/Loader";
import { ErrorPage } from "../../../common/ErrorPage";
import { MovieTile } from "../../../common/MovieTile";
import { APIImageUrl } from "../../APIdata";
import { nanoid } from "@reduxjs/toolkit";
import { Pagination } from "../../../common/Pagination";
import { MainContainer } from "../../../common/MainContainer";

export const MovieList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch])

  const popularMovies = useSelector(selectMovies);
  const genresTable = useSelector(selectGenres);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <MainContainer>
      <Section>
        {error
          ? <ErrorPage />
          : <>
            <Title>Popular movies</Title>
            {loading
              ? <Loader />
              : <>
                <MovieWrapper>
                  {
                    popularMovies.map((movie) => (
                      <MovieTile
                        key={nanoid()}
                        poster={`${APIImageUrl}/w342${movie.poster_path}`}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        date={movie.release_date.slice(0, 4)}
                        voteAverage={movie.vote_average}
                        voteCount={`${movie.vote_count} votes`}
                        genres={genresTable.filter((genre) => movie.genre_ids.includes(genre.id))}
                        id={movie.id}
                      />
                    ))
                  }
                </MovieWrapper>
              </>
            }
          </>
        }
      </Section>
      <Pagination />
    </MainContainer>
  );
};
