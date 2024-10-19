const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 7000;
const MONGODB_URI = "mongodb://localhost:27017/musicdb"; // Direct MongoDB URI

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define Song model
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
});

const Song = mongoose.model("Song", songSchema);

// Get all songs
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// Add a new song
app.post("/api/songs", async (req, res) => {
  const { title, artist, url } = req.body;
  const newSong = new Song({ title, artist, url });
  try {
    const savedSong = await newSong.save();
    res.json(savedSong);
  } catch (error) {
    res.status(500).json({ error: "Failed to add song" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
