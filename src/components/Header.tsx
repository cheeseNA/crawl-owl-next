import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export const Header = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit text-lg">Crawl Owl</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="default" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
