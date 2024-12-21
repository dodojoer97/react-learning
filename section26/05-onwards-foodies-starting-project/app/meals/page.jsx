import Link from "next/link"
import classes from "./page.module.css"


import MealsGrid from "@/components/meals/meals-grid"
import Loader from "./loader"

// Data
import { getMeals } from "@/lib/meals"
import { Suspense } from "react"

async function Meals () {
    const meals = await getMeals()
    return <MealsGrid meals={meals}/>

}

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
            <Suspense fallback={<Loader />}>
                <Meals />
            </Suspense>
        </main>
    </>
}