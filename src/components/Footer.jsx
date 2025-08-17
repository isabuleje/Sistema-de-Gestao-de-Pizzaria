import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      position: "relative",
      bottom: 0,
      left: 0,
      right: 0,
      bgcolor: "primary.main",
      color: "primary.contrastText",
      textAlign: "center",
      py: 1
    }}
  >
    <Typography variant="body2">
      Freedy's Pizzaria — © 2025
    </Typography>
  </Box>
);

export default Footer;


