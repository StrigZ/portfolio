"use client";

import { useContentProvider } from "~/app/(frontend)/_providers/content-provider";
import { cn } from "~/lib/utils";
import useSlideRadius from "../../../_hooks/use-slide-radius";
import ThreeDCarousel from "./3DCarousel";
import RotatingHeading from "./RotatingHeading";
import TopSection from "./TopSection";

type Props = { className?: string };
export default function DesktopPage({ className }: Props) {
	const { projects } = useContentProvider();
	const { radius } = useSlideRadius({ len: projects.length });

	return (
		<div className={cn("flex h-full w-full flex-col gap-24", className)}>
			<section className="h-1/2">
				<TopSection className="perspective-distant z-50" />
			</section>
			<section className="flex h-1/2 w-full flex-col">
				<RotatingHeading className="perspective-distant" radius={radius} />
				<ThreeDCarousel
					className="perspective-distant h-full w-full"
					radius={radius}
				/>
			</section>
		</div>
	);
}
