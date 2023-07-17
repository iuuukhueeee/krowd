import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { browserRouter } from "./router";

const queryConfig: DefaultOptions = {
  queries: {
    // useErrorBoundary: false,
    // refetchOnWindowFocus: false,
    // retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE !== "test" && <ReactQueryDevtools position="bottom-right" />}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <RouterProvider router={browserRouter} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
