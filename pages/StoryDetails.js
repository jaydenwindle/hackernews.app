import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Appbar, Button, ActivityIndicator } from "react-native-paper";

const { height, width } = Dimensions.get("window");

import StoryCard from "../components/StoryCard";
import CommentThread from "../components/CommentThread";

const StoryDetails = ({
  match: {
    params: { id }
  }
}) => (
  <View style={styles.container}>
    <Appbar.Header style={{ width }} dark>
      <Appbar.Content title="Hacker News" />
    </Appbar.Header>
    <View
      style={{
        flex: 1,
        width,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxWidth: 1280
      }}
    >
      <StoryCard id={id} />
      {/* <CommentThread id={id} depth={0} /> */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});

export default StoryDetails;
