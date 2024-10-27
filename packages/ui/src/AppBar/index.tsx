"use client"
import {  signOut } from "next-auth/react";
import { GradientButton } from "../GradientButton";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
// import proifile_temp from "@assets/images/user_default.png"
import { usePathname, useRouter } from "next/navigation";

export function NavBar({session}:any) {

  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname === path;


  return (
    <Navbar
    classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-secondary",
      ],
    }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">NOTES</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isActive("/courses")} className="data-[active]:text-secondary font-normal data-[active]:font-normal">
          <Link href="/courses">
            Courses
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/mynotes")} className="data-[active]:text-secondary font-normal data-[active]:font-normal">
          <Link href="/mynotes" aria-current="page">
            My Notes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-gray-700" href="#">
            Coming soon...
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

            <DropdownItem key="courses" className="sm:hidden sm:collapse" href="/courses"> Courses</DropdownItem>
            <DropdownItem key="mynotes" className="sm:hidden sm:collapse" href="/mynotes">My Notes</DropdownItem>

            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={()=>{signOut()}}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <div className="flex gap-5">
            <GradientButton title={"Login"} onClick={()=>router.push("/login")}/>
            <GradientButton title={"Signup"} onClick={()=>router.push("/register")}/>
        </div>}
      </NavbarContent>
    </Navbar>
  );
}