"use client"
import {Button} from "@nextui-org/button";

type GradientButtonProps = {
  onClick? : (e:any) => void
  title : string
  type?: "submit" | "button" | "reset" | undefined
}
export function GradientButton({title,onClick,type="submit"}: GradientButtonProps) {
  return (
    <Button radius="full" 
    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
    onClick={onClick}
    type={type}
    >
      {title}
    </Button>
  );
}