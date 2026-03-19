import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Clock, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));

  const tsToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) return null;
    const ms = ts > 1e10 ? ts : ts * 1000;
    return new Date(ms);
  };

  const dateToTs = () => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return null;
    return Math.floor(d.getTime() / 1000);
  };

  const parsedDate = tsToDate();
  const parsedTs = dateToTs();

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied!");
  };

  const now = () => {
    const n = Math.floor(Date.now() / 1000);
    setTimestamp(String(n));
    setDateInput(new Date().toISOString().slice(0, 16));
  };

  const faqs = [
    { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 (UTC). It is a universal way to represent dates and times in programming." },
    { question: "What is the difference between seconds and milliseconds timestamps?", answer: "Unix timestamps are typically in seconds (10 digits). JavaScript uses milliseconds (13 digits). This tool automatically detects both formats." },
    { question: "What timezone is used?", answer: "The tool shows your local timezone and UTC. Unix timestamps are always in UTC internally." },
    { question: "What is the maximum Unix timestamp?", answer: "The 32-bit max is 2,147,483,647 (January 19, 2038). Modern 64-bit systems support much larger values." },
  ];

  const toolInterface = (
    <div className="space-y-6">
      <Button onClick={now} variant="outline" size="sm">
        <RefreshCw className="w-4 h-4 mr-2" /> Use Current Time
      </Button>

      {/* Timestamp → Date */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Unix Timestamp → Human Date</label>
        <div className="flex gap-2">
          <input
            value={timestamp}
            onChange={e => setTimestamp(e.target.value)}
            className="flex-1 p-3 border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="1700000000"
          />
        </div>
        {parsedDate ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {[
              { label: "Local Time", value: parsedDate.toLocaleString() },
              { label: "UTC Time", value: parsedDate.toUTCString() },
              { label: "ISO 8601", value: parsedDate.toISOString() },
              { label: "Milliseconds", value: String(parsedDate.getTime()) },
            ].map(({ label, value }) => (
              <Card key={label} className="p-3 bg-secondary/30 border-0 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">{label}</p>
                  <p className="text-sm font-mono">{value}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => copy(value)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-red-600 mt-2">Invalid timestamp</p>
        )}
      </div>

      {/* Date → Timestamp */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Date/Time → Unix Timestamp</label>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            className="flex-1 p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {parsedTs !== null ? (
          <Card className="p-3 bg-secondary/30 border-0 flex items-center justify-between gap-2 mt-3">
            <div>
              <p className="text-xs text-muted-foreground font-semibold">Unix Timestamp (seconds)</p>
              <p className="text-lg font-mono font-bold text-primary">{parsedTs}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => copy(String(parsedTs))}>
              <Copy className="w-4 h-4" />
            </Button>
          </Card>
        ) : (
          <p className="text-sm text-red-600 mt-2">Invalid date</p>
        )}
      </div>
    </div>
  );

  return (
    <ToolPage
      toolName="Timestamp Converter"
      toolDescription="Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, local time, UTC, and ISO 8601 formats."
      toolIcon={<Clock className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp", "timestamp to date"]}
      features={[
        "Unix timestamp to date/time",
        "Date to Unix timestamp",
        "Local, UTC, and ISO 8601 output",
        "Milliseconds support",
        "Copy any value instantly",
        "Current time shortcut",
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
