import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";

const ReuseNote = ({ note, onClick }) => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [unlock, setUnlock] = useState(false);

  function handlePasswordSubmit() {
    if (note.password && note.password !== enteredPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setOpenPasswordDialog(false);
      setEnteredPassword("");
      //setUnlock(false);
      onClick(); //Shows the note
    }
  }

  return (
    <div>
      <Card>
        <CardContent
          onClick={() => {
            if (note.password && !unlock) {
              setOpenPasswordDialog(true);
            } else {
              onClick();
            }
          }}
          sx={{
            cursor: "pointer",
            position: "relative",
            opacity: note.password && !unlock ? 0.7 : 1, // Dim locked notes
          }}
        >
          {note.password && !unlock && (
            <IconButton
              sx={{
                position: "absolute",
                top: 10,
                right: 20,
                fontSize: "1.5rem",
                color: "#0000FF",
              }}
            >
              <LockIcon sx={{ fontSize: "inherit" }} />
            </IconButton>
          )}

          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {note.password && !unlock
              ? "Locked Note "
              : note.content.length > 95
              ? `${note.content.slice(0, 95)}...`
              : note.content}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {note.date}
          </Typography>
        </CardContent>
      </Card>

      <Dialog
        open={openPasswordDialog}
        onClose={() => {
          setOpenPasswordDialog(false);
          setEnteredPassword("");
          setPasswordError(false);
          setUnlock(false);
        }}
      >
        <DialogTitle>Enter Password to Unlock</DialogTitle>
        <DialogContent>
          <TextField
            label="Password"
            fullWidth
            margin="dense"
            type="password"
            value={enteredPassword}
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
            error={passwordError}
            helperText={passwordError ? "Incorrect Password" : ""}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handlePasswordSubmit}
            variant="contained"
            color="success"
          >
            Unlock
          </Button>
          <Button
            onClick={() => {
              setOpenPasswordDialog(false);
              setEnteredPassword("");
              setPasswordError(false);
              setUnlock(false);
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReuseNote;
