import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function UserRating({ rating }) {
  return (
    <Box display="flex" alignItems="center">
      <Rating name="user-rating" value={rating} readOnly max={3} />
    </Box>
  );
}

export default UserRating;
