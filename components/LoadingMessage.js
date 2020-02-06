import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const LoadingMessage = ({ visible, message }) =>
  visible && (
    <View style={styles.loadingContainer}>
      <ActivityIndicator style={styles.loading} />
      <Text>{message}</Text>
    </View>
  );

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16
  },
  loading: {
    marginRight: 16
  }
});

export default LoadingMessage;
