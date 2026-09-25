import { Header } from "./components/header/Header";
import { Store } from "./pages/store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Checkout } from "./components/checkout/Checkout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
      <Store></Store>
      <Checkout></Checkout>
    </QueryClientProvider>
  );
}

export default App;
