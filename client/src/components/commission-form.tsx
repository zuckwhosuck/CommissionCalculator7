import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw } from "lucide-react";
import { type CommissionInputs } from "@/lib/commission-calculator";

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
    <Card className="material-shadow">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <i className="fas fa-edit text-[hsl(215,70%,50%)] mr-2"></i>
          Input Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Starting MMR */}
        <div className="calculator-floating-label">
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
        <div className="space-y-2">
          <Label htmlFor="vendorType">Vendor Type</Label>
          <Select value={inputs.vendorType} onValueChange={(value) => onInputChange("vendorType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Vendor Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SecureNet">Secure Net</SelectItem>
              <SelectItem value="ADC">ADC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Base Multiple */}
        <div className="calculator-floating-label">
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
        <div className="space-y-2">
          <Label htmlFor="creditBucket">Credit Bucket</Label>
          <Select value={inputs.creditBucket} onValueChange={(value) => onInputChange("creditBucket", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Credit Bucket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">A (0 deduction)</SelectItem>
              <SelectItem value="2">B (2 deduction)</SelectItem>
              <SelectItem value="4">C (4 deduction)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Equipment Total */}
        <div className="calculator-floating-label">
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
          <div className="calculator-floating-label">
            <Input
              type="number"
              min="0"
              placeholder=" "
              value={inputs.wirelessCams || ""}
              onChange={(e) => onInputChange("wirelessCams", parseInt(e.target.value) || 0)}
            />
            <Label>Wireless Cams</Label>
          </div>
          <div className="calculator-floating-label">
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
        <div className="calculator-floating-label">
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
        <div className="space-y-2">
          <Label htmlFor="leadType">Lead Type</Label>
          <Select value={inputs.leadType} onValueChange={(value) => onInputChange("leadType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Lead Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Self Gen ($0)</SelectItem>
              <SelectItem value="7">Qualified Lead ($7)</SelectItem>
              <SelectItem value="5">Non-Qualified Lead ($5)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onCalculate}
            disabled={!isFormValid()}
            className="w-full bg-[hsl(215,70%,50%)] hover:bg-[hsl(215,70%,40%)] text-white"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Commission
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
