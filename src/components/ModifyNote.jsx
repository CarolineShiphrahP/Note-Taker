import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote, deleteNote } from "../redux/notesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ModifyNote = ({ open, onClose, note }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setPassword(note.password || "");
    }
  }, [note]);

  const handleSave = () => {
    if (!title || !content) {
      setError(true);
      return;
    }

    dispatch(
      updateNote({
        id: note.id,
        title,
        content,
        password: password || null,
        date: new Date().toLocaleString(),
      })
    );

    setIsEditing(false);
    setContent("");
    setTitle("");
    setError(false);
    setPassword("");
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {isEditing ? (
        <>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={error && !title}
              helperText={error && !title ? "Title is required" : ""}
            />

            <TextField
              label="Description"
              fullWidth
              margin="dense"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={error && !content}
              helperText={error && !content ? "Description is required" : ""}
            />

            {!note.password && (
              <TextField
                label="Password"
                margin="dense"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="success">
              Save
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>{note.title}</DialogTitle>
          <DialogContent>
            <p>{note.content}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              variant="contained"
              color="success"
            >
              Edit
            </Button>
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ModifyNote;
