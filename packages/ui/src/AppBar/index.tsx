"use client"
import { signIn, signOut } from "next-auth/react";
import { GradientButton } from "../GradientButton";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import proifile_temp from "@assets/images/user_default.png"

export function NavBar({session}:any) {

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">NOTES</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="text-foreground"  href="#">
            Courses
          </Link>
        </NavbarItem>
        <NavbarItem isActive >
          <Link href="#" aria-current="page" className="text-secondary">
            My Notes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-foreground" href="#">
            Create Course
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {session ? <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="../../assets/user_default.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session.user.username}</p>
            </DropdownItem>
            <DropdownItem key="settings" on>My Settings</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={()=>{signOut()}}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <div>
            <GradientButton title={"Login"} onClick={() => signIn()}/>
            <GradientButton title={"Signup"}/>
        </div>}
      </NavbarContent>
    </Navbar>
  );
}