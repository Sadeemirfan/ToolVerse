import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolPage from "@/components/ToolPage";
import { Zap, Copy } from "lucide-react";
import { useState } from "react";
import { convertUnits } from "@/lib/tools";
import { toast } from "sonner";

type Category = "length" | "weight" | "temperature";

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [result, setResult] = useState("");

  const units: { [key in Category]: string[] } = {
    length: ["mm", "cm", "m", "km", "inch", "foot", "yard", "mile"],
    weight: ["mg", "g", "kg", "oz", "lb", "ton"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
  };

  const handleConvert = () => {
    if (!value || isNaN(Number(value))) {
      toast.error("Please enter a valid number");
      return;
    }
    const converted = convertUnits(Number(value), fromUnit, toUnit, category);
    setResult(converted.toFixed(4));
    toast.success("Conversion complete!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${value} ${fromUnit} = ${result} ${toUnit}`);
    toast.success("Result copied!");
  };

  const toolInterface = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Category</label>
        <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="length">Length</SelectItem>
            <SelectItem value="weight">Weight</SelectItem>
            <SelectItem value="temperature">Temperature</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">From</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="p-3"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units[category].map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">To</label>
          <div className="flex gap-2">
            <Input value={result} readOnly className="p-3 bg-secondary/50" />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units[category].map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button onClick={handleConvert} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        Convert
      </Button>

      {result && (
        <div className="space-y-4">
          <Card className="p-4 bg-secondary/30 border-0 text-center">
            <p className="text-sm text-muted-foreground mb-2">Result</p>
            <p className="text-2xl font-bold text-primary">
              {value} {fromUnit} = {result} {toUnit}
            </p>
          </Card>

          <Button onClick={handleCopy} className="w-full bg-primary hover:bg-primary/90">
            <Copy className="w-4 h-4 mr-2" />
            Copy Result
          </Button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <Card className="p-2 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Length</div>
          <div className="text-xs text-foreground/70">Distances</div>
        </Card>
        <Card className="p-2 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Weight</div>
          <div className="text-xs text-foreground/70">Mass</div>
        </Card>
        <Card className="p-2 bg-secondary/30 border-0 text-center">
          <div className="text-xs font-semibold text-foreground">Temperature</div>
          <div className="text-xs text-foreground/70">Heat</div>
        </Card>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What units can I convert?",
      answer:
        "We support length (mm, cm, m, km, inch, foot, yard, mile), weight (mg, g, kg, oz, lb, ton), and temperature (Celsius, Fahrenheit, Kelvin) conversions.",
    },
    {
      question: "Is the conversion accurate?",
      answer:
        "Yes, our conversions use standard conversion factors and are accurate to 4 decimal places. For most practical purposes, this level of precision is more than sufficient.",
    },
    {
      question: "Can I convert between different unit types?",
      answer:
        "No, you can only convert within the same category (e.g., length to length). You cannot convert length to weight. Select the appropriate category first.",
    },
    {
      question: "What's the difference between Celsius, Fahrenheit, and Kelvin?",
      answer:
        "Celsius and Fahrenheit are temperature scales used in everyday life. Kelvin is the absolute temperature scale used in science. 0 Kelvin is absolute zero.",
    },
    {
      question: "Is my data stored?",
      answer:
        "No. All conversions happen in your browser. Your data is never sent to our servers and is not stored anywhere.",
    },
  ];

  return (
    <ToolPage
      toolName="Unit Converter"
      toolDescription="Convert between different units of length, weight, and temperature instantly. Perfect for students, engineers, and professionals."
      toolIcon={<Zap className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["unit converter", "length converter", "weight converter", "temperature converter"]}
      features={[
        "Convert length, weight, temperature",
        "Multiple unit options",
        "Accurate to 4 decimal places",
        "Real-time conversion",
        "Copy results",
        "No data storage",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
