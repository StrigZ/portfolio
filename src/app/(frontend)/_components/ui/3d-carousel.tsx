import Image from "next/image";
import { cn } from "~/lib/utils";
import use3DCarousel from "../../_hooks/use-3d-carousel";
import CarouselNavButtons from "../CarouselNavButtons";

export type CarouselItem = Readonly<{
	id: string;
	alt?: string;
	image: string;
	content: React.ReactNode;
	onClick?: () => void;
}>;

export type CarouselProps = Readonly<{
	items: CarouselItem[];
	slideOnClick?: boolean;
	className?: string;
}>;

export default function Carousel({
	items,
	slideOnClick = false,
	className,
}: CarouselProps) {
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
	} = use3DCarousel({
		totalSlides: items.length,
	});

	return (
		<div className={cn("touch-none select-none", className)}>
			<div className="carousel" {...handlers}>
				<ul className="carousel__container" style={getContainerStyle()}>
					{items.map((item, index) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: I don't see a way to implement this logic with keyboard
						<li
							className={cn("carousel__slide", {
								"cursor-pointer": index !== selectedIndex,
							})}
							key={item.id}
							onClick={() => {
								item.onClick?.();
								if (!slideOnClick) return;

								updateRotationIndex(index);
								updateSelectedIndex(index);
							}}
							style={getSlideStyle(index)}
						>
							<Image
								alt={item.alt ?? ""}
								draggable={false}
								fill
								src={item.image}
							/>

							<div
								className={cn("carousel__slide-overlay", {
									"pointer-events-none **:overflow-hidden": ![
										normalizeIndex(selectedIndex - 1),
										selectedIndex,
										normalizeIndex(selectedIndex + 1),
									].includes(index),
								})}
							>
								{item.content}
							</div>
						</li>
					))}
				</ul>
			</div>
			<CarouselNavButtons
				className="absolute inset-x-0 bottom-0 w-full translate-y-[200%]"
				onNext={next}
				onPrev={prev}
			/>
		</div>
	);
}
