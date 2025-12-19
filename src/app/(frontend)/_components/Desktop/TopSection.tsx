import { cloneElement } from "react";
import { cn } from "~/lib/utils";
import use3DCarousel from "../../_hooks/use-3d-carousel";
import useSlideRadius from "../../_hooks/use-slide-radius";
// import CarouselNavButtons from "../CarouselNavButtons";
import AboutMe from "./AboutMe";

const SLIDE_WIDTH = "min(66vw, 68rem)";

type Props = { className?: string };
export default function TopSection({ className }: Props) {
	const { radius } = useSlideRadius({
		len: 3,
		slideWidth: SLIDE_WIDTH,
		slideGap: 0,
	});

	const {
		handlers,
		selectedIndex,
		getContainerStyle,
		getSlideStyle,
		normalizeIndex,
	} = use3DCarousel({
		totalSlides: 3,
		radius,
	});

	return (
		<div
			className={cn(
				"perspective-distant relative touch-none select-none",
				className,
			)}
		>
			<div
				className="transform-3d pointer-events-none absolute inset-0"
				{...handlers}
			>
				<ul
					className="transform-3d pointer-events-none absolute inset-0 transition-transform duration-1000"
					style={getContainerStyle()}
				>
					{[<AboutMe key={1} />, <AboutMe key={2} />, <AboutMe key={3} />].map(
						(project, index) => {
							return (
								<li
									className={cn(
										"group pointer-events-auto absolute h-[300px] overflow-hidden rounded-md transition-transform duration-1000",
										{
											"cursor-pointer": index !== selectedIndex,
										},
									)}
									// biome-ignore lint/suspicious/noArrayIndexKey: <asdfas>
									key={index}
									style={{
										...getSlideStyle(index),
										left: `calc(50% - (${SLIDE_WIDTH} / 2))`,
										width: SLIDE_WIDTH,
									}}
								>
									<div
										className={cn(
											"absolute inset-0 select-none border border-red-400 bg-white text-center",
											{
												"pointer-events-none **:overflow-hidden": ![
													normalizeIndex(selectedIndex - 1),
													selectedIndex,
													normalizeIndex(selectedIndex + 1),
												].includes(index),
											},
										)}
									>
										{project}
									</div>
								</li>
							);
						},
					)}
				</ul>
			</div>
		</div>
	);
}
