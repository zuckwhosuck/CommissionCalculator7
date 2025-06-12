'use client';

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Calculator, RotateCcw, Sliders, Award } from "lucide-react";
import { type CommissionInputs } from "../lib/commission-calculator";

interface CommissionFormProps {
  inputs: CommissionInputs;
  onInputChange: (field: keyof CommissionInputs, value: string | number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export default function CommissionForm({ inputs, onInputChange, onCalculate, onReset }: CommissionFormProps) {
  const isFormValid = () => {
    return (
      inputs.startingMMR > 0 &&
      inputs.vendorType &&
      inputs.baseMultiple > 0 &&
      inputs.creditBucket !== "" &&
      inputs.equipmentTotal >= 0 &&
      inputs.wirelessCams >= 0 &&
      inputs.hardwiredCams >= 0 &&
      inputs.monthsGiven >= 0 &&
      inputs.leadType !== ""
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-accent/10 to-background py-8">
      <div className="glass-card max-w-xl w-full p-8">
        <div className="wow-section-title">
          <Sliders className="text-accent w-8 h-8" />
          Commission Calculator
        </div>
        <form className="space-y-6">
          {/* Starting MMR */}
          <div className="wow-floating-label">
            <Input
              type="number"
              step="0.01"
              placeholder=" "
              value={inputs.startingMMR || ""}
              onChange={(e) => onInputChange("startingMMR", parseFloat(e.target.value) || 0)}
            />
            <Label>Starting MMR ($)</Label>
          </div>

          {/* Vendor Type */}
          <div>
            <Label htmlFor="vendorType" className="mb-2 block text-base font-medium text-accent">Vendor Type</Label>
            <Select value={inputs.vendorType} onValueChange={(value) => onInputChange("vendorType", value)}>
              <SelectTrigger className="wow-select">
                <SelectValue placeholder="Select Vendor Type" />
              </SelectTrigger>
              <SelectContent className="wow-select-content">
                <SelectItem value="SecureNet">Secure Net</SelectItem>
                <SelectItem value="ADC">ADC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Base Multiple */}
          <div className="wow-floating-label">
            <Input
              type="number"
              step="0.01"
              placeholder=" "
              value={inputs.baseMultiple || ""}
              onChange={(e) => onInputChange("baseMultiple", parseFloat(e.target.value) || 0)}
            />
            <Label>Base Multiple</Label>
          </div>

          {/* Credit Bucket */}
          <div>
            <Label htmlFor="creditBucket" className="mb-2 block text-base font-medium text-accent">Credit Bucket</Label>
            <Select value={inputs.creditBucket} onValueChange={(value) => onInputChange("creditBucket", value)}>
              <SelectTrigger className="wow-select">
                <SelectValue placeholder="Select Credit Bucket" />
              </SelectTrigger>
              <SelectContent className="wow-select-content">
                <SelectItem value="0">A (0 deduction)</SelectItem>
                <SelectItem value="2">B (2 deduction)</SelectItem>
                <SelectItem value="4">C (4 deduction)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Total */}
          <div className="wow-floating-label">
            <Input
              type="number"
              step="0.01"
              placeholder=" "
              value={inputs.equipmentTotal || ""}
              onChange={(e) => onInputChange("equipmentTotal", parseFloat(e.target.value) || 0)}
            />
            <Label>Equipment Total ($)</Label>
          </div>

          {/* Camera Counts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="wow-floating-label">
              <Input
                type="number"
                min="0"
                placeholder=" "
                value={inputs.wirelessCams || ""}
                onChange={(e) => onInputChange("wirelessCams", parseInt(e.target.value) || 0)}
              />
              <Label>Wireless Cams</Label>
            </div>
            <div className="wow-floating-label">
              <Input
                type="number"
                min="0"
                placeholder=" "
                value={inputs.hardwiredCams || ""}
                onChange={(e) => onInputChange("hardwiredCams", parseInt(e.target.value) || 0)}
              />
              <Label>Hardwired Cams</Label>
            </div>
          </div>

          {/* Months Given */}
          <div className="wow-floating-label">
            <Input
              type="number"
              min="0"
              placeholder=" "
              value={inputs.monthsGiven || ""}
              onChange={(e) => onInputChange("monthsGiven", parseInt(e.target.value) || 0)}
            />
            <Label>Deferred Months</Label>
          </div>

          {/* Lead Type */}
          <div>
            <Label htmlFor="leadType" className="mb-2 block text-base font-medium text-accent">Lead Type</Label>
            <Select value={inputs.leadType} onValueChange={(value) => onInputChange("leadType", value)}>
              <SelectTrigger className="wow-select">
                <SelectValue placeholder="Select Lead Type" />
              </SelectTrigger>
              <SelectContent className="wow-select-content">
                <SelectItem value="0">Self Gen ($0)</SelectItem>
                <SelectItem value="7">Qualified Lead ($7)</SelectItem>
                <SelectItem value="5">Non-Qualified Lead ($5)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              onClick={onCalculate}
              disabled={!isFormValid()}
              className="wow-btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate
            </Button>
            <Button
              type="button"
              onClick={onReset}
              variant="outline"
              className="wow-btn-outline flex-1 flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 