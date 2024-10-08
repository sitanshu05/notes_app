import {Card , CardHeader, CardBody, CardFooter} from "@nextui-org/card";

type CardProps = {
    title : string
    text : string
}
export const CourseCard = ({title,text}: CardProps) => {
    return (
        <Card isPressable className="max-w-64 w-full" >
            <CardHeader className="w-full flex justify-center">
               <p>{title}</p> 
            </CardHeader>
            <CardBody className=" text-center">
                <p>{text}</p>
            </CardBody>
        </Card>
    )
}