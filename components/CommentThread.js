import React from "react";
import { View, FlatList } from "react-native";
import { useObject } from "react-firebase-hooks/database";
import { Text } from "react-native-paper";
import moment from "moment";
import HTML from "react-native-render-html";

import { ref } from "../firebase";

const CommentThread = ({ id, depth }) => {
  const [value, loading, error] = useObject(ref(`item/${id}`).limitToFirst(30));

  if (loading || error) {
    return null;
  }

  const val = value.val();

  if (val.deleted) {
    return null;
  }

  return (
    <View
      style={[
        {
          margin: 8
        },
        depth > 0 && {
          padding: 16,
          paddingBottom: 0,
          borderLeftWidth: 2,
          borderLeftColor: "#f1f0f3"
        }
      ]}
    >
      {depth > 0 && (
        <Text style={{ marginBottom: 16, color: "#767676" }}>{`${
          val.by
        } • ${moment.unix(val.time).fromNow()}`}</Text>
      )}
      {val.text && <HTML html={val.text} />}
      {val.kids !== undefined && (
        <FlatList
          data={val.kids}
          renderItem={({ item }) => (
            <CommentThread id={item} depth={depth + 1} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default CommentThread;
