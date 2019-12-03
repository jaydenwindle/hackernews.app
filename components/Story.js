import React from "react";
import { View, Platform } from "react-native";
import { useObject } from "react-firebase-hooks/database";
import {
  Avatar,
  Button,
  Text,
  Card,
  Title,
  Paragraph
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { Linking } from "expo";

import Url from "url-parse";

import { ref } from "../firebase";

const Story = ({ id }) => {
  const [value, loading, error] = useObject(ref(`item/${id}`));

  if (loading || error) {
    return null;
  }

  const val = value.val();
  //   console.log(val);

  return (
    <Card
      style={{ flex: 1, paddingVertical: 8, shadowOpacity: 0 }}
      onPress={() => {
        if (val.url) {
          if (Platform.OS === "web") {
            window.open(val.url, "_blank");
          } else {
            Linking.openURL(val.url);
          }
        }
      }}
    >
      <Card.Title
        style={{ paddingLeft: 0 }}
        title={`${val.title}${val.url ? ` (${Url(val.url).hostname})` : ""}`}
        subtitle={`${val.descendants} comments • ${val.by} • ${moment
          .unix(val.time)
          .fromNow()}`}
        left={props => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              paddingTop: 0,
              paddingBottom: 8,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "#f1f0f3"
            }}
          >
            <MaterialIcons name="arrow-drop-up" size={32} color="#767676" />
            <Text style={{ color: "#767676" }}>{val.score}</Text>
          </View>
        )}
      />
    </Card>
  );
};

export default Story;
