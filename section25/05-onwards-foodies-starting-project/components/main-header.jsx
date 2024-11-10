import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/logo.png"

// Components
import MainHeaderBackground from "./main-header-background"

// CSS
import classes from "./main-header.module.css"

export default function MainHeader() {
	return (
		<>
			<MainHeaderBackground />

			<header className={classes.header}>
				<Link
					href='/'
					className={classes.logo}>
					<Image
						src={logo.src}
						alt='Some alt'
						width={100}
						height={100}
						priority
					/>
				</Link>

				<nav className={classes.nav}>
					<ul>
						<li>
							<Link href='/meals'>Meals</Link>
						</li>
						<li>
							<Link href='/community'>community</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}
