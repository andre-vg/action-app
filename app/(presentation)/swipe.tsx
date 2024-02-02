import Axios from "@/axios";
import SwipeCard from "@/components/SwipeCard";
import { UserContext } from "@/context/user";
import { View, Text } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated";

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
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        setIndex(Math.floor(value));
      }
    }
  );

  


  const [movies, setMovies] = React.useState<Movie[] |any| undefined >([]);
  const getMovies = async (): Promise<MovieFilter> => {
    return Axios.get(
      `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${user?.likedGenres}`
    ).then((res) => {
      setMovies(res.data.results);
      return res.data.results;
    });
  };

  const MoviesRelated = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  useEffect(() => {
    if (index > movies.length - 3) {
      console.warn('Last 2 cards remining. Fetch more!');
      //setMovies reverse array
      setMovies((movies:any) => [...movies, ...movies.reverse()]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    console.log('on Response: ', res);
  };

  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="$secondary800"
    >
      {MoviesRelated.isLoading ? (
        <Text>Loading...</Text>
      ) : MoviesRelated.isError ? (
        <Text>Error: {MoviesRelated.error.message}</Text>
      ) : (
        <View>
          {movies.map((movie: Movie, index: number) => (
            <SwipeCard
              key={movie.id}
              movie={movie}
              index={movies.length - index}
              numOfCards={movies.length}
              activeIndex={activeIndex}
              onResponse={onResponse}
            />
          ))}
        </View>
      )}
    </View>
  );
}