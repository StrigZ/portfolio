import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import use3DCarousel from "../../_hooks/use-3d-carousel";
import { Button } from "./button";

export type CarouselItem = Readonly<{
	id: string;
	alt?: string;
	image: string;
	content: React.ReactNode;
	onClick?: () => void;
}>;

export type CarouselProps = Readonly<{
	items: CarouselItem[];
	itemWidth?: number;
	slideOnClick?: boolean;
	className?: string;
}>;

export default function Carousel({
	items,
	itemWidth = 210,
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
		slideWidth: itemWidth,
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
			<div className="absolute inset-x-0 bottom-0 flex w-full translate-y-[200%] items-center justify-center gap-4">
				<Button className="cursor-pointer" onClick={prev} variant="ghost">
					<MoveLeft /> Prev
				</Button>
				<Button className="cursor-pointer" onClick={next} variant="ghost">
					Next <MoveRight />
				</Button>
			</div>
		</div>
	);
}
