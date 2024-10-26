"use client"
import {Button} from "@nextui-org/button";

type GradientButtonProps = {
  onClick? : (e:any) => void
  title : string
  type?: "submit" | "button" | "reset" | undefined
  loading? : boolean
}
export function GradientButton({title,onClick,type="submit", loading = false}: GradientButtonProps) {
  return (
    <Button radius="medium" 
    className="bg-gradient-to-tr from-purple-400 to-violet-950 text-white shadow-lg "
    onClick={onClick}
    type={type}
    isLoading = {loading}
    >
      {title}
    </Button>
  );
}