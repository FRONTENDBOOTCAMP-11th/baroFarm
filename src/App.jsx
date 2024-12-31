import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </HelmetProvider>
    </>
  );
}

export default App;
