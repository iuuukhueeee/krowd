import { RouterProvider } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { browserRouter } from "./router";

import "./index.scss";

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: false,
    // refetchOnWindowFocus: false,
    // retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

function App() {
  const _cld = new Cloudinary({ cloud: { cloudName: "due5voxrj" } });

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE !== "test" && <ReactQueryDevtools position="bottom-right" />}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <RouterProvider router={browserRouter} fallbackElement={<h1>Loading</h1>} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
