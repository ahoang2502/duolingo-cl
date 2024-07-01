import { Datagrid, List, NumberInput, ReferenceInput, required, TextField } from "react-admin";

export const LessonList = () => {
	return (
		<List>
			<Datagrid rowClick="edit">
				<TextField source="id" />
				<TextField source="title" />

				<ReferenceInput source="unitId" reference="units" />
				<NumberInput source="order" validate={[required()]} label="Order" />
			</Datagrid>
		</List>
	);
};
