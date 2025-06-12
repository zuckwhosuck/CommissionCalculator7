'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy } from "lucide-react";
import { type CommissionResults } from "../lib/commission-calculator";

interface CalculationResultsProps {
  results: CommissionResults | null;
  isCalculated: boolean;
}

export default function CalculationResults({
  results,
  isCalculated,
}: CalculationResultsProps) {
  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formatted = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return isNegative ? `-${formatted}` : formatted;
  };

  if (!isCalculated || !results) {
    return (
      <div className="space-y-6">
        <Card className="material-shadow-lg border-l-4 border-l-[hsl(215,70%,50%)]">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-semibold mb-2 text-gray-400">
                $0.00
              </div>
              <p className="text-sm text-gray-600">
                Complete all fields and calculate to see your commission
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="material-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <i className="fas fa-list-ol text-[hsl(215,70%,50%)] mr-2"></i>
              Calculation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500 py-8">
              Enter your commission parameters and click "Calculate Commission"
              to see the detailed breakdown.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    {
      number: 1,
      title: "Post Pass Thru MMR",
      description: "Starting MMR - Pass Thru Rate",
      value: results.step1,
      formula: results.formulas.step1,
    },
    {
      number: 2,
      title: "Base Commission",
      description: "Base Multiple × Post Pass Thru MMR",
      value: results.step2,
      formula: results.formulas.step2,
    },
    {
      number: 3,
      title: "Credit Deduction",
      description: "Post Pass Thru MMR × Credit Bucket",
      value: results.step3,
      formula: results.formulas.step3,
      isDeduction: true,
    },
    {
      number: 4,
      title: "After Credit Deduction",
      description: "Base Commission - Credit Deduction",
      value: results.step4,
      formula: results.formulas.step4,
    },
    {
      number: 5,
      title: "After 10% Holdback",
      description: "Commission × 0.9",
      value: results.step5,
      formula: results.formulas.step5,
    },
    {
      number: 6,
      title: "After Equipment Deduction",
      description: "Previous - Equipment Total",
      value: results.step6,
      formula: results.formulas.step6,
    },
    {
      number: 7,
      title: "After Tech Deduction",
      description: "Base $175 + Camera deductions",
      value: results.step7,
      formula: results.formulas.step7,
    },
    {
      number: "8-10",
      title: "After Deferred Deduction",
      description: "$12 per deferred month",
      value: results.step8,
      formula: results.formulas.step8,
    },
    {
      number: 11,
      title: "Lead Gen Deduction",
      description: "Post Pass Thru MMR × Lead Rate",
      value: results.step11,
      formula: results.formulas.step11,
      isDeduction: true,
    },
    {
      number: 12,
      title: "Final Commission",
      description: "After all deductions",
      value: results.finalCommission,
      formula: results.formulas.step12,
      isFinal: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Final Result Card */}
      <Card
        className={`material-shadow-lg border-l-4 ${
          results.finalCommission >= 0
            ? "border-l-[hsl(142,70%,45%)] bg-gradient-to-r from-[hsl(142,70%,45%)] to-[hsl(142,70%,40%)]"
            : "border-l-red-500 bg-gradient-to-r from-red-500 to-red-600"
        } text-white`}
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Final Commission Result
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {formatCurrency(results.finalCommission)}
            </div>
            <p className="text-blue-100">
              {results.finalCommission >= 0
                ? "Commission calculation completed successfully!"
                : "Commission calculation shows a negative result"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Steps */}
      <Card className="material-shadow">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <i className="fas fa-list-ol text-[hsl(215,70%,50%)] mr-2"></i>
            Calculation Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                step.isFinal
                  ? "bg-[hsl(142,70%,45%)]/10 border-l-[hsl(142,70%,45%)]"
                  : "bg-gray-50 border-l-gray-300"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge
                    variant={step.isFinal ? "default" : "secondary"}
                    className={
                      step.isFinal ? "bg-[hsl(142,70%,45%)] text-white" : ""
                    }
                  >
                    {step.number}
                  </Badge>
                  <span className="font-medium text-gray-900">
                    {step.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                <div className="bg-white p-2 rounded text-xs font-mono text-gray-700 border">
                  {step.formula}
                </div>
              </div>
              <div className="text-right ml-4">
                <span
                  className={`text-lg font-semibold ${
                    step.isFinal
                      ? step.value >= 0
                        ? "text-[hsl(142,70%,45%)]"
                        : "text-red-600"
                      : step.isDeduction
                        ? "text-red-600"
                        : step.value < 0
                          ? "text-red-600"
                          : "text-gray-900"
                  }`}
                >
                  {formatCurrency(step.value)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
} 