import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import NavigationBar from "./../components/NavigationBar";
import SideBar from "../components/SideBar";
import ProductList from "../components/product/ProductList";
import LoginModal from "../components/modals/LoginModal";
import authHelper from "../helpers/auth.helper";
import { authState, loginWithJWT, refreshUser } from "../slices/auth/authSlice";
import { ROLES } from "../constants/roles";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(authState);

  useEffect(() => {
    const jwt = authHelper.getJwt();
    if (jwt) dispatch(refreshUser());
  }, []);

  return (
    <main>
      <NavigationBar />
      <Container className="mb-5">
        <ProductList />
      </Container>

      {auth.isAuthenticated && auth.currentUser.role.name === ROLES.BUYER && (
        <SideBar />
      )}

      <LoginModal />
    </main>
  );
}

export default App;
