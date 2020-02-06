import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "expo";
import moment from "moment";
import React from "react";
import { useObject } from "react-firebase-hooks/database";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";
import { useHistory } from "react-router-dom";
import Url from "url-parse";

import { ref } from "../firebase";
import { Link } from "../router";

const Story = ({ id, style }) => {
  const [value, loading, error] = useObject(ref(`item/${id}`));
  const history = useHistory();

  if (loading || error) {
    return null;
  }

  const val = value.val();

  const storyUrl = val.url ? ` (${Url(val.url).hostname})` : "";
  const storyTitle = `${val.title}${storyUrl}`;
  const storyPostedAt = moment.unix(val.time).fromNow();

  return (
    <Card
      style={[{ shadowOpacity: 0 }, style]}
      onPress={() => history.push(`/story/${id}`)}
    >
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.upvoteContainer}>
            <MaterialIcons
              name="arrow-drop-up"
              size={32}
              color="#767676"
              style={styles.upvoteIcon}
            />
            <Text style={styles.upvoteText}>{val.score}</Text>
          </View>
          <View style={styles.storyInfoContainer}>
            {val.url === undefined ? (
              <Link
                to={`/story/${id}`}
                style={Platform.OS === "web" && { textDecoration: "none" }}
              >
                <Title>{storyTitle}</Title>
              </Link>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === "web") {
                    window.open(val.url, "_blank");
                  } else {
                    Linking.openURL(val.url);
                  }
                }}
              >
                <Title>{storyTitle}</Title>
              </TouchableOpacity>
            )}
            <View style={styles.storyMetaContainer}>
              <Paragraph>{`${val.descendants || 0} comments`}</Paragraph>
              <Paragraph>{` • ${val.by} • ${storyPostedAt}`}</Paragraph>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  upvoteContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#f1f0f3",
    marginRight: 16
  },
  upvoteIcon: {
    width: 32
  },
  upvoteText: {
    color: "#767676",
    flexWrap: "wrap"
  },
  storyInfoContainer: {
    flex: 1
  },
  storyMetaContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Story;
