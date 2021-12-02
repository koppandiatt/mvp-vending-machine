import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";

import NavigationBar from "./../components/NavigationBar";
import SideBar from "../components/SideBar";
import ProductList from "../components/product/ProductList";
import LoginModal from "../components/modals/LoginModal";
import authHelper from "../helpers/auth.helper";
import { loginWithJWT } from "../slices/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = authHelper.getUserData();
    if (user) dispatch(loginWithJWT(user));
  }, []);

  return (
    <main>
      <NavigationBar />
      <Container className="mb-5">
        <ProductList />
      </Container>
      <SideBar />

      <LoginModal />
    </main>
  );
}

export default App;
