// React
import {FC} from "react"

// Models
import Category from "@/models/Category"

interface ICategoryProps {
    category: Category
}

const CategoryComp: FC<ICategoryProps> = ({category}) => {
    return <>
        <article className="flex justify-between">
            <img src={category.image} alt="Category image" />
            <p>{category.name}</p>
        </article>
    </>
}

export default CategoryComp