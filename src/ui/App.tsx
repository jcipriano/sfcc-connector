import { Surfaces } from "@netlify/sdk/ui/react";
import { SurfaceRouter, SurfaceRoute } from "@netlify/sdk/ui/react/components";
import { ConnectConfiguration } from "./surfaces/ConnectConfiguration.jsx";

export const App = () => (
  <SurfaceRouter>
    <SurfaceRoute surface={Surfaces.ConnectConfiguration}>
      <ConnectConfiguration />
    </SurfaceRoute>
  </SurfaceRouter>
);