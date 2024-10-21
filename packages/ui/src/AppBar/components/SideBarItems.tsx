import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { signOut } from "next-auth/react";
import { GradientButton } from "@repo/ui";
import { NavbarContent } from "@nextui-org/navbar";

export const SideBarItems = ({session}: {session : any}) => {

    return(
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
              src="../../../assets/user_default.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
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
            <GradientButton title={"Login"}/>
            <GradientButton title={"Signup"}/>
        </div>}
      </NavbarContent>
    )
}