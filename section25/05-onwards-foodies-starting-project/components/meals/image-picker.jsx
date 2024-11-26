"use client"
import { useRef, useState } from "react"
import classes from "./image-picker.module.css"
import Image from "next/image"

export default function ImagePicker({label}) {
    const [pickedImage, setPickedImage] = useState()

    const inputRef = useRef()
    
    function handlePickClick() {
        inputRef.current.click()
        console.log(inputRef.current.value)
    }

    function handleImageChange(e) {
        const file = e.target.files[0]

        if(!file) return

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }

        fileReader.readAsDataURL(file)

    }
    
    return <div className={classes.picker}>
        <label htmlFor="image">{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>Noimage</p>}
                {pickedImage && <Image src={pickedImage} alt="Selected" fill/>}
            </div>
            <input onChange={handleImageChange} ref={inputRef} className={classes.input} type="file" name="image" id="image" accept="image/png, image/jpeg"/>
            <button onClick={handlePickClick} className={classes.button} type="button">Pick An image</button>
        </div>
    </div>
}