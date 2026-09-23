
import './App.css'
import { Header } from './components/header/Header'
import { Store } from './pages/store/Store'
import "normalize.css"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"


const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
      <Store></Store>
    </QueryClientProvider>
  )
}

export default App
