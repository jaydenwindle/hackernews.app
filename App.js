import React, { useState, useCallback } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { useListVals } from "react-firebase-hooks/database";
import {
  Appbar,
  Text,
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  ActivityIndicator
} from "react-native-paper";

import StoryCard from "./components/StoryCard";
import StoryDetails from "./pages/StoryDetails";

import { ref } from "./firebase";

import { Router, Route, Link } from "./router";

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
  const [numberOfStories, setNumberOfStories] = useState(30);
  const storiesRef = ref(`topstories`).limitToFirst(numberOfStories);
  const [values, loading, error] = useListVals(storiesRef);

  const loadMoreStories = useCallback(() => {
    setNumberOfStories(numberOfStories + 30);
  }, [numberOfStories]);

  return (
    <PaperProvider theme={theme}>
      <Router>
        <Route exact path="/">
          <View style={styles.container}>
            <Appbar.Header style={{ width }} dark>
              <Appbar.Content title="Hacker News" />
            </Appbar.Header>
            <View
              style={{
                flex: 1,
                width,
                paddingVertical: 8,
                maxWidth: 1280
              }}
            >
              {loading && values.length === 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 16
                  }}
                >
                  <ActivityIndicator style={{ marginRight: 16 }} />
                  <Text>Loading top stories...</Text>
                </View>
              )}
              {error && <Text>Error loading top stories</Text>}
              {!loading && !error && (
                <>
                  <FlatList
                    data={values}
                    renderItem={({ item }) => <StoryCard id={item} />}
                    keyExtractor={(_, index) => index.toString()}
                  />
                  {/* <Button
                    style={{ marginVertical: 16 }}
                    onPress={loadMoreStories}
                  >
                    Load more
                  </Button> */}
                </>
              )}
            </View>
          </View>
        </Route>
        <Route path="/story/:id" component={StoryDetails} />
      </Router>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
