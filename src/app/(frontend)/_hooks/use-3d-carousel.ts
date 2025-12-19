"use client";

import { type CSSProperties, useCallback, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";

const MAX_DRAG_PX = 120;

type Props = { totalSlides: number; radius: string };
export default function use3DCarousel({ totalSlides, radius }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [rotationIndex, setRotationIndex] = useState(0);
	const [dragRotation, setDragRotation] = useState(0);
	const len = useMemo(() => totalSlides, [totalSlides]);
	const theta = useMemo(() => 360 / len, [len]);

	const normalizeIndex = useCallback(
		(index: number) => ((index % len) + len) % len,
		[len],
	);

	const getContainerStyle = () =>
		({
			transform: `
			translateZ(calc(${radius} * -1))
			rotateX(-9.5deg)
			rotateY(${-(rotationIndex * theta + dragRotation)}deg)
	`,
		}) as CSSProperties;

	const getSlideStyle = useCallback(
		(index: number): CSSProperties => {
			return {
				transform: `rotateY(${theta * index}deg) translateZ(${radius})`,
			} as CSSProperties;
		},
		[theta, radius],
	);

	const next = useCallback(() => {
		setRotationIndex((r) => r + 1);
		setSelectedIndex((i) => normalizeIndex(i + 1));
	}, [normalizeIndex]);

	const prev = useCallback(() => {
		setRotationIndex((r) => r - 1);
		setSelectedIndex((i) => normalizeIndex(i - 1));
	}, [normalizeIndex]);

	const handlers = useSwipeable({
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

	const updateRotationIndex = (index: number) => {
		const diff = index - selectedIndex;

		const shortest =
			Math.abs(diff) > len / 2 ? (diff > 0 ? diff - len : diff + len) : diff;

		setRotationIndex((r) => r + shortest);
	};

	return {
		selectedIndex,
		handlers,
		len,
		getContainerStyle,
		getSlideStyle,
		normalizeIndex,
		updateSelectedIndex: (i: number) => setSelectedIndex(i),
		updateRotationIndex,
		next,
		prev,
	};
}
