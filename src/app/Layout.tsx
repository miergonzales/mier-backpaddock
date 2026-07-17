import Box from "@mui/material/Box";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { FullScreenLoader } from "./FullscreenLoader";

export default function Layout() {
  return (
    <Box className="flex min-h-screen">
      {/* Main content wrapper */}
      <Box className="flex flex-col flex-1 pt-16" sx={{ minWidth: 0 }}>
        <Box component="main" className="flex-1 p-4" sx={{ minWidth: 0 }}>
          <Suspense fallback={<FullScreenLoader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
