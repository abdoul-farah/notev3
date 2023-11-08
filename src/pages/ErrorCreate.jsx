import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useRouteError } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNote } from "../store/index";
function ErrorCreate() {
  const error = useRouteError();
  const dispatch = useDispatch();
  if (error.status === 500) {
    console.log("error 500");
    // dispatch(createNote());
  } else {
    dispatch(createNote());
  }
  return (
    <div>
      {error && error.data && (
        <Box sx={{ textAlign: "center", marginTop: "200px" }}>
          <Typography variant="h4" color="error">
            {error.data.message}
          </Typography>
          <Typography variant="body1" color="error.light">
            Status : {error.status}
          </Typography>
          <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
        </Box>
      )}
    </div>
  );
}

export default ErrorCreate;
