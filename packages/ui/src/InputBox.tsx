import {Input} from "@nextui-org/input";
import { UseFormRegister } from "react-hook-form";

type InputBoxProps = {
    type: string;
    label: string;
    placeholder?: string;
    value : string | number | File | undefined
    name? : string
    id? : string
    onChange : (e:React.ChangeEvent<HTMLInputElement>) => void
    register?: UseFormRegister<any>;
}
export const InputBox =({type="text",label,placeholder,value,name,id,onChange,register} : InputBoxProps) =>{
    return (
        <Input
            type={type}
            label = {label}
            placeholder = {placeholder}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            {...register}
            />
    )

}