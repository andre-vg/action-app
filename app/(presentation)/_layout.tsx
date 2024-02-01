import React from "react";
import { Stack } from "expo-router";
import { config } from "@/config/gluestack-ui.config";
import { StatusBar } from "@gluestack-ui/themed";

export default function TabLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            navigationBarColor: config.tokens.colors.primary500,
            headerShadowVisible: false,
            headerTitleStyle: {
              color: config.tokens.colors.white,
            },
            title: "Vamos começar!",
            headerStyle: {
              backgroundColor: config.tokens.colors.primary700,
            },
          }}
        />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </>
  );
}
