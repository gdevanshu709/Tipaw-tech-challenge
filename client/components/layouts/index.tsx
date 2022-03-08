// components/layout.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../context/state';

interface IProps {
  children: any;
}

export default function Layout({ children }: IProps) {
  const { user, logout } = useAuth();
  return (
    <div className="col" id="nav">
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user && (
                <>
                  <Link href="/" passHref>
                    <button
                      type="button"
                      className="btn btn-sm"
                      id="nav-sighup"
                    >
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/login" passHref>
                    <button type="button" className="btn btn-sm" id="nav-login">
                      Login
                    </button>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <Link href="/dashboard" passHref>
                    <button type="button" className="btn btn-sm">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>{children}</main>
    </div>
  );
}
