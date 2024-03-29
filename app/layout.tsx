import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import "./globals.css";
import { ExitModal } from "@/components/modals/ExitModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Lingo",
	description: "Learn new languages with Lingo",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={font.className}>
					<Toaster />
					<ExitModal />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
