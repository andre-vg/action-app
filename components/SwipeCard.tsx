import { useWindowDimensions } from "react-native";
import { Card } from "react-native-card-stack-swiper";
import {
  HStack,
  Heading,
  Image,
  ImageBackground,
  LinearGradient,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Movie } from "@/app/(presentation)/swipe";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { config } from "@/config/gluestack-ui.config";

type Props = {
  movie: Movie;
  index: number;
};

export default function SwipeCard({ movie }: Props) {
  const { width, height } = useWindowDimensions();
  return (
    //@ts-ignore
    <Card
      key={movie.id}
      style={{
        width: width * 0.9,
        height: height * 0.8,
      }}
    >
      <ImageBackground
        source={{
          uri: "https://image.tmdb.org/t/p/original" + movie?.poster_path,
        }}
        rounded={"$xl"}
      >
        <LinearGradient
          //@ts-ignore
          colors={[
            "$transparent",
            "$transparent",
            "$transparent",
            "$backgroundDarkMuted",
            "$backgroundDarkMuted",
          ]}
          as={ExpoLinearGradient}
          h={"$full"}
          flexDirection="column-reverse"
          gap={"$2"}
          p={"$4"}
        >
          <HStack>
            <HStack space="xs" pr={"$2"} pl={"$1"} py={"$1"} rounded={"$full"} bgColor="$trueGray700" alignItems="center">
              <Icon name="grade" size={24} color={config.tokens.colors.light200} />
              <Text color="$light200">{movie.vote_average.toPrecision(2)}</Text>
            </HStack>
          </HStack>
          {movie.overview.length > 150 ? (
            <Text color="$light200">
              {movie?.overview.substring(0, 150)}...
            </Text>
          ) : (
            <Text color="$light200">{movie?.overview}</Text>
          )}
          <Heading size="xl" color="$light200">
            {movie?.title}
          </Heading>
        </LinearGradient>
      </ImageBackground>
    </Card>
  );
}
