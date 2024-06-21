"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { signInWithGoogle, signOut } from "@/firebase/auth";
import { useUser } from "@/hooks/useUser";

export const Header = () => {
  const user = useUser();

  const handleSignOut = (event: PressEvent) => {
    signOut();
  };

  const handleSignIn = (event: PressEvent) => {
    signInWithGoogle();
  };

  return (
    <Navbar maxWidth="lg">
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">Crawl Owl</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={user.displayName!}
                  size="md"
                  src={user.photoURL!}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  textValue="user name"
                >
                  <p>Signed in as</p>
                  <p className="font-semibold">{user.displayName!}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleSignOut}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button color="default" onPress={handleSignIn} variant="flat">
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
