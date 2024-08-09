import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export type CategoryType = "expense" | "income";
interface ICategory {
    icon: string | IconDefinition;
    name: string;
    id: string;
    type: CategoryType;
}
export declare class Category implements ICategory {
    icon: string | IconDefinition;
    name: string;
    id: string;
    type: CategoryType;
    constructor(icon: string | IconDefinition, name: string, id: string, type: CategoryType);
}
export {};
//# sourceMappingURL=Category.d.ts.map