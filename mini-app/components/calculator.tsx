"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Calculator() {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [operation, setOperation] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers.");
      return;
    }
    if (!["+", "-", "*", "/"].includes(operation)) {
      setError("Please select a valid operation.");
      return;
    }
    if (operation === "/" && b === 0) {
      setError("Division by zero is not allowed.");
      return;
    }
    let res: number;
    switch (operation) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "*":
        res = a * b;
        break;
      case "/":
        res = a / b;
        break;
      default:
        res = 0;
    }
    setResult(res.toString());
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Simple Calculator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="num1">First Number</Label>
          <Input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="num2">Second Number</Label>
          <Input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="operation">Operation</Label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </div>
        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>
        {error && <p className="text-red-600">{error}</p>}
        {result && (
          <p className="text-green-600">
            Result: <strong>{result}</strong>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
