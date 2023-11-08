import { Outlet } from "react-router-dom";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import { useNavigate } from "react-router-dom";

import { update } from "../store/index.jsx";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";

import TopBar from "../components/TopBar.jsx";

function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <TopBar />
      <Container maxWidth="lg" sx={{ marginTop: { xs: "80px", sm: "20px" } }}>
        <Outlet />

        <AddCircleOutlinedIcon
          cursor="pointer"
          color="primary"
          sx={{
            position: "fixed",

            bottom: "20px",
            right: "20px",

            fontSize: "60px",
            transition: "0.3s",
            "&:hover": {
              color: "primary.main",

              transform: "rotate(90deg)",
            },
          }}
          onClick={() => {
            navigate("/create");
            dispatch(update(""));
          }}
        />
      </Container>
    </>
  );
}

export default Root;
