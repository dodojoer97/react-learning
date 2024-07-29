// React
import type { FC } from "react";
import { useState, useContext } from "react";

// Store
import { SettingsContext } from "@/store/SettingsContext";

// Copmonents
import Form from "@/components/UI/Form";
import IconSelector from "./IconSelector";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import InputError from "@/components/UI/InputError";

// Hooks
import useInput from "@/hooks/useInput";

const AddCategoryForm: FC = () => {
	const settingsCTX = useContext(SettingsContext);

	return (
		<Form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
			<IconSelector onSelect={(iconName) => console.log("select: ", iconName)} />
		</Form>
	);
};

export default AddCategoryForm;
