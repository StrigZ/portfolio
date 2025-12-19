"use client";

import { useMemo } from "react";

const SLIDE_GAP = 50;
const SLIDE_WIDTH_VARIABLE = "--slide-width";

type Props = { len: number };
export default function useSlideRadius({ len }: Props) {
	const radius = useMemo(
		() =>
			`calc(
       var(${SLIDE_WIDTH_VARIABLE}) / 2 / tan(${Math.PI} / ${len})
       + ${SLIDE_GAP}px
     )`,
		[len],
	);
	return { radius };
}
