import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Beef, Info } from "lucide-react";

interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

function calculateMacros(
  weight: number,
  unit: "kg" | "lbs",
  goal: string,
  activity: string
): MacroResult {
  const kg = unit === "lbs" ? weight * 0.453592 : weight;

  // Activity multiplier for TDEE
  const activityMap: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
  };
  const bmr = kg * 22; // simplified Mifflin
  const tdee = bmr * (activityMap[activity] ?? 1.55);

  // Calorie adjust by goal
  const goalAdjust: Record<string, number> = {
    lose: -500,
    maintain: 0,
    gain: 300,
  };
  const calories = Math.round(tdee + (goalAdjust[goal] ?? 0));

  // Macro splits
  let proteinPct = 0.3, carbPct = 0.45, fatPct = 0.25;
  if (goal === "gain") { proteinPct = 0.35; carbPct = 0.45; fatPct = 0.2; }
  if (goal === "lose") { proteinPct = 0.4; carbPct = 0.35; fatPct = 0.25; }

  return {
    calories,
    protein: Math.round((calories * proteinPct) / 4),
    carbs: Math.round((calories * carbPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
    fiber: Math.round(calories / 100),
  };
}

const MACRO_BAR_COLORS = { protein: "#7c3aed", carbs: "#2563eb", fat: "#f59e0b" };

export default function MacroNutrientCalculatorPage() {
  const [weight, setWeight] = useState("75");
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [goal, setGoal] = useState("maintain");
  const [activity, setActivity] = useState("moderate");
  const [result, setResult] = useState<MacroResult | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return;
    setResult(calculateMacros(w, unit, goal, activity));
  };

  const faqs = [
    { question: "What are macronutrients?", answer: "Macronutrients (macros) are the three main nutrients: protein, carbohydrates, and fat. Each provides calories and serves specific body functions." },
    { question: "How much protein do I need daily?", answer: "For most people, 0.8–1.2g of protein per pound of bodyweight is recommended. Athletes or those building muscle may need more (1.2–2g/kg)." },
    { question: "Should I count calories or macros?", answer: "Counting macros is more effective than just counting calories because it ensures you're getting the right balance of nutrients, not just hitting a calorie number." },
    { question: "What's the best macro split for weight loss?", answer: "A high-protein, moderate-carb, moderate-fat split (40/35/25) is generally effective for fat loss while preserving muscle mass." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Weight */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Body Weight</label>
          <div className="flex gap-2">
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
              className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={30} max={300} />
            <div className="flex border border-border rounded-lg overflow-hidden">
              {(["kg", "lbs"] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${unit === u ? "bg-primary text-white" : "hover:bg-muted"}`}>{u}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Activity */}
        <div>
          <label className="text-sm font-semibold mb-2 block">Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)}
            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background">
            <option value="sedentary">Sedentary (desk job)</option>
            <option value="light">Light (1–3x/week)</option>
            <option value="moderate">Moderate (3–5x/week)</option>
            <option value="active">Active (6–7x/week)</option>
            <option value="very-active">Very Active (athlete)</option>
          </select>
        </div>

        {/* Goal */}
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold mb-2 block">Your Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {[["lose", "🔥 Lose Fat"], ["maintain", "⚖️ Maintain"], ["gain", "💪 Build Muscle"]].map(([val, label]) => (
              <button key={val} onClick={() => setGoal(val)}
                className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${goal === val ? "bg-primary text-white border-primary" : "border-border hover:border-primary/40"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary hover:bg-primary/90 text-white">
        <Beef className="w-4 h-4 mr-2" />Calculate My Macros
      </Button>

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5 space-y-4">
          {/* Calories */}
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{result.calories.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">calories per day</p>
          </div>

          {/* Macro bars */}
          <div className="flex rounded-full overflow-hidden h-4">
            {(["protein", "carbs", "fat"] as const).map(macro => {
              const total = result.protein + result.carbs + result.fat;
              const val = macro === "protein" ? result.protein : macro === "carbs" ? result.carbs : result.fat;
              return <div key={macro} style={{ width: `${(val / total) * 100}%`, backgroundColor: MACRO_BAR_COLORS[macro] }} />;
            })}
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Protein", value: result.protein, unit: "g", color: "text-purple-600" },
              { label: "Carbs", value: result.carbs, unit: "g", color: "text-blue-600" },
              { label: "Fat", value: result.fat, unit: "g", color: "text-amber-600" },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-lg p-3">
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}{m.unit}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-white p-2 rounded-lg">
            <Info className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
            Aim for at least {result.fiber}g of dietary fiber daily. Recommended daily water: 2.5–3.5L.
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Macro Nutrient Calculator"
      toolDescription="Calculate your ideal daily macros — protein, carbs, and fat — based on your weight, activity level, and fitness goals. Free macro calculator for weight loss, muscle gain, and maintenance."
      toolIcon={<Beef className="w-8 h-8" />}
      category="Health & Fitness Tools"
      keywords={["macro calculator", "macronutrient calculator", "daily macros", "protein carbs fat calculator", "macro split", "macro goals", "keto macros", "TDEE calculator"]}
      features={[
        "Personalized to your weight, activity & goal",
        "Shows protein, carbs, fat and calories",
        "Visual macro split bar",
        "Supports kg & lbs",
        "Instant results — no sign-up needed",
        "Based on TDEE calculations"
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
