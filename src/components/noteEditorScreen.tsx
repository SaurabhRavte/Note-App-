import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type Props = {
  note: Note;
  onBack: () => void;
};

export default function NoteEditorScreen({ note, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?q=80&w=735&auto=format&fit=crop",
        }}
        style={[styles.headerImage, { paddingTop: insets.top }]}
      >
        <View style={styles.overlay}>
          <View style={styles.headerActions}>
            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.backButton,
                {
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.94 : 1 }],
                },
              ]}
            >
              <View style={styles.backButtonInner}>
                <Text style={styles.backIcon}>‹</Text>
                <Text style={styles.backText}> Notes</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onBack}
              style={({ pressed }) => [
                styles.saveHeaderButton,
                {
                  opacity: pressed ? 0.9 : 1,
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                },
              ]}
            >
              <View style={styles.saveButtonInner}>
                <Text style={styles.saveButtonIcon}>✓</Text>
                <Text style={styles.saveButtonText}>SAVE</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingLeft: insets.left + 25, paddingRight: insets.right + 25 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={[styles.titleInput, themeStyles.text]}
            placeholder="Note Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.bodyInput, themeStyles.text]}
            placeholder="Start writing..."
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  headerImage: { height: 220, width: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    overflow: "hidden",
  },
  backButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 16,
  },
  backIcon: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "300",
    marginTop: -4,
  },
  backText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: -2,
  },
  saveHeaderButton: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  saveButtonIcon: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 6,
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.8,
  },
  scrollContent: { padding: 25, flexGrow: 1 },
  titleInput: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 10,
    letterSpacing: -1,
  },
  bodyInput: {
    fontSize: 18,
    lineHeight: 28,
    minHeight: 400,
    opacity: 0.8,
  },
});

const lightTheme = StyleSheet.create({
  container: { backgroundColor: "#FAFAFA" },
  text: { color: "#111" },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: "#0A0A0A" },
  text: { color: "#FFF" },
});
