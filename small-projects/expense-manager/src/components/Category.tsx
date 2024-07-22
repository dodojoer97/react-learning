// React
import {FC} from "react"

// Models
import Category from "@/models/Category"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface ICategoryProps {
    category: Category
}

const CategoryComp: FC<ICategoryProps> = ({category}) => {
    return <>
        <article className="flex justify-between">
            <FontAwesomeIcon icon={category.icon}/>
            <p>{category.name}</p>
        </article>
    </>
}

export default CategoryComp