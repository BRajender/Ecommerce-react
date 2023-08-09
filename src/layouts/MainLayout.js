import React from "react";
import { DefaultNavbar, Footer } from "../components/navigation";
import {Container} from "react-bootstrap"

function MainLayout({ children }) {
  return (
    <>
      <DefaultNavbar />
      <Container className="children-wrapper">{children}</Container>

      <Footer />
    </>
  );
}

export default MainLayout;
