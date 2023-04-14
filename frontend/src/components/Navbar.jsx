import React from "react";
import { Button, Navbar as BootstrapNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

const Navbar = () => {
  const { logOut, user } = useUserContext();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Hexlet Chat</BootstrapNavbar.Brand>
        {!!user && <Button onClick={logOut}>Выйти</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
