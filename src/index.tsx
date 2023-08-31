import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import { defaultMode } from "./theme";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={defaultMode}>
      <App />
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
