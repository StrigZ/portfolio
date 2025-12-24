"use client";

import { useContentProvider } from "~/app/(frontend)/_providers/content-provider";
import { cn } from "~/lib/utils";
import use3DCarousel from "../../../_hooks/use-3d-carousel";
import CarouselNavButtons from "../../CarouselNavButtons";
import PayloadMedia from "../../PayloadMedia";
import Project from "../../Project/Project";

const ANIMATION_DURATION_IN_MS = 1000;

export type Props = {
	radius: string;
	className?: string;
};

export default function ThreeDCarousel({ className, radius }: Props) {
	const { projects } = useContentProvider();

	const {
		handlers,
		selectedIndex,
		getContainerStyle,
		getSlideStyle,
		next,
		prev,
		normalizeIndex,
		updateSelectedIndex,
		updateRotationIndex,
		handleInteractionEnd,
		handleInteractionStart,
	} = use3DCarousel({
		totalSlides: projects.length,
		shouldAutoRotate: true,
		radius,
		animationDuration: ANIMATION_DURATION_IN_MS,
	});

	return (
		<div
			className={cn(
				"relative flex touch-none select-none flex-col gap-4",
				className,
			)}
		>
			<div
				className="transform-3d pointer-events-none absolute inset-x-0 top-0"
				{...handlers}
			>
				<ul
					className="transform-3d pointer-events-none absolute inset-x-0 top-0 transition-transform"
					style={{
						...getContainerStyle(),
						transitionDuration: `${ANIMATION_DURATION_IN_MS}ms`,
					}}
				>
					{projects.map((project, index) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <I don't see a way to implement this logic with keyboard>
						<li
							className={cn(
								"group pointer-events-auto absolute aspect-4/3 overflow-hidden rounded-md border-2 shadow-sm",
								{
									"cursor-pointer": index !== selectedIndex,
								},
							)}
							key={project.id}
							onClick={() => {
								updateRotationIndex(index);
								updateSelectedIndex(index);
							}}
							style={{
								...getSlideStyle(index),
								left: "calc(50% - (var(--slide-width) / 2))",
								width: "var(--slide-width)",
							}}
						>
							<PayloadMedia
								className="object-cover"
								hasBlur
								media={project.coverImage}
							/>
							{/** biome-ignore lint/a11y/noStaticElementInteractions: <false positive> */}
							<div
								className={cn(
									"absolute inset-0 select-none bg-black/70 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100",
									{
										"pointer-events-none **:overflow-hidden": ![
											normalizeIndex(selectedIndex - 1),
											selectedIndex,
											normalizeIndex(selectedIndex + 1),
										].includes(index),
									},
								)}
								onFocus={handleInteractionStart}
								onMouseLeave={handleInteractionEnd}
								onMouseOver={handleInteractionStart}
							>
								<Project className="h-full" project={project} />,
							</div>
						</li>
					))}
				</ul>
			</div>
			<CarouselNavButtons
				className="pointer-events-none absolute inset-x-0 bottom-2 w-full justify-between gap-6"
				onNext={next}
				onPrev={prev}
			/>
		</div>
	);
}
