import { useState } from "react"
import Output from "./Output"

const Greeting = () => {
    const [changedText, setChangedText] = useState(false)

    const changedTextHandler = () => {
        setChangedText(true)
    }
   return (
        <div>
            <h2>Hello World</h2>
            {!changedText 
                &&
                <Output>it's good to see you</Output>
            }
            {changedText 
                &&
                <Output>Changed!</Output>
            }
            <button onClick={changedTextHandler}>
                Change text!
            </button>
        </div>
    )
}

export default Greeting