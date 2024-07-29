import { useEffect, useState } from "react";
import compounder from "compounder";
import AnimatedCounter from "./components/animated-counter";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import { PieChart } from "react-minimal-pie-chart";

type CompoundingFrequency = "quarterly" | "semi-annually" | "annually";

const PRINCIPAL_AMOUNT_RANGE = {
	min: 1000,
	max: 10000000,
};
const INTEREST_RATE_RANGE = {
	min: 1,
	max: 50,
};
const TIME_PERIOD_RANGE = {
	min: 1,
	max: 30,
};

function calcPercentageBetween(value: number, min: number, max: number) {
	// Find the relative percentage with min-max normalizer.
	return Math.round(((value - min) / (max - min)) * 100);
}

function clamp(value: number, min = 0, max = 100) {
	if (value < min) return min;
	if (value > max) return max;
	return value;
}

export default function App() {
	const [principalAmount, setPrincipalAmount] = useState<number>(100000);
	const [interestRate, setInterestRate] = useState<number>(6);
	const [timePeriod, setTimePeriod] = useState<number>(5);
	const [compoundingFrequency, setCompoundingFrequency] =
		useState<CompoundingFrequency>("annually");

	const [totalInterest, setTotalInterest] = useState<number>(0);
	const [totalAmount, setTotalAmount] = useState<number>(0);

	const [principalPercent, setPrincipalPercent] = useState<number>(0);
	const [interestPercent, setInterestPercent] = useState<number>(0);
	const [timePeriodPercent, setTimePeriodPercent] = useState<number>(0);

	function calculateInterest() {
		const total = compounder({
			principal: principalAmount,
			interestRate: interestRate,
			compoundFrequency: compoundingFrequency,
			years: timePeriod,
		});

		setTotalAmount(total);
		setTotalInterest(total - principalAmount);
	}

	function getTotalInterestPercentage() {
		return (totalInterest / principalAmount) * 100;
	}

	function calcPrincipalPercent(currentValue: number) {
		const { min, max } = PRINCIPAL_AMOUNT_RANGE;
		const x = calcPercentageBetween(currentValue, min, max);
		setPrincipalPercent(x);
	}
	function calcInterestPercent(currentValue: number) {
		const { min, max } = INTEREST_RATE_RANGE;
		const x = calcPercentageBetween(currentValue, min, max);
		setInterestPercent(x);
	}
	function calcTimeperiodPercent(currentValue: number) {
		const { min, max } = TIME_PERIOD_RANGE;
		const x = calcPercentageBetween(currentValue, min, max);
		setTimePeriodPercent(x);
	}

	useEffect(() => {
		calculateInterest();
	}, [principalAmount, interestRate, timePeriod, compoundingFrequency]);

	useEffect(() => {
		// Set the initial normalized percentage value for the slider colorization.
		calcPrincipalPercent(principalAmount);
		calcInterestPercent(interestRate);
		calcTimeperiodPercent(timePeriod);
	}, []);

	return (
		<main className="flex flex-col justify-center items-center h-screen font-medium text-gray-800 bg-[#f9fafb]">
			<h1 className="text-xl font-semibold mb-10 opacity-35">
				Compound Interest Calculator
			</h1>
			<div className="w-[41rem]">
				<div className="flex flex-col space-y-12 shadow-xl bg-white rounded-lg p-12">
					<div>
						<div className="flex items-center justify-between">
							<div>Principal Amount</div>
							<div className="relative w-32">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right shadow-inner text-green-800"
									value={principalAmount}
									onChange={(e) => {
										setPrincipalAmount(Number(e.target.value));
										calcPrincipalPercent(Number(e.target.value));
									}}
								/>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min={PRINCIPAL_AMOUNT_RANGE.min}
								max={PRINCIPAL_AMOUNT_RANGE.max}
								value={principalAmount}
								style={{
									background: `linear-gradient(to right, #4ade80  ${principalPercent}%, #e5e7eb ${principalPercent}%)`,
								}}
								onChange={(e) => {
									setPrincipalAmount(Number(e.target.value));
									calcPrincipalPercent(Number(e.target.value));
								}}
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<div>Interest Rate</div>
							<div className="relative w-32 text-green-800">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right pr-7 shadow-inner"
									value={interestRate}
									onChange={(e) => {
										setInterestRate(Number(e.target.value));
										calcInterestPercent(Number(e.target.value));
									}}
								/>
								<span className="absolute right-2 top-1">%</span>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min={INTEREST_RATE_RANGE.min}
								max={INTEREST_RATE_RANGE.max}
								value={interestRate}
								style={{
									background: `linear-gradient(to right, #4ade80  ${interestPercent}%, #e5e7eb ${interestPercent}%)`,
								}}
								onChange={(e) => {
									setInterestRate(Number(e.target.value));
									calcInterestPercent(Number(e.target.value));
								}}
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<div>Time Period</div>
							<div className="relative w-32 text-green-800">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right pr-7 shadow-inner"
									value={timePeriod}
									onChange={(e) => {
										setTimePeriod(Number(e.target.value));
										calcTimeperiodPercent(Number(e.target.value));
									}}
								/>
								<span className="absolute right-2 top-1">Yr</span>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min={TIME_PERIOD_RANGE.min}
								max={TIME_PERIOD_RANGE.max}
								value={timePeriod}
								style={{
									background: `linear-gradient(to right, #4ade80  ${timePeriodPercent}%, #e5e7eb ${timePeriodPercent}%)`,
								}}
								onChange={(e) => {
									setTimePeriod(Number(e.target.value));
									calcTimeperiodPercent(Number(e.target.value));
								}}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div>Compounding Frequency</div>
						<div className="relative w-32">
							<select
								className="bg-green-100 rounded-sm py-2 px-3 w-full text-right shadow-inner text-green-800"
								value={compoundingFrequency}
								onChange={(e) =>
									setCompoundingFrequency(
										e.target.value as CompoundingFrequency,
									)
								}
							>
								<option value="quarterly">Quarterly</option>
								<option value="semi-annually">Half Yearly</option>
								<option value="annually">Yearly</option>
							</select>
						</div>
					</div>
				</div>

				<div>
					<div className="relative">
						<PieChart
							className="-mt-32 -mb-72"
							startAngle={180}
							lengthAngle={180}
							radius={20}
							lineWidth={50}
							data={[
								{
									title: "Total Return",
									value: clamp(100 - getTotalInterestPercentage()),
									color: "#8A2BE2",
								},
								{
									title: "Interest Return",
									value: clamp(getTotalInterestPercentage()),
									color: "#4ade80",
								},
							]}
							segmentsShift={0.5}
						/>
					</div>
					<div className="grid grid-cols-3 text-center">
						<div>
							<p className="text-gray-500">Principal Amount</p>
							<div>
								₹ <AnimatedCounter start={principalAmount} locale="en-IN" />
							</div>
						</div>
						<div>
							<div className="text-gray-500">
								<div className="inline-block bg-[#4ade80] h-[11px] w-[11px] mr-2" />
								Total Interest
							</div>
							<p>
								₹ <AnimatedCounter start={totalInterest} locale="en-IN" />
								<TriangleUpIcon
									className="text-green-500 inline-block"
									height="22"
									width="22"
								/>
							</p>
						</div>
						<div>
							<div className="text-gray-500">
								<div className="inline-block bg-[#8A2BE2] h-[11px] w-[11px] mr-2" />
								Total Amount
							</div>
							<p>
								₹ <AnimatedCounter start={totalAmount} locale="en-IN" />
								<TriangleUpIcon
									className="text-green-500 inline-block"
									height="22"
									width="22"
								/>
							</p>
							<p className="text-green-600 text-xs">
								+ {getTotalInterestPercentage().toFixed(2)} %
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
