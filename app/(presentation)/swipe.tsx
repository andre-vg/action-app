import Axios from "@/axios";
import SwipeCard from "@/components/SwipeCard";
import { UserContext } from "@/context/user";
import { View, Text } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import CardStack from "react-native-card-stack-swiper";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieFilter = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default function swipe() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = React.useState<Movie[] | any | undefined>([]);
  const [likedMovies, setLikedMovies] = React.useState<Movie[] | any | undefined>([]);
  const [dislikedMovies, setDislikedMovies] = React.useState<Movie[] | any | undefined>([]);

  const getMovies = async (): Promise<MovieFilter> => {
    return Axios.get(
      // @ts-ignore
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${user?.likedGenres.length > 3 ? user?.likedGenres.join("|") : user?.likedGenres}`
    ).then((res) => {
      setMovies(res.data.results);
      return res.data.results;
    });
  };

  const MoviesRelated = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });


  return (
    <View flex={1}>
      {MoviesRelated.isLoading ? (
        <Text>Loading...</Text>
      ) : MoviesRelated.isError ? (
        <Text>Error: {MoviesRelated.error.message}</Text>
      ) : (
        //@ts-ignore
        <CardStack
          style={{
            flex: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onSwipedRight={(index) => {
            setLikedMovies([...likedMovies, movies[index]]);
          }}
          onSwipedLeft={(index) => {
            setDislikedMovies([...dislikedMovies, movies[index]]);
          }}
        >
          {movies.map((movie: Movie, index: number) => (
            <SwipeCard key={movie.id} movie={movie} index={index} />
          ))}
        </CardStack>
      )}
    </View>
  );
}
