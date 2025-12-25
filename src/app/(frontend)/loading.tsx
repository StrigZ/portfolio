import { Shell } from "lucide-react";

export default function Loading() {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<Shell className="animate-spin" size={72} />
		</div>
	);
}
