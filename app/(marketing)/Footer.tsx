import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";

export const Footer = () => {
	return (
		<footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
			<div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
				<Button className="w-full" size="lg" variant="ghost">
					<Image
						src="/hr.svg"
						alt="croatian"
						height={32}
						width={32}
						className="mr-4 rounded-md"
					/>
					Croatian
				</Button>
				<Button className="w-full" size="lg" variant="ghost">
					<Image
						src="/es.svg"
						alt="spanish"
						height={32}
						width={32}
						className="mr-4 rounded-md"
					/>
					Spanish
				</Button>
				<Button className="w-full" size="lg" variant="ghost">
					<Image
						src="/fr.svg"
						alt="french"
						height={32}
						width={32}
						className="mr-4 rounded-md"
					/>
					French
				</Button>
				<Button className="w-full" size="lg" variant="ghost">
					<Image
						src="/it.svg"
						alt="italian"
						height={32}
						width={32}
						className="mr-4 rounded-md"
					/>
					Italian
				</Button>
				<Button className="w-full" size="lg" variant="ghost">
					<Image
						src="/jp.svg"
						alt="japanese"
						height={32}
						width={32}
						className="mr-4 rounded-md"
					/>
					Japanese
				</Button>
			</div>
		</footer>
	);
};
