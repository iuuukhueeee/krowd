import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { browserRouter } from "./router";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <RouterProvider router={browserRouter} />
    </MantineProvider>
  );
}

export default App;
