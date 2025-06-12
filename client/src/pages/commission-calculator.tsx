import { useState } from "react";
import CommissionForm from "@/components/commission-form";
import CalculationResults from "@/components/calculation-results";
import { calculateCommission, type CommissionInputs, type CommissionResults } from "@/lib/commission-calculator";

export default function CommissionCalculator() {
  const [inputs, setInputs] = useState<CommissionInputs>({
    startingMMR: 0,
    vendorType: "",
    baseMultiple: 0,
    creditBucket: "",
    equipmentTotal: 0,
    wirelessCams: 0,
    hardwiredCams: 0,
    monthsGiven: 0,
    leadType: ""
  });

  const [results, setResults] = useState<CommissionResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (field: keyof CommissionInputs, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset calculation when inputs change
    if (isCalculated) {
      setIsCalculated(false);
      setResults(null);
    }
  };

  const handleCalculate = () => {
    const calculationResults = calculateCommission(inputs);
    setResults(calculationResults);
    setIsCalculated(true);
  };

  const handleReset = () => {
    setInputs({
      startingMMR: 0,
      vendorType: "",
      baseMultiple: 0,
      creditBucket: "",
      equipmentTotal: 0,
      wirelessCams: 0,
      hardwiredCams: 0,
      monthsGiven: 0,
      leadType: ""
    });
    setResults(null);
    setIsCalculated(false);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,13%,98%)]">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-[hsl(215,70%,50%)] rounded-lg p-2">
              <i className="fas fa-calculator text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900">Commission Calculator</h1>
              <p className="text-sm text-gray-600">12-Step Commission Calculation Tool</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <div className="space-y-6">
            <CommissionForm
              inputs={inputs}
              onInputChange={handleInputChange}
              onCalculate={handleCalculate}
              onReset={handleReset}
            />
          </div>

          {/* Calculation Results Section */}
          <div className="space-y-6">
            <CalculationResults
              results={results}
              isCalculated={isCalculated}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
