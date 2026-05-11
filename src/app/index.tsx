import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NoteAppScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Text>NoteAppScreen</Text>
    </View>
  );
};

export default NoteAppScreen;

const styles = StyleSheet.create({});
