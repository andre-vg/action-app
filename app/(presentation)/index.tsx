import Axios from "@/axios";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRightIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Heading,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import GenreCard from "@/components/GenreCard";
import { useContext, useEffect, useState } from "react";
import { Link } from "expo-router";
import * as Location from "expo-localization";
import { UserContext } from "@/context/user";

type Genres = {
  id: number;
  name: string;
};

export default function TabTwoScreen() {
  const getGenres = async (): Promise<Genres[]> => {
    return Axios.get("genre/movie/list").then((res) => res.data.genres);
  };

  const { setUser } = useContext(UserContext);

  const [choosenList, setChoosenList] = useState<Genres[]>([]);

  const queryGenres = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const handlePress = () => {
    setUser({ likedGenres: choosenList.map((genre) => genre.id) });
  };

  return (
    <Box
      p={"$4"}
      flex={1}
      bgColor="$primary700"
      justifyContent="space-between"
      pb={"$16"}
    >
      {queryGenres.isLoading ? (
        <Text>Loading...</Text>
      ) : queryGenres.isError ? (
        <Text>Error: {queryGenres.error.message}</Text>
      ) : (
        <>
          <VStack space="lg">
            <Heading size="xl" color="$white">
              Escolha seus gêneros favoritos
            </Heading>
            <HStack space="md" flexWrap="wrap">
              {queryGenres.data?.map((genre) => (
                <GenreCard
                  key={genre.id}
                  genre={genre}
                  choosenList={choosenList}
                  setChoosenList={setChoosenList}
                />
              ))}
            </HStack>
          </VStack>
          <Link asChild href={"/(presentation)/swipe"}>
            <Button onPress={handlePress} isDisabled={choosenList.length == 0}>
              <ButtonText color="$white">Avançar </ButtonText>
              <ButtonIcon as={ArrowRightIcon} color="$white" />
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}
