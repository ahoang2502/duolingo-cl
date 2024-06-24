"use client";

import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { refillHearts } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
};

const POINTS_TO_REFILL = 10;

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
	const [pending, startTransition] = useTransition();

	const onRefillHearts = () => {
		if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

		startTransition(() => {
			refillHearts().catch(() =>
				toast.error("Something went wrong, please try again!")
			);
		});
	};

	return (
		<ul className="w-full ">
			<div className="flex items-center w-full p-4 gap-x-4 border-t-2">
				<Image src="/heart.svg" alt="heart" height={60} width={60} />

				<div className="flex-1 ">
					<p className="text-base text-neutral-700 lg:text-xl font-bold">
						Refill hearts
					</p>
				</div>

				<Button
					disabled={hearts === 5 || points < POINTS_TO_REFILL || pending}
					onClick={onRefillHearts}
				>
					{hearts === 5 ? (
						"Full"
					) : (
						<div className="flex items-center">
							<Image src="/points.svg" alt="points" height={20} width={20} />

							<p className="">{POINTS_TO_REFILL}</p>
						</div>
					)}
				</Button>
			</div>
		</ul>
	);
};
