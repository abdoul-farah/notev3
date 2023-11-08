import "./App.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import Root from "./pages/Root";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Error404 from "./pages/Error404";
import ErrorCreate from "./pages/ErrorCreate";

import CssBaseline from "@mui/material/CssBaseline";
import { loader as loaderNotes } from "./pages/Notes";
// import { action as actionCreateNote } from "./pages/Create";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error404 />}>
      <Route index element={<Notes />} loader={loaderNotes} />
      <Route
        path="create"
        element={<Create />}
        // action={actionCreateNote}
        // errorElement={<ErrorCreate />}
      />
    </Route>
  )
);
let theme = createTheme({
  palette: {
    primary: {
      main: "#0A4D68",
    },
    secondary: {
      main: "#088395",
    },
    mode: "light",
  },
});

theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
