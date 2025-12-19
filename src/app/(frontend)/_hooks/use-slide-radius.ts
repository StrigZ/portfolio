"use client";

import { useMemo } from "react";

type Props = { len: number; slideWidth?: string; slideGap?: number };
export default function useSlideRadius({
	len,
	slideWidth = "var(--slide-width)",
	slideGap = 50,
}: Props) {
	const radius = useMemo(
		() =>
			`calc(
       ${slideWidth} / 2 / tan(${Math.PI} / ${len})
       + ${slideGap}px
     )`,
		[slideWidth, len, slideGap],
	);
	return { radius };
}
