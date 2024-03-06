import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-4">
			<Button>Default</Button>

			<Button variant="primary">Primary</Button>

			<Button variant="primaryOutline">Primary Outline</Button>

			<Button variant="secondary">Secondary</Button>

			<Button variant="secondaryOutline">Secondary Outline</Button>

			<Button variant="danger">Danger</Button>

			<Button variant="dangerOutline">Danger Outline</Button>

			<Button variant="super">Super</Button>

			<Button variant="superOutline">Super Outline</Button>

			<Button variant="ghost">Ghost</Button>

			<Button variant="sidebar">Sidebar</Button>

			<Button variant="sidebarOutline">Sidebar Outline</Button>
		</div>
	);
}
