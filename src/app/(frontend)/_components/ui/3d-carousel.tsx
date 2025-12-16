import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import {
	type CSSProperties,
	type FC,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { useSwipeable } from "react-swipeable";
import { v4 as uuid } from "uuid";
import { cn } from "~/lib/utils";
import { Button } from "./button";

export type CarouselItem = Readonly<{
	alt?: string;
	image: string;
	content: React.ReactNode;
	onClick?: () => void;
}>;

export type DecoratedCarouselItem = CarouselItem & Readonly<{ id: string }>;

export type CarouselProps = Readonly<{
	items: CarouselItem[];
	ref?: React.ForwardedRef<CarouselRef>;
	itemWidth?: number;
	showControls?: boolean;
	slideOnClick?: boolean;
	classNamePrefix?: string;
	nextButtonContent?: string | React.ReactNode;
	prevButtonContent?: string | React.ReactNode;
	className?: string;
}>;

export type CarouselRef = Readonly<{
	next: () => void;
	prev: () => void;
	getItems: () => DecoratedCarouselItem[];
	getSelectedIndex: () => number;
	setSelectedIndex: (index: number) => void;
}>;

const MAX_DRAG_PX = 120;

export const Carousel: FC<CarouselProps> = forwardRef(
	(
		{
			items,
			itemWidth = 210,
			showControls = true,
			slideOnClick = false,
			classNamePrefix = "carousel",
			className,
		}: CarouselProps,
		CarouselRef,
	) => {
		const data: DecoratedCarouselItem[] = useMemo(
			() =>
				items.map((item) => ({
					...item,
					...((item as unknown as DecoratedCarouselItem).id
						? ({} as unknown as DecoratedCarouselItem)
						: { id: uuid() }),
				})),
			[items],
		);

		const len = useMemo(() => data.length, [data.length]);
		const theta = useMemo(() => 360 / len, [len]);

		const radius = useMemo(
			() => Math.round(itemWidth / 2 / Math.tan(Math.PI / len)),
			[itemWidth, len],
		);

		const [selectedIndex, setSelectedIndex] = useState(0);
		const [rotationIndex, setRotationIndex] = useState(0);

		const getSlideStyle = useCallback(
			(index: number): CSSProperties => {
				const style: CSSProperties = {};

				if (index < len) {
					const cellAngle = theta * index;

					style.opacity = 1;
					style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
				} else {
					style.opacity = 0;
					style.transform = "none";
				}

				return style;
			},
			[len, radius, theta],
		);

		const normalizeIndex = useCallback(
			(index: number) => ((index % len) + len) % len,
			[len],
		);

		const getItemStyle = () => ({
			transform: `
		translateZ(${-radius}px)
		rotateY(${-(rotationIndex * theta + dragRotation)}deg)
	`,
		});

		const getClassName = useCallback(
			(parts: string | string[]) =>
				Array.isArray(parts)
					? parts.map((part: string) => `${classNamePrefix}${part}`).join(" ")
					: `${classNamePrefix}${parts}`,
			[classNamePrefix],
		);

		const next = useCallback(() => {
			setRotationIndex((r) => r + 1);
			setSelectedIndex((i) => normalizeIndex(i + 1));
		}, [normalizeIndex]);

		const prev = useCallback(() => {
			setRotationIndex((r) => r - 1);
			setSelectedIndex((i) => normalizeIndex(i - 1));
		}, [normalizeIndex]);
		const [dragRotation, setDragRotation] = useState(0);

		const { ref, ...handlers } = useSwipeable({
			trackMouse: true,
			preventScrollOnSwipe: true,
			delta: 25,

			onSwiping: ({ deltaX, deltaY }) => {
				if (Math.abs(deltaY) > Math.abs(deltaX)) return;

				const clamped = Math.max(-MAX_DRAG_PX, Math.min(MAX_DRAG_PX, deltaX));
				const fraction = clamped / MAX_DRAG_PX;
				setDragRotation(-fraction * theta);
			},

			onSwiped: ({ deltaX, velocity, deltaY }) => {
				setDragRotation(0);

				if (Math.abs(deltaY) > Math.abs(deltaX)) return;

				const shouldMove = Math.abs(deltaX) > 60 || velocity > 0.25;
				if (!shouldMove) return;

				deltaX > 0 ? prev() : next();
			},
		});

		useImperativeHandle(
			CarouselRef,
			(): CarouselRef => ({
				next,
				prev,
				getItems: () => data,
				getSelectedIndex: () => selectedIndex,
				setSelectedIndex: (index: number) => setSelectedIndex(index),
			}),
		);

		return (
			<div className={cn("touch-none select-none", className)}>
				<div className={getClassName("")} ref={ref} {...handlers}>
					<ul className={getClassName("__container")} style={getItemStyle()}>
						{data.map((item: DecoratedCarouselItem, index: number) => (
							// biome-ignore lint/a11y/useKeyWithClickEvents: I don't see a way to implement this logic with keyboard
							<li
								className={cn(getClassName("__slide"), {
									"cursor-pointer": index !== selectedIndex,
								})}
								key={item.id}
								onClick={() => {
									item.onClick?.();

									if (!slideOnClick) return;

									const diff = index - selectedIndex;

									const shortest =
										Math.abs(diff) > len / 2
											? diff > 0
												? diff - len
												: diff + len
											: diff;

									setRotationIndex((r) => r + shortest);
									setSelectedIndex(index);
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
									className={cn(getClassName("__slide-overlay"), {
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
				{showControls && (
					<div className="absolute inset-x-0 bottom-0 flex w-full translate-y-[200%] items-center justify-center gap-4">
						<Button className="cursor-pointer" onClick={prev} variant="ghost">
							<MoveLeft /> Prev
						</Button>
						<Button className="cursor-pointer" onClick={next} variant="ghost">
							Next <MoveRight />
						</Button>
					</div>
				)}
			</div>
		);
	},
);

export default Carousel;
