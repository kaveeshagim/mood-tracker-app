import { StyleSheet } from "react-native";
import theme from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.beige,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#567c8d",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  selectedMood: {
    backgroundColor: "#cdeffd",
  },
  moodText: {
    fontSize: 32,
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  historyTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  historyItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
  clearButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  clearHistoryButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: theme.danger,
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },

  selectedEmojiButton: {
    borderColor: theme.navyblue,
    backgroundColor: theme.skyblue,
  },
  emoji: {
    fontSize: 30,
  },
  moodHistoryContainer: {
    marginTop: 20,
    flex: 1,
  },
  moodHistoryContent: {
    paddingBottom: 50,
  },
  moodCard: {
    backgroundColor: theme.skyblue,
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  moodEmoji: {
    fontSize: 28,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  moodDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  customMoodButton: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  customMoodButtonText: {
    fontSize: 16,
    color: "#333",
  },
  customInputContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  saveCustomMoodButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  saveCustomMoodButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
  },
  emojiButton: {
    marginTop: 20,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  moodText: {
    fontSize: 24,
  },
  enterButton: {
    width: "100%",
    padding: 15,
    backgroundColor: theme.navy,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  enterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  splashContainer: {
    flex: 1,
    backgroundColor: theme.skyblue,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: theme.teal,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: theme.skyblue,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileButton: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: theme.teal,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
