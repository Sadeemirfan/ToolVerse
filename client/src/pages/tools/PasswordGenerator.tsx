import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import ToolPage from "@/components/ToolPage";
import { Key, Copy, RotateCw } from "lucide-react";
import { useState } from "react";
import { generatePassword, calculatePasswordStrength } from "@/lib/tools";
import { toast } from "sonner";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const handleGenerate = () => {
    const newPassword = generatePassword(length, {
      uppercase: useUppercase,
      lowercase: useLowercase,
      numbers: useNumbers,
      symbols: useSymbols,
    });
    setPassword(newPassword);
    setStrength(calculatePasswordStrength(newPassword));
    toast.success("Password generated!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "weak":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "strong":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const toolInterface = (
    <div className="space-y-6">
      {/* Generated Password Display */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Generated Password</label>
        <div className="flex gap-2">
          <div className="flex-1 p-4 bg-secondary/50 rounded-lg font-mono text-lg font-bold text-foreground break-all">
            {password || "Click Generate to create a password"}
          </div>
          <Button onClick={handleCopy} disabled={!password} className="bg-primary hover:bg-primary/90">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Strength Indicator */}
      {password && (
        <Card className="p-4 bg-secondary/30 border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Password Strength:</span>
            <span className={`text-sm font-bold uppercase ${getStrengthColor()}`}>{strength}</span>
          </div>
        </Card>
      )}

      {/* Length Slider */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-4 block">
          Password Length: <span className="text-primary">{length}</span>
        </label>
        <Slider value={[length]} onValueChange={(val) => setLength(val[0])} min={8} max={128} step={1} />
      </div>

      {/* Character Options */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground block">Include Characters</label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              checked={useUppercase}
              onCheckedChange={(checked) => setUseUppercase(checked as boolean)}
            />
            <label htmlFor="uppercase" className="text-sm text-foreground cursor-pointer">
              Uppercase (A-Z)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="lowercase"
              checked={useLowercase}
              onCheckedChange={(checked) => setUseLowercase(checked as boolean)}
            />
            <label htmlFor="lowercase" className="text-sm text-foreground cursor-pointer">
              Lowercase (a-z)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="numbers"
              checked={useNumbers}
              onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
            />
            <label htmlFor="numbers" className="text-sm text-foreground cursor-pointer">
              Numbers (0-9)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="symbols"
              checked={useSymbols}
              onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
            />
            <label htmlFor="symbols" className="text-sm text-foreground cursor-pointer">
              Symbols (!@#$%^&*)
            </label>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={handleGenerate} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
        <RotateCw className="w-4 h-4 mr-2" />
        Generate Password
      </Button>
    </div>
  );

  const faqs = [
    {
      question: "Why do I need a strong password?",
      answer:
        "A strong password protects your accounts from unauthorized access. Weak passwords can be easily guessed or cracked by hackers. A good password should be at least 12 characters long and include uppercase, lowercase, numbers, and symbols.",
    },
    {
      question: "How long should my password be?",
      answer:
        "We recommend a minimum of 12 characters for most accounts. For highly sensitive accounts (like email or banking), use 16 or more characters. Our tool allows you to generate passwords up to 128 characters.",
    },
    {
      question: "Should I use the same password everywhere?",
      answer:
        "No! Never reuse passwords across different accounts. If one account is compromised, all your accounts with that password become vulnerable. Use a unique password for each important account.",
    },
    {
      question: "Is my generated password stored anywhere?",
      answer:
        "No. All password generation happens in your browser. The password is never sent to our servers or stored anywhere. It only exists in your browser until you close the page.",
    },
    {
      question: "Can I use special characters in passwords?",
      answer:
        "Yes! Most websites allow special characters in passwords. In fact, including symbols makes your password much stronger. Our tool includes common symbols like !@#$%^&*.",
    },
  ];

  return (
    <ToolPage
      toolName="Password Generator"
      toolDescription="Create strong, random passwords instantly. Customize length and character types to meet any security requirement. Perfect for securing your accounts."
      toolIcon={<Key className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["password generator", "random password", "strong password", "security tool"]}
      features={[
        "Generate random passwords",
        "Customizable length (8-128 characters)",
        "Include/exclude character types",
        "Password strength indicator",
        "Copy to clipboard",
        "No data storage",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
