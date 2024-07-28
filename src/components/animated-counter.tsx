import { useEffect, useRef, useState } from "react";

interface Props {
	start: number;
	duration?: number;
	locale?: string;
}

export default function AnimatedCounter({
	start,
	duration = 200,
	locale,
}: Props) {
	const [count, setCount] = useState(start); // State to keep track of the current count
	const prevStartRef = useRef(start); // Ref to store the previous start value

	// Update the previous start value when start changes
	useEffect(() => {
		prevStartRef.current = start;
	}, [start]);

	// Previous start value
	const prevStart = prevStartRef.current;

	// Animate the count when the start value changes
	useEffect(() => {
		// If start value changes, animate the count
		if (prevStart !== start) {
			let startTimestamp: DOMHighResTimeStamp;

			const step = (timestamp: DOMHighResTimeStamp) => {
				if (!startTimestamp) startTimestamp = timestamp;
				const progress = Math.min((timestamp - startTimestamp) / duration, 1); // Calculate progress
				setCount(Math.floor(progress * (start - prevStart) + prevStart)); // Update count based on progress

				if (progress < 1) {
					window.requestAnimationFrame(step); // Continue animation
				}
			};

			window.requestAnimationFrame(step); // Start animation
		}
	}, [start, duration]);

	return <span>{locale ? count.toLocaleString(locale) : count}</span>; // Render the current count
}
