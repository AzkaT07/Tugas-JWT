import { useEffect, useState } from "react"

export default function Form() {
    const [text, setText] = useState('Insert Text');

    useEffect(() => {
        console.log('Hello');
    }, []);

    return(
        <>
            <form>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
            </form>
            <p>{text}</p>
        </>
    )
}
