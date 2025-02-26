import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./Pages/Home.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import AddTask from "./Pages/AddTask.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import UpdateTask from "./Pages/UpdateTask.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}></Route>
                <Route path="/signIn" element={<SignIn></SignIn>}></Route>
                <Route path="/signUp" element={<SignUp></SignUp>}></Route>
                <Route
                  path="/add-task"
                  element={
                    <PrivateRoute>
                      <AddTask></AddTask>
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/updateTask/:id" element={<UpdateTask></UpdateTask>} ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
