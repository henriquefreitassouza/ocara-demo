/*import React, { useEffect } from "react";*/
import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "contexts";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  /*useEffect(() => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });

      console.log('cache cleared!');
    }
  }, []);*/
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Router />
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
