import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { GraduationCap } from "lucide-react";

function calcLoan(principal: number, annualRate: number, monthlyPayment: number) {
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let totalInterest = 0;
  let months = 0;

  if (monthlyRate === 0) {
    months = Math.ceil(principal / monthlyPayment);
    return { totalInterest: 0, months, totalPaid: principal, timeline: [] };
  }

  const minPay = balance * monthlyRate;
  if (monthlyPayment <= minPay) {
    return null; // payment too low
  }

  const timeline: { month: number; payment: number; interest: number; principal: number; balance: number }[] = [];

  while (balance > 0 && months < 600) {
    months++;
    const interestCharge = balance * monthlyRate;
    const principalCharge = Math.min(monthlyPayment - interestCharge, balance);
    balance -= principalCharge;
    totalInterest += interestCharge;
    if (months <= 24) {
      timeline.push({
        month: months,
        payment: Math.round((interestCharge + principalCharge) * 100) / 100,
        interest: Math.round(interestCharge * 100) / 100,
        principal: Math.round(principalCharge * 100) / 100,
        balance: Math.max(0, Math.round(balance * 100) / 100),
      });
    }
  }

  return {
    totalInterest: Math.round(totalInterest * 100) / 100,
    months,
    totalPaid: Math.round((principal + totalInterest) * 100) / 100,
    timeline,
  };
}

export default function StudentLoanCalculatorPage() {
  const [principal, setPrincipal] = useState("25000");
  const [rate, setRate] = useState("6.5");
  const [payment, setPayment] = useState("300");
  const [currency, setCurrency] = useState("$");
  const [result, setResult] = useState<ReturnType<typeof calcLoan>>(null);

  const calculate = () => {
    const r = calcLoan(parseFloat(principal), parseFloat(rate), parseFloat(payment));
    setResult(r);
  };

  const years = result ? Math.floor(result.months / 12) : 0;
  const remMonths = result ? result.months % 12 : 0;

  const faqs = [
    { question: "What is a student loan payoff calculator?", answer: "It calculates how long it will take to repay your student loan based on your balance, interest rate, and monthly payment amount." },
    { question: "How can I pay off my student loans faster?", answer: "Pay more than the minimum each month. Even an extra $50/month can save thousands in interest and years off your repayment." },
    { question: "What is the average student loan interest rate?", answer: "US federal student loans typically range from 5.5–8.5%. Private loans vary widely from 4–15% depending on credit score." },
    { question: "Is it better to pay off student loans or invest?", answer: "If your loan rate is higher than your expected investment return (usually ~7%), prioritize paying off the loan first." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold mb-2 block">Loan Balance</label>
          <div className="flex gap-2">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="px-3 py-2.5 border border-border rounded-lg text-sm bg-background">
              {["$", "£", "€", "₹", "₨"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={100} />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-2 block">Annual Interest Rate (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={0} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold mb-2 block">Monthly Payment ({currency})</label>
          <input type="number" value={payment} onChange={e => setPayment(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" min={1} />
        </div>
      </div>

      <Button onClick={calculate} className="w-full bg-primary hover:bg-primary/90 text-white">
        <GraduationCap className="w-4 h-4 mr-2" />Calculate Payoff Time
      </Button>

      {result === null && (
        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">Monthly payment is too low to cover interest. Please increase your payment amount.</div>
      )}

      {result && (
        <Card className="p-5 border border-primary/20 bg-primary/5 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Payoff Time", value: `${years}y ${remMonths}m`, color: "text-primary" },
              { label: "Total Paid", value: `${currency}${result.totalPaid.toLocaleString()}`, color: "text-foreground" },
              { label: "Total Interest", value: `${currency}${result.totalInterest.toLocaleString()}`, color: "text-red-500" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-lg p-3">
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          {result.timeline.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">First 24 Month Breakdown</p>
              <div className="max-h-48 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground sticky top-0 bg-primary/5">
                    <tr><th className="text-left py-1 px-2">Month</th><th className="text-right px-2">Interest</th><th className="text-right px-2">Principal</th><th className="text-right px-2">Balance</th></tr>
                  </thead>
                  <tbody>
                    {result.timeline.map(r => (
                      <tr key={r.month} className="border-t border-border/30 bg-white">
                        <td className="py-1 px-2">{r.month}</td>
                        <td className="text-right px-2 text-red-500">{currency}{r.interest}</td>
                        <td className="text-right px-2 text-green-600">{currency}{r.principal}</td>
                        <td className="text-right px-2">{currency}{r.balance.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Student Loan Payoff Calculator"
      toolDescription="Calculate exactly how long it will take to pay off your student loan and how much interest you'll pay. Free student loan repayment calculator — no sign-up needed."
      toolIcon={<GraduationCap className="w-8 h-8" />}
      category="Financial Tools"
      keywords={["student loan payoff calculator", "loan repayment calculator", "student loan calculator", "pay off student loans", "loan interest calculator", "education loan calculator"]}
      features={["Shows exact months to payoff", "Monthly breakdown table", "Total interest paid", "Multiple currency support", "Instant results"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
