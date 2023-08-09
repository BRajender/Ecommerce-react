import "./App.css";
//pages
import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Login";

import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//context
import { UserContextProvider } from "./context";
//components
import { RequireAuth, PrivateRoute } from "./components/route_protecters";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/category" exact element={<Category />} />
          <Route
            path="/cart"
            exact
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route path="/signup" exact element={<Signup />} />
          <Route
            path="/admin/dashboard"
            exact
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
