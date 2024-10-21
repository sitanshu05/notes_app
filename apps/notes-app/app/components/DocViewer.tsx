import DocViewer from "react-doc-viewer"

export function DocRenderer({link} : {link : string }){

    const document = [
       { uri : "https://drive.google.com/file/d/13EHvYi1XuF0ZggEIRB2S7IpdifdYS5aD/view?usp=drive_link" }
    ]

    return <DocViewer
        documents={document}
        />
}