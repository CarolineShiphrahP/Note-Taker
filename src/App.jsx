import { CssBaseline, Container } from "@mui/material";
import DisplayNotes from "./components/DisplayNotes";
import "./App.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <DisplayNotes />
      </Container>
    </>
  );
};

export default App;
