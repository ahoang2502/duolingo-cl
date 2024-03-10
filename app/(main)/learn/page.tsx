import React from "react";

import { StickyWrapper } from "@/components/StickyWrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./Header";
import { UserProgress } from "@/components/UserProgress";

const LearnPage = () => {
	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={{ title: "spanish", imageSrc: "/next.svg" }}
					hearts={5}
					points={100}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>

			<FeedWrapper>
				<Header title="spanish" />
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
