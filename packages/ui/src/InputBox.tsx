import {Input} from "@nextui-org/input";

type InputBoxProps = {
    type: string;
    label: string;
    placeholder?: string;
    value : string
    name? : string
    id? : string
    onChange : (e:React.ChangeEvent<HTMLInputElement>) => void
}
export const InputBox =({type,label,placeholder,value,name,id,onChange} : InputBoxProps) =>{
    return (
        <Input
            type={type}
            label = {label}
            placeholder = {placeholder}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            />
    )

}