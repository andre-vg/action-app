import { Button, ButtonText } from "@gluestack-ui/themed";
import React, { useState } from "react";

type GenreCardProps = {
  genre: {
    id: number;
    name: string;
  };
  setChoosenList: (value: any) => void;
  choosenList: any;
};

export default function GenreCard({
  genre,
  setChoosenList,
  choosenList,
}: GenreCardProps) {
  return (
    <Button
      isPressed={choosenList.includes(genre)}
      $active-bgColor="$secondary900"
      $focus-bgColor="$primary400"
      bgColor="$primary600"
      onPress={() => {
        setChoosenList((prev: any) => {
          if (prev.includes(genre)) {
            return prev.filter((item: any) => item !== genre);
          }
          return [...prev, genre];
        });
      }}
    >
      <ButtonText color="$white" fontWeight="bold" size="xs">
        {genre.name}
      </ButtonText>
    </Button>
  );
}
