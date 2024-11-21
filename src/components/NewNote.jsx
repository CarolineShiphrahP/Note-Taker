import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/notesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const NewNote = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) {
      setError(true);
      return;
    }

    dispatch(
      addNote({
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        password,
        date: new Date().toLocaleString(),
      })
    );
    setTitle("");
    setContent("");
    setError(false);
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {" "}
            Title and Description are required!
          </Typography>
        )}

        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);

            if (error) setError(false); //Error Alert
          }}
          error={error && !title.trim()}
          helperText={error && !title.trim() ? "Title is required" : ""}
        />

        <TextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError(false);
          }}
          error={error && !content.trim()}
          helperText={error && !content.trim() ? "Description is required" : ""}
        />

        <TextField
          label="Password"
          margin="dense"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="success"
          disabled={!title.trim() || !content.trim()}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewNote;
