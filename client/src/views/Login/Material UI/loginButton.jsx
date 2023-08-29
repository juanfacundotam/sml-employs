import * as React from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "#ae2dff",
          "&:hover": {
            borderColor: "#a020f0",
          },
        }}
      >
        Ingresar
      </Button>
    </Stack>
  );
}
