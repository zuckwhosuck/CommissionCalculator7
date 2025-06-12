export interface CommissionInputs {
  startingMMR: number;
  vendorType: string;
  baseMultiple: number;
  creditBucket: string;
  equipmentTotal: number;
  wirelessCams: number;
  hardwiredCams: number;
  monthsGiven: number;
  leadType: string;
}

export interface CommissionResults {
  step1: number; // Post Pass Thru MMR
  step2: number; // Base Commission
  step3: number; // Credit Deduction
  step4: number; // Commission After Credit
  step5: number; // Commission After Holdback
  step6: number; // Commission After Equipment
  step7: number; // Commission After Tech
  step8: number; // Commission After Deferred
  step11: number; // Lead Gen Deduction
  finalCommission: number; // Step 12: Final Commission
  formulas: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
    step7: string;
    step8: string;
    step11: string;
    step12: string;
  };
}

function getPassThruRate(vendorType: string): number {
  switch (vendorType) {
    case "SecureNet":
      return 3;
    case "ADC":
      return 4.66;
    default:
      return 3;
  }
}

export function calculateCommission(
  inputs: CommissionInputs,
): CommissionResults {
  // Get pass thru rate based on vendor type
  const passThruRate = getPassThruRate(inputs.vendorType);

  // Step 1: Calculate Post Pass Thru MMR
  const step1 = inputs.startingMMR - passThruRate;

  // Step 2: Calculate Base Commission
  const step2 = inputs.baseMultiple * step1;

  // Step 3: Calculate Credit Deduction
  const step3 = step1 * parseFloat(inputs.creditBucket);

  // Step 4: Calculate Commission After Credit Deduction
  const step4 = step2 - step3;

  // Step 5: Apply 10% Holdback Fee
  const step5 = step4 * 0.9;

  // Step 6: Subtract Equipment Total
  const step6 = step5 - inputs.equipmentTotal;

  // Step 7: Apply Tech Deductions
  const techBase = 175;
  const wirelessDeduction = inputs.wirelessCams;
  const hardwiredDeduction = inputs.hardwiredCams;
  const totalTechDeduction = techBase + wirelessDeduction + hardwiredDeduction;
  const step7 = step6 - totalTechDeduction;

  // Step 8-10: Calculate Deferred Months Deduction
  const deferredDeduction = inputs.monthsGiven * 12;
  const step8 = step7 - deferredDeduction;

  // Step 11: Calculate Lead Gen Deduction
  const step11 = step1 * parseFloat(inputs.leadType);

  // Step 12: Final Commission
  const finalCommission = step8 - step11;

  // Generate formulas for display
  const formulas = {
    step1: `${inputs.startingMMR} - ${passThruRate} = ${step1}`,
    step2: `${inputs.baseMultiple} × ${step1} = ${step2}`,
    step3: `${step1} × ${inputs.creditBucket} = ${step3}`,
    step4: `${step2} - ${step3} = ${step4}`,
    step5: `${step4} × 0.9 = ${step5}`,
    step6: `${step5} - ${inputs.equipmentTotal} = ${step6}`,
    step7: `${step6} - (${techBase} + ${wirelessDeduction} + ${hardwiredDeduction}) = ${step7}`,
    step8: `${step7} - (${inputs.monthsGiven} × 12) = ${step8}`,
    step11: `${step1} × ${inputs.leadType} = ${step11}`,
    step12: `${step8} - ${step11} = ${finalCommission}`,
  };

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step11,
    finalCommission,
    formulas,
  };
} 