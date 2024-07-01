"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { CourseCreate } from "../course/Create";
import { CourseEdit } from "../course/Edit";
import { CourseList } from "../course/List";
import { UnitCreate } from "../unit/Create";
import { UnitEdit } from "../unit/Edit";
import { UnitList } from "../unit/List";

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
				edit={CourseEdit}
			/>
			<Resource
				name="units"
				recordRepresentation="title"
				list={UnitList}
				create={UnitCreate}
				edit={UnitEdit}
			/>
		</Admin>
	);
};

export default App;
