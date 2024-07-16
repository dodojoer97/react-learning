// Interface
import {ICategory} from "./Category.d"

class Category implements ICategory {
    image: string;
    name: string;
    constructor(image: string, name: string) {
        this.image = image,
        this.name = name
    }
}

export default Category