// React
import type { FC } from "react";

import { useContext, useEffect } from "react";

// Translation
import { useTranslation } from "react-i18next";

// Components
import Layout from "@/components/UI/Layout";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

const Settings: FC = () => {
	const { t } = useTranslation("settings");

	return (
		<Layout>
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">{t("categoriesTitle")}</h1>
			</div>
			<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4"></Form>
		</Layout>
	);
};

export default Settings;
