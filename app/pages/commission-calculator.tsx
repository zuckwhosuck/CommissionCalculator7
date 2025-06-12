"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CommissionCalculator() {
  const [amount, setAmount] = useState("")
  const [commission, setCommission] = useState<number | null>(null)
  const { toast } = useToast()

  const calculateCommission = () => {
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      })
      return
    }

    // Example commission calculation (you can modify this based on your needs)
    const calculatedCommission = numAmount * 0.1 // 10% commission
    setCommission(calculatedCommission)

    toast({
      title: "Commission Calculated",
      description: `Commission amount: $${calculatedCommission.toFixed(2)}`,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Commission Calculator</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1"
            />
          </div>

          <Button onClick={calculateCommission} className="w-full">
            Calculate Commission
          </Button>

          {commission !== null && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h2 className="text-lg font-semibold">Commission Amount</h2>
              <p className="text-2xl font-bold">${commission.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 