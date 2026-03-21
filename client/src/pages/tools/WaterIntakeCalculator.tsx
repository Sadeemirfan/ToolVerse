import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Droplets, Info } from "lucide-react";

interface Result {
  liters: number;
  cups: number;
  oz: number;
  recommendation: string;
  breakdown: { label: string; amount: string }[];
}

function calculate(weight: number, unit: "kg" | "lbs", activity: string, climate: string, gender: string): Result {
  const weightKg = unit === "lbs" ? weight * 0.453592 : weight;

  // Base: 35ml per kg body weight
  let base = weightKg * 35;

  // Activity factor
  const activityMap: Record<string, number> = {
    sedentary: 0,
    light: 350,
    moderate: 600,
    active: 900,
    "very-active": 1200,
  };
  base += activityMap[activity] ?? 0;

  // Climate factor
  if (climate === "hot") base += 500;
  if (climate === "very-hot") base += 1000;

  // Gender adjustment
  if (gender === "female") base *= 0.9;

  const liters = Math.round(base) / 1000;
  const cups = Math.round(liters * 4.167 * 10) / 10;
  const oz = Math.round(liters * 33.814 * 10) / 10;

  let recommendation = "Good baseline for your lifestyle.";
  if (liters >= 3.5) recommendation = "High activity / hot climate — stay consistent!";
  if (liters < 2) recommendation = "Increase fluids — aim for more whole foods and veggies too.";

  const breakdown = [
    { label: "Morning (wake up)", amount: `${Math.round(liters * 0.2 * 100) / 100}L` },
    { label: "Before lunch", amount: `${Math.round(liters * 0.25 * 100) / 100}L` },
    { label: "Afternoon", amount: `${Math.round(liters * 0.25 * 100) / 100}L` },
    { label: "Evening", amount: `${Math.round(liters * 0.2 * 100) / 100}L` },
    { label: "Before sleep", amount: `${Math.round(liters * 0.1 * 100) / 100}L` },
  ];

  return { liters: Math.round(liters * 100) / 100, cups, oz, recommendation, breakdown };
}

export default function WaterIntakeCalculatorPage() {
  const [weight, setWeight] = useState<string>("70");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("normal");
  const [gender, setGender] = useState("male");
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0 || w > 500) return;
    setResult(calculate(w, unit, activity, climate, gender));
  };

  const faqs = [
    { question: "How much water should I drink per day?", answer: "The general guideline is 2–3.5 liters (8–15 cups) per day, varying by weight, activity level, and climate. This calculator gives a personalized estimate." },
    { question: "Does coffee and tea count toward daily water intake?", answer: "Yes, beverages like coffee, tea, and juice contribute to total fluid intake, though water is always the best choice." },
    { question: "What happens if I drink too little water?", answer: "Dehydration causes fatigue, headaches, poor concentration, and in severe cases, kidney problems. Even mild dehydration (1-2%) affects performance." },
    { question: "Should I drink more water during exercise?", answer: "Yes. Aim for 500ml before exercise, 200ml every 20 minutes during, and 500ml after to replace sweat losses." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weight */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Body Weight</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              min={20} max={300}
            />
            <div className="flex border border-border rounded-lg overflow-hidden">
              {(["kg", "lbs"] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${unit === u ? "bg-primary text-white" : "hover:bg-muted"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Gender</label>
          <div className="flex border border-border rounded-lg overflow-hidden">
            {[["male", "Male"], ["female", "Female"]].map(([val, label]) => (
              <button key={val} onClick={() => setGender(val)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${gender === val ? "bg-primary text-white" : "hover:bg-muted"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background">
            <option value="sedentary">Sedentary (desk job, no exercise)</option>
            <option value="light">Light (1–3 days/week exercise)</option>
            <option value="moderate">Moderate (3–5 days/week)</option>
            <option value="active">Active (6–7 days/week)</option>
            <option value="very-active">Very Active (athlete / hard labor)</option>
          </select>
        </div>

        {/* Climate */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Climate / Environment</label>
          <select value={climate} onChange={e => setClimate(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background">
            <option value="normal">Normal / Temperate</option>
            <option value="hot">Hot (30°C+)</option>
            <option value="very-hot">Very Hot / Humid (35°C+)</option>
          </select>
        </div>
      </div>

      <Button onClick={handleCalculate} className="w-full bg-primary hover:bg-primary/90 text-white">
        <Droplets className="w-4 h-4 mr-2" />Calculate My Water Intake
      </Button>

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5 space-y-4">
          {/* Main Result */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{result.liters}L</p>
              <p className="text-xs text-muted-foreground">per day</p>
            </div>
            <div className="flex gap-4 text-center">
              <div><p className="text-xl font-bold">{result.cups}</p><p className="text-xs text-muted-foreground">cups</p></div>
              <div><p className="text-xl font-bold">{result.oz}</p><p className="text-xs text-muted-foreground">fl oz</p></div>
            </div>
            <div className="flex-1 min-w-[150px]">
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-white p-2 rounded-lg">
                <Info className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                {result.recommendation}
              </div>
            </div>
          </div>
          {/* Schedule */}
          <div>
            <p className="text-sm font-semibold mb-2">Suggested Daily Schedule</p>
            <div className="grid gap-1.5">
              {result.breakdown.map(b => (
                <div key={b.label} className="flex justify-between text-sm bg-white rounded-md px-3 py-1.5">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-semibold text-primary">{b.amount}</span>
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
      toolName="Daily Water Intake Calculator"
      toolDescription="Calculate exactly how much water you should drink daily based on your weight, gender, activity level, and climate. Free personalized hydration calculator."
      toolIcon={<Droplets className="w-8 h-8" />}
      category="Health & Fitness Tools"
      keywords={["water intake calculator", "daily water intake", "how much water should I drink", "hydration calculator", "water calculator", "drink water daily"]}
      features={[
        "Personalized based on weight, gender, activity & climate",
        "Results in Liters, Cups and Fluid Oz",
        "Daily hydration schedule breakdown",
        "No sign-up required — instant results",
        "Based on scientific hydration guidelines"
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
