import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Dumbbell, Copy } from "lucide-react";
import { toast } from "sonner";

interface Exercise { name: string; sets: string; reps: string; rest: string; tip: string; }
interface Day { day: string; focus: string; exercises: Exercise[]; }

const WORKOUTS: Record<string, Day[]> = {
  beginner: [
    { day: "Day 1", focus: "Full Body", exercises: [{ name: "Push-Ups", sets: "3", reps: "8–10", rest: "60s", tip: "Keep your back straight and go slow on the way down" }, { name: "Bodyweight Squats", sets: "3", reps: "12–15", rest: "60s", tip: "Push your knees out and heels into the floor" }, { name: "Plank", sets: "3", reps: "20 sec", rest: "45s", tip: "Squeeze your core and breathe normally" }, { name: "Mountain Climbers", sets: "2", reps: "10 each leg", rest: "45s", tip: "Don't let your hips sag" }] },
    { day: "Day 2", focus: "Rest / Light Walk", exercises: [{ name: "Walk", sets: "1", reps: "20–30 min", rest: "—", tip: "A brisk walk boosts recovery and burns calories" }] },
    { day: "Day 3", focus: "Upper Body", exercises: [{ name: "Incline Push-Ups", sets: "3", reps: "10–12", rest: "60s", tip: "Use a table or countertop" }, { name: "Tricep Dips (chair)", sets: "3", reps: "8–10", rest: "60s", tip: "Keep your back close to the chair" }, { name: "Superman Hold", sets: "3", reps: "12", rest: "45s", tip: "Squeeze your glutes at the top" }] },
    { day: "Day 4", focus: "Lower Body", exercises: [{ name: "Reverse Lunges", sets: "3", reps: "10 each leg", rest: "60s", tip: "Step back far enough so your front knee stays over ankle" }, { name: "Glute Bridges", sets: "3", reps: "15", rest: "45s", tip: "Squeeze your glutes hard at the top" }, { name: "Calf Raises", sets: "3", reps: "20", rest: "30s", tip: "Do these slowly for better results" }] },
    { day: "Day 5", focus: "Core & Cardio", exercises: [{ name: "Jumping Jacks", sets: "3", reps: "30", rest: "30s", tip: "Warm up with these" }, { name: "Sit-Ups", sets: "3", reps: "12", rest: "45s", tip: "Don't pull your neck; cross arms over chest" }, { name: "High Knees", sets: "3", reps: "20 each", rest: "30s", tip: "Drive your knees as high as possible" }] },
    { day: "Day 6", focus: "Active Rest", exercises: [{ name: "Yoga / Stretching", sets: "1", reps: "20–30 min", rest: "—", tip: "Focus on hip flexors and chest" }] },
    { day: "Day 7", focus: "Rest", exercises: [{ name: "Full Rest Day", sets: "—", reps: "—", rest: "—", tip: "Sleep 7–9 hours and eat well to maximize recovery" }] },
  ],
  intermediate: [
    { day: "Day 1", focus: "Push (Chest + Triceps)", exercises: [{ name: "Diamond Push-Ups", sets: "4", reps: "10–12", rest: "60s", tip: "Targets triceps more than regular push-ups" }, { name: "Pike Push-Ups", sets: "3", reps: "8–10", rest: "60s", tip: "Great for shoulder development" }, { name: "Decline Push-Ups", sets: "3", reps: "10", rest: "60s", tip: "Keep hips level" }] },
    { day: "Day 2", focus: "Pull (Back + Biceps)", exercises: [{ name: "Pull-Ups (or inverted rows)", sets: "4", reps: "6–8", rest: "90s", tip: "Full range of motion — chin above bar" }, { name: "Towel Bicep Curl", sets: "3", reps: "12", rest: "60s", tip: "Use a door and a towel for resistance" }] },
    { day: "Day 3", focus: "Legs", exercises: [{ name: "Jump Squats", sets: "4", reps: "12", rest: "60s", tip: "Soft landing — absorb on the way down" }, { name: "Bulgarian Split Squat", sets: "3", reps: "10 each", rest: "90s", tip: "Rear foot elevated on a couch or chair" }, { name: "Single-Leg Glute Bridge", sets: "3", reps: "12 each", rest: "45s", tip: "Drive through your heel" }] },
    { day: "Day 4", focus: "Rest", exercises: [{ name: "Full Rest", sets: "—", reps: "—", rest: "—", tip: "Recovery is when growth happens" }] },
    { day: "Day 5", focus: "Full Body HIIT", exercises: [{ name: "Burpees", sets: "4", reps: "10", rest: "45s", tip: "Explosive push at the top" }, { name: "Speed Skaters", sets: "3", reps: "15 each", rest: "30s", tip: "Lateral movement for agility" }, { name: "Plank to Push-Up", sets: "3", reps: "10", rest: "45s", tip: "Control each movement" }] },
    { day: "Day 6", focus: "Core", exercises: [{ name: "Hanging Knee Raises", sets: "4", reps: "12", rest: "45s", tip: "Or use a sturdy door frame" }, { name: "Russian Twists", sets: "3", reps: "20 total", rest: "30s", tip: "Feet off ground for extra challenge" }] },
    { day: "Day 7", focus: "Rest", exercises: [{ name: "Full Rest Day", sets: "—", reps: "—", rest: "—", tip: "Light walk optional" }] },
  ],
};

export default function HomeWorkoutPlannerPage() {
  const [level, setLevel] = useState<"beginner" | "intermediate">("beginner");
  const [plan, setPlan] = useState<Day[] | null>(null);

  const generate = () => setPlan(WORKOUTS[level]);

  const copyPlan = () => {
    if (!plan) return;
    const text = plan.map(d =>
      `${d.day} — ${d.focus}\n${d.exercises.map(e => `  • ${e.name}: ${e.sets} sets × ${e.reps} (rest ${e.rest})`).join("\n")}`
    ).join("\n\n");
    navigator.clipboard.writeText(text);
    toast.success("Workout plan copied!");
  };

  const faqs = [
    { question: "Can I build muscle working out at home?", answer: "Yes! Progressive overload with bodyweight exercises builds lean muscle effectively. Consistency and proper nutrition are key." },
    { question: "How many days a week should I work out?", answer: "3–5 days per week is ideal for most people. Your muscles need 48 hours of rest before training the same muscle group again." },
    { question: "Do I need equipment for these workouts?", answer: "No equipment needed for the beginner plan. The intermediate plan uses a chair, towel, and optionally a door frame for rows." },
    { question: "How long before I see results?", answer: "Most people notice strength improvements in 2–3 weeks, and visible body changes in 6–8 weeks with consistent training and good nutrition." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold mb-2 block">Your Fitness Level</label>
        <div className="grid grid-cols-2 gap-3">
          {(["beginner", "intermediate"] as const).map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`py-3 rounded-lg border text-sm font-medium capitalize transition-all ${level === l ? "bg-primary text-white border-primary" : "border-border hover:border-primary/40"}`}>
              {l === "beginner" ? "🌱 Beginner" : "💪 Intermediate"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1 bg-primary hover:bg-primary/90 text-white">
          <Dumbbell className="w-4 h-4 mr-2" />Generate 7-Day Plan
        </Button>
        {plan && <Button variant="outline" onClick={copyPlan}><Copy className="w-4 h-4 mr-1" /> Copy</Button>}
      </div>

      {plan && (
        <div className="space-y-3">
          {plan.map(day => (
            <Card key={day.day} className="p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">{day.day}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{day.focus}</span>
              </div>
              {day.exercises.map(ex => (
                <div key={ex.name} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{ex.name}</p>
                    <p className="text-xs text-muted-foreground">{ex.sets} × {ex.reps} | rest {ex.rest}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">💡 {ex.tip}</p>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Home Workout Planner"
      toolDescription="Get a free, personalized 7-day home workout plan with no equipment needed. Beginner or intermediate — build strength and fitness from home with our free workout generator."
      toolIcon={<Dumbbell className="w-8 h-8" />}
      category="Health & Fitness Tools"
      keywords={["home workout planner", "home workout plan", "no equipment workout", "bodyweight workout plan", "free workout plan", "beginner workout at home", "home fitness plan"]}
      features={["7-day structured workout plan", "Beginner and Intermediate levels", "No equipment required", "Each exercise includes expert tips", "One-click copy full plan"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
