import React from "react";
import { View } from "react-native";

const WebView = ({ style, source }) => (
  <View
    dangerouslySetInnerHTML={{ __html: source.html }}
    style={[style, { fontFamily: "Roboto" }]}
  />
);

export default WebView;
