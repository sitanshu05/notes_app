import {Button} from "@nextui-org/button";

type GradientButtonProps = {
  onClick? : (e:any) => void
  title : string
}
export function GradientButton({title,onClick}: GradientButtonProps) {
  return (
    <Button radius="full" 
    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
    onClick={onClick}
    type="submit"
    >
      {title}
    </Button>
  );
}