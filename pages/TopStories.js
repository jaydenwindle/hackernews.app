import React, { useState } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";

import LoadingMessage from "../components/LoadingMessage";
import StoryCard from "../components/StoryCard";
import { ref } from "../firebase";

const { width } = Dimensions.get("window");

const TopStories = () => {
  const [numberOfStories, setNumberOfStories] = useState(30);
  const storiesRef = ref(`topstories`).limitToFirst(numberOfStories);
  const [values, loading, error] = useListVals(storiesRef);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ width }} dark>
        <Appbar.Content title="Hacker News" />
      </Appbar.Header>
      <View style={styles.storiesContainer}>
        <LoadingMessage
          message="Loading top stories..."
          visible={loading && values.length === 0}
        />
        {error && <Text>Error loading top stories</Text>}
        {!loading && !error && (
          <FlatList
            data={values}
            renderItem={({ item }) => <StoryCard id={item} />}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  storiesContainer: {
    flex: 1,
    width,
    maxWidth: 1280
  }
});

export default TopStories;
