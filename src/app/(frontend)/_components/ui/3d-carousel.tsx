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
import TouchSweep from "touchsweep";
import { v4 as uuid } from "uuid";
import { cn } from "~/lib/utils";

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

export const Carousel: FC<CarouselProps> = forwardRef(
	(
		{
			items,
			itemWidth = 210,
			showControls = true,
			slideOnClick = false,
			classNamePrefix = "carousel",
			prevButtonContent = "Previous",
			nextButtonContent = "Next",
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

		const ref = useRef<HTMLDivElement>(null);
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

		const getItemStyle = useCallback((): CSSProperties => {
			const angle = theta * rotationIndex * -1;

			return {
				transform: `translateZ(${-radius}px) rotateY(${angle}deg)`,
			};
		}, [radius, rotationIndex, theta]);

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

		useEffect(() => {
			const area = ref?.current;
			const touchsweep = new TouchSweep(area ?? undefined);

			area?.addEventListener("swipeleft", next);
			area?.addEventListener("swiperight", prev);

			return () => {
				touchsweep.unbind();

				area?.removeEventListener("swipeleft", next);
				area?.removeEventListener("swiperight", prev);
			};
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
			<>
				<div className={cn(getClassName(""), className)} ref={ref}>
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
								<Image alt={item.alt ?? ""} fill src={item.image} />

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
					<div className={getClassName("__controls")}>
						<button
							className={getClassName(["__control", "__control--prev"])}
							onClick={prev}
							type="button"
						>
							{prevButtonContent}
						</button>

						<button
							className={getClassName(["__control", "__control--next"])}
							onClick={next}
							type="button"
						>
							{nextButtonContent}
						</button>
					</div>
				)}
			</>
		);
	},
);

export default Carousel;
