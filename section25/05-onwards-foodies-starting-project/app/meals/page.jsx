import Link from "next/link"
import classes from "./page.module.css"


import MealsGrid from "@/components/meals/meals-grid"

export default function MealsPage() {
    return <>
        <header className={classes.header}>
            <h1>Meals <span className={classes.highlight}>teext</span></h1>
            <p>Lorem, ipsum.</p>
            <p className={classes.cta}>
                <Link href="/meals/share">
                    Lorem ipsum dolor sit.
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            <MealsGrid meals={[]}/>
        </main>
    </>
}