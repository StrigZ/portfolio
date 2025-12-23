"use client";

import { Lightbulb, LightbulbOff } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

type Props = {
	className?: string;
};
export function ThemeButton({ className }: Props) {
	const { setTheme, theme } = useTheme();
	const isDarkTheme = theme === "dark";

	const handleClick = () => setTheme(isDarkTheme ? "light" : "dark");

	return (
		<Button
			className={cn(className)}
			onClick={handleClick}
			size="icon"
			variant="outline"
		>
			<Lightbulb className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
			<LightbulbOff className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
