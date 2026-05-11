import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_NOTES = [
  {
    id: "1",
    title: "Complete Note App UI",
    content: "Esse exercitation adipisicing enim...",
    date: "May 10",
  },
  {
    id: "2",
    title: "Travelling",
    content: "Ad incididunt ea est voluptate...",
    date: "May 11",
  },
  {
    id: "3",
    title: "Hackathon",
    content: "Nostrud occaecat reprehenderit...",
    date: "May 11",
  },
  {
    id: "4",
    title: "React Native Revision",
    content: "Esse exercitation adipisicing...",
    date: "May 11",
  },
];

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type Props = {
  onNotePress: (note: Note) => void;
};

export default function NotesListingScreen({ onNotePress }: Props) {
  const insets = useSafeAreaInsets();
  const systemTheme = useColorScheme();
  const { width } = useWindowDimensions();

  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(MOCK_NOTES);

  useEffect(() => {
    setIsDarkMode(systemTheme === "dark");
  }, [systemTheme]);

  useEffect(() => {
    const filtered = MOCK_NOTES.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredNotes(filtered);
  }, [search]);

  const isTablet = width > 600;
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  const renderItem = ({ item }: { item: Note }) => (
    <Pressable
      onPress={() => onNotePress(item)}
      style={({ pressed }) => [
        styles.card,
        themeStyles.card,
        {
          width: isTablet ? "48%" : "100%",
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[styles.cardTitle, themeStyles.text]}>{item.title}</Text>

      <Text style={[styles.cardContent, themeStyles.subText]} numberOfLines={3}>
        {item.content}
      </Text>

      <Text style={styles.cardDate}>{item.date}</Text>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        themeStyles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, themeStyles.text]}>Notes</Text>

        <View style={styles.switchRow}>
          <Text style={themeStyles.subText}>
            {isDarkMode ? "Dark" : "Light"}
          </Text>

          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: "#333" }}
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      <TextInput
        style={[styles.searchInput, themeStyles.input]}
        placeholder="Search notes..."
        placeholderTextColor={isDarkMode ? "#888" : "#999"}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? "tablet" : "phone"}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          isTablet ? { justifyContent: "space-between" } : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop and paddingHorizontal removed — handled dynamically via insets
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchInput: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
  },

  listContainer: {
    paddingBottom: 40,
  },

  card: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },

  cardDate: {
    fontSize: 12,
    color: "#888",
  },
});

const lightTheme = StyleSheet.create({
  container: { backgroundColor: "#F9F9F9" },
  text: { color: "#000" },
  subText: { color: "#555" },
  input: { backgroundColor: "#FFF", borderColor: "#EEE", color: "#000" },
  card: { backgroundColor: "#FFF", borderColor: "#EEE" },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: "#121212" },
  text: { color: "#FFF" },
  subText: { color: "#AAA" },
  input: { backgroundColor: "#1E1E1E", borderColor: "#333", color: "#FFF" },
  card: { backgroundColor: "#1E1E1E", borderColor: "#333" },
});
