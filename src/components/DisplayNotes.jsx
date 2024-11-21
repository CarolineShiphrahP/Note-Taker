import { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Select,
  MenuItem,
  Fab,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReuseNote from "./ReuseNote";
import NewNote from "./NewNote";
import NoteImage from "../assets/note.png";
import ModifyNote from "./ModifyNote";
import SearchIcon from "@mui/icons-material/Search";

function DisplayNotes() {
  const notes = useSelector((state) => state.notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSort = (e) => setSortOrder(e.target.value);

  const handleOpenDialog = (note) => {
    setSelectedNote(note);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedNote(null);
    setDialogOpen(false);
  };

  const filteredNotes = notes.filter((note) => {
    // Check if the current sort order is "locked"
    if (sortOrder === "locked") {
      return note.password; // Only include locked notes
    }
    // Otherwise, apply the search term filter
    return note.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOrder === "recent") return b.id - a.id;
    if (sortOrder === "oldest") return a.id - b.id;
    if (sortOrder === "alphabetical") return a.title.localeCompare(b.title);
    if (sortOrder === "locked") {
      // Show locked notes first
      if (a.password && !b.password) return -1;
      if (!a.password && b.password) return 1;
      return 0; // Maintain existing order for notes with same lock state
    }
  });

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: 3 }}
      >
        <img
          src={NoteImage}
          alt="Note Icon"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Note Taker
        </Typography>
      </Box>

      {/* Search & Sort */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: 3 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginBottom: 2 }}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              flexGrow: 1,
              maxWidth: "700px",
              width: "100%",
              marginRight: 1,
              marginBottom: 1,
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon sx={{ color: "#00B4D8" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Select
            value={sortOrder}
            onChange={handleSort}
            size="small"
            sx={{
              minWidth: "150px",
              marginBottom: 1,
              backgroundColor: "#fff",
              borderRadius: "5px",
              marginLeft: 1,
            }}
          >
            <MenuItem value="recent">Recent Notes</MenuItem>
            <MenuItem value="oldest">Oldest Notes</MenuItem>
            <MenuItem value="alphabetical">Alphabetically</MenuItem>
            <MenuItem value="locked">Locked Notes</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Notes Grid */}
      {sortedNotes.length > 0 ? (
        <Grid container spacing={2}>
          {sortedNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <ReuseNote note={note} onClick={() => handleOpenDialog(note)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          component="p"
          sx={{
            textAlign: "center",
            marginTop: 4,
            color: "white",
          }}
        >
          {sortOrder === "locked"
            ? "No Locked Notes Found 🤫"
            : "No Notes Found 🤷🏻‍♀️"}
        </Typography>
      )}

      {/* Add Note Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#0c666e",
          "&:hover": { backgroundColor: "#0097A7" },
        }}
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon sx={{ color: "#fff" }} />
      </Fab>

      {/* Add Note Dialog */}
      <NewNote
        open={isDialogOpen && !selectedNote}
        onClose={handleCloseDialog}
      />

      {selectedNote && (
        <ModifyNote
          open={isDialogOpen && selectedNote !== null}
          onClose={handleCloseDialog}
          note={selectedNote}
        />
      )}
    </Box>
  );
}

export default DisplayNotes;
