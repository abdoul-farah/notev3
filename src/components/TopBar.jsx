import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { update } from "../store/index.jsx";
import { useDispatch, useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.searchInput);
  const location = useLocation();

  const inCreatePage = location.pathname === "/create";
  return (
    <Box>
      <AppBar position="fixed" sx={{ boxShadow: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },

            paddingBlock: "10px",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
            }}
            onClick={() => {
              navigate("/");
              dispatch(update(""));
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginRight: "20px",
              }}
            >
              TakeNote
            </Typography>
          </Box>

          {!inCreatePage && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e) => dispatch(update(e.target.value))}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default TopBar;
