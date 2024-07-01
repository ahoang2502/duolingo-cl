"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { ChallengeCreate } from "../challenge/create";
import { ChallengeEdit } from "../challenge/edit";
import { ChallengeList } from "../challenge/list";

import { ChallengeOptionCreate } from "../challengeOption/create";
import { ChallengeOptionEdit } from "../challengeOption/edit";
import { ChallengeOptionList } from "../challengeOption/list";

import { CourseCreate } from "../course/Create";
import { CourseEdit } from "../course/Edit";
import { CourseList } from "../course/List";

import { LessonCreate } from "../lesson/Create";
import { LessonEdit } from "../lesson/Edit";
import { LessonList } from "../lesson/List";

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
			<Resource
				name="lessons"
				recordRepresentation="title"
				list={LessonList}
				create={LessonCreate}
				edit={LessonEdit}
			/>
			<Resource
				name="challenges"
				list={ChallengeList}
				create={ChallengeCreate}
				edit={ChallengeEdit}
				recordRepresentation="question"
			/>
			<Resource
				name="challengeOptions"
				list={ChallengeOptionList}
				create={ChallengeOptionCreate}
				edit={ChallengeOptionEdit}
				recordRepresentation="text"
				options={{ label: "Challenge Options" }}
			/>
		</Admin>
	);
};

export default App;
