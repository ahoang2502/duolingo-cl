"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { CourseCreate } from "../course/Create";
import { CourseList } from "../course/list";

const dataProvider = simpleRestProvider("/api");

const App = () => {
	return (
		// @ts-ignore
		<Admin dataProvider={dataProvider}>
			<Resource
				name="courses"
				recordRepresentation="title"
				list={CourseList}
                create={CourseCreate}
			/>
		</Admin>
	);
};

export default App;
