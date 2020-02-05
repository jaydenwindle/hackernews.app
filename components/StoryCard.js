import React from "react";
import { View, Platform, TouchableOpacity } from "react-native";
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

import { Router, Route, Link } from "../router";

import { ref } from "../firebase";

const Story = ({ id }) => {
  const [value, loading, error] = useObject(ref(`item/${id}`));

  if (loading || error) {
    return null;
  }

  const val = value.val();

  return (
    <Card style={{ flex: 1, paddingVertical: 8, shadowOpacity: 0 }}>
      <Card.Content>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 0,
              paddingBottom: 8,
              paddingHorizontal: 8,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: "#f1f0f3",
              marginRight: 16
            }}
          >
            <MaterialIcons
              name="arrow-drop-up"
              size={32}
              color="#767676"
              style={{ width: 32 }}
            />
            <Text style={{ color: "#767676", flexWrap: "wrap" }}>
              {val.score}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            {val.url === undefined ? (
              <Link
                to={`/story/${id}`}
                style={Platform.OS === "web" && { textDecoration: "none" }}
              >
                <Title>{`${val.title}${
                  val.url ? ` (${Url(val.url).hostname})` : ""
                }`}</Title>
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
                <Title>{`${val.title}${
                  val.url ? ` (${Url(val.url).hostname})` : ""
                }`}</Title>
              </TouchableOpacity>
            )}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Link
                to={`/story/${id}`}
                style={Platform.OS === "web" && { textDecoration: "none" }}
              >
                <Paragraph>{`${val.descendants || 0} comments`}</Paragraph>
              </Link>
              <Paragraph>{` • ${val.by} • ${moment
                .unix(val.time)
                .fromNow()}`}</Paragraph>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default Story;
