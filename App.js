import React from "react";
import { Dimensions } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import StoryDetails from "./pages/StoryDetails";
import TopStories from "./pages/TopStories";
import { Route, Router } from "./router";

const { height, width } = Dimensions.get("window");

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff6600",
    accent: "#f6f6ef"
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Router>
        <Route exact path="/" component={TopStories} />
        <Route path="/story/:id" component={StoryDetails} />
      </Router>
    </PaperProvider>
  );
}
