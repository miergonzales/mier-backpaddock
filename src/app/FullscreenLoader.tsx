import CircularProgress from "@mui/material/CircularProgress";

export function FullScreenLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress color="secondary" aria-label="Loading…" />
    </div>
  );
}
