import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { useHistory } from "react-router-dom";

import LoadingMessage from "../components/LoadingMessage";
import CommentThread from "../components/CommentThread";
import StoryCard from "../components/StoryCard";

const { width } = Dimensions.get("window");

const StoryDetails = ({
  match: {
    params: { id }
  }
}) => {
  const history = useHistory();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ width }} dark>
        <Appbar.BackAction
          onPress={() => {
            history.goBack();
          }}
        />
        <Appbar.Content title="Hacker News" />
      </Appbar.Header>
      <View style={styles.storyContainer}>
        <StoryCard id={id} style={styles.storyCard} />
        <CommentThread id={id} depth={0} />
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
  storyContainer: {
    flex: 1,
    width,
    maxWidth: 1280
  },
  storyCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});

export default StoryDetails;
