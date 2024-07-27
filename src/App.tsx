import { useEffect, useState } from "react";
import compounder from "compounder";

type CompoundingFrequency = "quarterly" | "semi-annually" | "annually";

export default function App() {
	const [principalAmount, setPrincipalAmount] = useState<number>(100000);
	const [interestRate, setInterestRate] = useState<number>(6);
	const [timePeriod, setTimePeriod] = useState<number>(5);
	const [compoundingFrequency, setCompoundingFrequency] =
		useState<CompoundingFrequency>("annually");

	const [totalInterest, setTotalInterest] = useState<number>(0);
	const [totalAmount, setTotalAmount] = useState<number>(0);

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

	useEffect(calculateInterest, [
		principalAmount,
		interestRate,
		timePeriod,
		compoundingFrequency,
	]);

	return (
		<main className="flex flex-col justify-center items-center h-screen font-medium text-gray-800">
			<div className="w-[41rem] shadow-md rounded p-10">
				<div className="flex flex-col space-y-12">
					<div>
						<div className="flex items-center justify-between">
							<div>Principal Amount</div>
							<div className="relative w-32">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right shadow-inner text-green-800"
									value={principalAmount}
									onChange={(e) => setPrincipalAmount(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min="1000"
								max="10000000"
								value={principalAmount}
								onChange={(e) => setPrincipalAmount(Number(e.target.value))}
								className="w-full"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<div>Interest Rate</div>
							<div className="relative w-32 text-green-800">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right pr-6 shadow-inner"
									value={interestRate}
									onChange={(e) => setInterestRate(Number(e.target.value))}
								/>
								<span className="absolute right-2 top-1">%</span>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min="1"
								max="50"
								value={interestRate}
								onChange={(e) => setInterestRate(Number(e.target.value))}
								className="w-full"
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<div>Time Period</div>
							<div className="relative w-32">
								<input
									type="number"
									className="bg-green-100 rounded-sm py-1 px-2 w-full text-right shadow-inner text-green-800"
									value={timePeriod}
									onChange={(e) => setTimePeriod(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="w-full mt-5">
							<input
								type="range"
								min="1"
								max="30"
								value={timePeriod}
								onChange={(e) => setTimePeriod(Number(e.target.value))}
								className="w-full"
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

				<div className="mt-20 grid grid-cols-3 text-center">
					<div>
						<p className="text-gray-500">Principal Amount</p>
						<p>₹{principalAmount.toLocaleString("en-IN")}</p>
					</div>
					<div>
						<p className="text-gray-500">Total Interest</p>
						<p>₹{totalInterest.toLocaleString("en-IN")}</p>
					</div>
					<div>
						<p className="text-gray-500">Total Amount</p>
						<p>₹{totalAmount.toLocaleString("en-IN")}</p>
					</div>
				</div>
			</div>
		</main>
	);
}
