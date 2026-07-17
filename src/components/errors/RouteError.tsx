import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import WarningAmber from "@mui/icons-material/WarningAmber";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

export default function RouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Route error:", error);

  let title = "Unexpected Application Error";
  let description = "Something went wrong while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description =
      typeof error.data === "string"
        ? error.data
        : "The requested page could not be loaded.";
  } else if (error instanceof Error) {
    description = error.message;
  }

  const handleReload = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={6}
          sx={{
            width: "100%",
            textAlign: "center",
            borderRadius: 3,
            p: 3,
          }}
        >
          <CardContent>
            <WarningAmber
              sx={{
                fontSize: 80,
                color: "warning.main",
                mb: 2,
              }}
            />

            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
              {title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {description}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="warning"
                startIcon={<RefreshIcon />}
                onClick={handleReload}
              >
                Reload
              </Button>

              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={handleHome}
              >
                Go Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
