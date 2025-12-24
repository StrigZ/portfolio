"use client";

import {
	type CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useSwipeable } from "react-swipeable";
import { useTabVisibility } from "./use-tab-visibility";

const MAX_DRAG_PX = 120;

type Props = {
	totalSlides: number;
	radius: string;
	xTilt?: number;
	animationDuration?: number;
	shouldAutoRotate?: boolean;
	autoRotationDelay?: number;
};
export default function use3DCarousel({
	totalSlides,
	radius,
	xTilt = -9.5,
	animationDuration = 1000,
	shouldAutoRotate = false,
	autoRotationDelay = 3000,
}: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [rotationIndex, setRotationIndex] = useState(0);
	const [dragRotation, setDragRotation] = useState(0);
	const [isChanging, setIsChanging] = useState(false);
	const [isInteracting, setIsInteracting] = useState(false);

	const isTabActive = useTabVisibility();

	const len = useMemo(() => totalSlides, [totalSlides]);
	const theta = useMemo(() => 360 / len, [len]);

	const normalizeIndex = useCallback(
		(index: number) => ((index % len) + len) % len,
		[len],
	);
	const next = useCallback(() => {
		setRotationIndex((r) => r + 1);
		setSelectedIndex((i) => normalizeIndex(i + 1));
	}, [normalizeIndex]);
	const prev = useCallback(() => {
		setRotationIndex((r) => r - 1);
		setSelectedIndex((i) => normalizeIndex(i - 1));
	}, [normalizeIndex]);
	const handleInteractionStart = () => {
		setIsInteracting(true);
	};
	const handleInteractionEnd = () => {
		setIsInteracting(false);
	};
	const handleShowNextSlide = () => {
		if (isChanging) return;
		waitForAnimation();
		next();
	};
	const handleShowPrevSlide = () => {
		if (isChanging) return;
		waitForAnimation();
		prev();
	};
	const getSlideStyle = useCallback(
		(index: number): CSSProperties => {
			return {
				transform: `rotateY(${theta * index}deg) translateZ(${radius})`,
			} as CSSProperties;
		},
		[theta, radius],
	);
	const getContainerStyle = () =>
		({
			transform: `
			translateZ(calc(${radius} * -1))
			rotateX(${xTilt}deg)
			rotateY(${-(rotationIndex * theta + dragRotation)}deg)
	`,
		}) as CSSProperties;

	const handlers = useSwipeable({
		trackMouse: true,
		preventScrollOnSwipe: true,
		delta: 25,
		onSwiping: ({ deltaX, deltaY }) => {
			setIsInteracting(true);
			if (Math.abs(deltaY) > Math.abs(deltaX)) return;

			const clamped = Math.max(-MAX_DRAG_PX, Math.min(MAX_DRAG_PX, deltaX));
			const fraction = clamped / MAX_DRAG_PX;
			setDragRotation(-fraction * theta);
		},
		onTouchEndOrOnMouseUp: () => {
			setIsInteracting(false);
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

	const waitForAnimation = useCallback(() => {
		setIsChanging(true);

		const timeoutId = setTimeout(() => {
			setIsChanging(false);
		}, animationDuration);

		return timeoutId;
	}, [animationDuration]);

	useEffect(() => {
		if (isChanging) return;

		const handleKeyPress = (e: KeyboardEvent) => {
			if (!(e.key === "ArrowRight" || e.key === "ArrowLeft")) return;

			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();

			const timeoutId = waitForAnimation();
			return () => clearTimeout(timeoutId);
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [next, prev, isChanging, waitForAnimation]);

	useEffect(() => {
		if (!shouldAutoRotate || isInteracting || !isTabActive || isChanging)
			return;

		const intervalId = setInterval(next, autoRotationDelay);

		return () => clearInterval(intervalId);
	}, [
		next,
		shouldAutoRotate,
		autoRotationDelay,
		isInteracting,
		isTabActive,
		isChanging,
	]);

	return {
		selectedIndex,
		handlers,
		len,
		getContainerStyle,
		getSlideStyle,
		normalizeIndex,
		updateSelectedIndex: (i: number) => setSelectedIndex(i),
		updateRotationIndex,
		handleShowNextSlide,
		handleShowPrevSlide,
		handleInteractionStart,
		handleInteractionEnd,
	};
}
