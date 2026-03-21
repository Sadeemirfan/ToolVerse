import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { TrendingUp } from "lucide-react";

function calculateInflation(amount: number, startYear: number, endYear: number, annualRate: number): {
  adjusted: number;
  increase: number;
  purchasingLoss: number;
  yearlyBreakdown: { year: number; value: number }[];
} {
  const years = endYear - startYear;
  const adjusted = amount * Math.pow(1 + annualRate / 100, years);
  const increase = adjusted - amount;
  const purchasingLoss = Math.round((1 - amount / adjusted) * 100 * 10) / 10;

  const yearlyBreakdown: { year: number; value: number }[] = [];
  for (let i = 0; i <= Math.min(years, 10); i++) {
    yearlyBreakdown.push({
      year: startYear + i,
      value: Math.round(amount * Math.pow(1 + annualRate / 100, i) * 100) / 100,
    });
  }

  return {
    adjusted: Math.round(adjusted * 100) / 100,
    increase: Math.round(increase * 100) / 100,
    purchasingLoss,
    yearlyBreakdown,
  };
}

const currentYear = new Date().getFullYear();

export default function InflationCalculatorPage() {
  const [amount, setAmount] = useState("1000");
  const [startYear, setStartYear] = useState("2010");
  const [endYear, setEndYear] = useState(String(currentYear));
  const [rate, setRate] = useState("3.5");
  const [currency, setCurrency] = useState("$");
  const [result, setResult] = useState<ReturnType<typeof calculateInflation> | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const sy = parseInt(startYear);
    const ey = parseInt(endYear);
    const r = parseFloat(rate);
    if (!a || !sy || !ey || !r || sy >= ey || r <= 0) return;
    setResult(calculateInflation(a, sy, ey, r));
  };

  const faqs = [
    { question: "What is inflation?", answer: "Inflation is the rate at which the general price level of goods and services rises, decreasing purchasing power over time." },
    { question: "What is a normal inflation rate?", answer: "Most central banks target 2% annual inflation as a healthy rate. Rates above 5% are considered high; above 10% is hyperinflation." },
    { question: "How does inflation affect savings?", answer: "If your savings earn less interest than the inflation rate, your money's purchasing power decreases over time even if the number grows." },
    { question: "What's Pakistan's inflation rate?", answer: "Pakistan has experienced elevated inflation often between 10–30% in recent years. You can use this calculator with your local rate for accurate results." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Amount */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Original Amount</label>
          <div className="flex gap-2">
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none bg-background">
              {["$", "£", "€", "₹", "₨", "¥"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={1} />
          </div>
        </div>

        {/* Inflation Rate */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Annual Inflation Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1"
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={0.1} max={100} />
          <p className="text-xs text-muted-foreground mt-1">Global average ≈ 3.5% | Pakistan ≈ 15–25%</p>
        </div>

        {/* Start Year */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Start Year</label>
          <input type="number" value={startYear} onChange={e => setStartYear(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={1900} max={currentYear - 1} />
        </div>

        {/* End Year */}
        <div>
          <label className="text-sm font-semibold mb-2 block">End Year</label>
          <input type="number" value={endYear} onChange={e => setEndYear(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={1901} max={currentYear + 50} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary hover:bg-primary/90 text-white">
        <TrendingUp className="w-4 h-4 mr-2" />Calculate Inflation
      </Button>

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5 space-y-4">
          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Adjusted Value", value: `${currency}${result.adjusted.toLocaleString()}`, color: "text-primary" },
              { label: "Total Increase", value: `+${currency}${result.increase.toLocaleString()}`, color: "text-red-500" },
              { label: "Purchasing Power Lost", value: `${result.purchasingLoss}%`, color: "text-amber-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-lg p-3">
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
          {/* Yearly breakdown */}
          <div>
            <p className="text-sm font-semibold mb-2">Year-by-Year Breakdown</p>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {result.yearlyBreakdown.map(b => (
                <div key={b.year} className="flex justify-between text-sm bg-white rounded-md px-3 py-1.5">
                  <span className="text-muted-foreground">{b.year}</span>
                  <span className="font-semibold">{currency}{b.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Inflation Calculator"
      toolDescription="Calculate the real value of money over time with our free inflation calculator. See how inflation erodes purchasing power and what today's money will be worth in the future."
      toolIcon={<TrendingUp className="w-8 h-8" />}
      category="Financial Tools"
      keywords={["inflation calculator", "simple inflation calculator", "purchasing power calculator", "money value over time", "real value of money", "pakistan inflation calculator"]}
      features={[
        "Custom inflation rate (use your country's rate)",
        "Year-by-year breakdown",
        "Shows purchasing power loss percentage",
        "Supports multiple currencies",
        "Works for future projections too",
        "No sign-up needed"
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
