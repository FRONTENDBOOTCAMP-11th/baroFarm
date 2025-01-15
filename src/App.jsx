import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "@/routes";
import { HelmetProvider } from "react-helmet-async";

import Spinner from "@components/Spinner";
function App() {
  return (
    <>
      <HelmetProvider>
        <Suspense fallback={<Spinner />}>
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </Suspense>
      </HelmetProvider>
    </>
  );
}

export default App;
