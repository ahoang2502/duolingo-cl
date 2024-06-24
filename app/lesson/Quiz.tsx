"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Confetti from "react-confetti";
import { useAudio, useWindowSize, useMount } from "react-use";
import { toast } from "sonner";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { challengeOptions, challenges } from "@/db/schema";
import { MAX_HEARTS, POINTS_PER_CHALLENGE } from "@/lib/constants";
import { useHeartsModal } from "@/store/useHeartsModal";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { QuestionBubble } from "./QuestionBubble";
import { ResultCard } from "./ResultCard";
import { usePracticeModal } from "@/store/usePracticeModal";

type Props = {
	initialLessonId: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	initialHearts: number;
	initialPercentage: number;
	userSubscription: any;
};

export const Quiz = ({
	initialHearts,
	initialLessonChallenges,
	initialLessonId,
	initialPercentage,
	userSubscription,
}: Props) => {
	const [pending, startTransition] = useTransition();
	const router = useRouter();
	const { width, height } = useWindowSize();

	const { open: openHeartsModal } = useHeartsModal();
	const { open: openPracticeModal } = usePracticeModal();

	useMount(() => {
		if (initialPercentage === 100) {
			openPracticeModal();
		}
	});

	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(() => {
		return initialPercentage === 100 ? 0 : initialPercentage;
	});
	const [lessonId] = useState(initialLessonId);

	const [challenges] = useState(initialLessonChallenges);
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);

		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number>();
	const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

	// Audio
	const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
	const [incorrectAudio, _i, incorrectControls] = useAudio({
		src: "/incorrect.wav",
	});
	const [finishAudio] = useAudio({
		src: "/finish.mp3",
		autoPlay: true,
	});

	const challenge = challenges[activeIndex];
	const options = challenge?.challengeOptions ?? [];

	const onSelect = (id: number) => {
		if (status !== "none") return;

		setSelectedOption(id);
	};

	const onNextQuestion = () => {
		setActiveIndex((current) => current + 1);
	};

	const onContinue = () => {
		if (!selectedOption) return;

		if (status === "wrong") {
			setStatus("none");
			setSelectedOption(undefined);
			return;
		}

		if (status === "correct") {
			onNextQuestion();

			setStatus("none");
			setSelectedOption(undefined);
			return;
		}

		const correctOption = options.find((option) => option.correct);

		if (!correctOption) return;

		if (correctOption.id === selectedOption) {
			startTransition(() => {
				upsertChallengeProgress(challenge.id)
					.then((res) => {
						if (res?.error === "hearts") {
							openHeartsModal();
							return;
						}

						correctControls.play();
						setStatus("correct");
						setPercentage((prev) => prev + 100 / challenges.length);

						// This is a practice
						if (initialPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, MAX_HEARTS));
						}
					})
					.catch(() => toast.error("Something went wrong, please try again!"));
			});
		} else {
			startTransition(() => {
				reduceHearts(challenge.id)
					.then((res) => {
						if (res?.error === "hearts") {
							openHeartsModal();
							return;
						}

						incorrectControls.play();
						setStatus("wrong");

						if (!res?.error) {
							setHearts((prev) => Math.max(prev - 1, 0));
						}
					})
					.catch(() => toast.error("Something went wrong, please try again!"));
			});
		}
	};

	if (!challenge)
		return (
			<>
				{finishAudio}
				<Confetti
					recycle={false}
					numberOfPieces={500}
					tweenDuration={10000}
					width={width}
					height={height}
				/>

				<div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
					<Image
						alt="finish"
						src="/finish.svg"
						className="hidden lg:block"
						height={100}
						width={100}
					/>
					<Image
						alt="finish"
						src="/finish.svg"
						className="block lg:hidden"
						height={50}
						width={50}
					/>

					<h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
						Great job! <br />
						You&apos;ve completed the lesson
					</h1>

					<div className="flex items-center gap-x-4 w-full">
						<ResultCard
							variant="points"
							value={challenges.length * POINTS_PER_CHALLENGE}
						/>
						<ResultCard variant="hearts" value={hearts} />
					</div>
				</div>

				<Footer
					lessonId={lessonId}
					status="completed"
					onCheck={() => router.push("/learn")}
				/>
			</>
		);

	const title =
		challenge.type === "ASSIST"
			? "Select the correct meaning"
			: challenge.question;

	return (
		<>
			{incorrectAudio}
			{correctAudio}
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>

			<div className="flex-1 ">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
						<h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
							{title}
						</h1>

						<div className="">
							{challenge.type === "ASSIST" && (
								<QuestionBubble question={challenge.question} />
							)}

							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={pending}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>

			<Footer
				disabled={pending || !selectedOption}
				status={status}
				onCheck={onContinue}
			/>
		</>
	);
};
