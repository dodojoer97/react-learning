// React
import type { FC } from "react"

import { useContext, useEffect } from "react"

// Translation
import { useTranslation } from "react-i18next"

// Components
import Layout from "@/components/UI/Layout"

const Settings: FC = () => {
	const { t } = useTranslation("settings")

	return (
		<Layout>
			<div className='mx-auto max-w-lg text-center'>
				<h1 className='text-2xl font-bold sm:text-3xl'>{t("settingsTitle")}</h1>

			</div>
		</Layout>
	)
}

export default Settings