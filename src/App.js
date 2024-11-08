
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import './App.scss';
import "./styles/variable.scss"
import 'react-toastify/dist/ReactToastify.css';
import {AppRouter} from "./router";
import {AppProvider} from "./context/app-context";
import {Bounce, ToastContainer} from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
      <div className="App light">

          <QueryClientProvider client={queryClient}>
              <AppProvider>
                  <AppRouter/>

              </AppProvider>
          </QueryClientProvider>

          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
          />


      </div>
  );
}

export default App;
