import React from "react";
import { Container } from "react-bootstrap";

import NavigationBar from "./../components/NavigationBar";
import SideBar from "../components/SideBar";
import ProductList from "../components/product/ProductList";

function App() {
  return (
    <main>
      <NavigationBar />

      <Container className="mb-5">
        <ProductList />
      </Container>

      <SideBar />
    </main>
  );
}

export default App;
