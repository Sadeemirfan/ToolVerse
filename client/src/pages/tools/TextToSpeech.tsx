import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Volume2, Square, Play } from "lucide-react";
import { toast } from "sonner";

export default function TextToSpeechPage() {
  const [text, setText] = useState("Hello! Welcome to My ToolVerse. This is the Text to Speech tool. Type any text here and click Play to hear it spoken aloud.");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voice, setVoice] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Only fetch voices once on mount, or when voice list changes
  // This prevents the OS-level TTS engine from freezing the browser on every keystroke
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = () => {
    if (!text.trim()) { toast.error("Enter some text first."); return; }
    if (!("speechSynthesis" in window)) { toast.error("Your browser does not support Text to Speech."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    if (voice) {
      const v = window.speechSynthesis.getVoices().find(v => v.name === voice);
      if (v) utterance.voice = v;
    }
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => { setSpeaking(false); toast.error("Speech error. Try again."); };
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  const faqs = [
    { question: "What is Text to Speech?", answer: "Text to Speech (TTS) converts written text into spoken audio using your browser's built-in speech synthesis engine." },
    { question: "What voices are available?", answer: "Available voices depend on your operating system and browser. Most systems include English voices; some support multiple languages." },
    { question: "Can I adjust speed and pitch?", answer: "Yes! Use the Rate slider to control speaking speed (0.5x to 2x) and the Pitch slider to adjust the voice pitch." },
    { question: "Does this work offline?", answer: "Yes! Text to Speech uses your browser's built-in speech engine and works without an internet connection." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold mb-2 block">Text to Speak</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          placeholder="Type or paste text here..."
          className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <p className="text-xs text-muted-foreground mt-1">{text.length} characters</p>
      </div>

      {voices.length > 0 && (
        <div>
          <label className="text-sm font-semibold mb-2 block">Voice</label>
          <select
            value={voice}
            onChange={e => setVoice(e.target.value)}
            className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none"
          >
            <option value="">Default</option>
            {voices.map(v => (
              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Speed", value: rate, setter: setRate, min: 0.5, max: 2, step: 0.1, display: `${rate}x` },
          { label: "Pitch", value: pitch, setter: setPitch, min: 0, max: 2, step: 0.1, display: pitch.toFixed(1) },
          { label: "Volume", value: volume, setter: setVolume, min: 0, max: 1, step: 0.1, display: `${Math.round(volume * 100)}%` },
        ].map(({ label, value, setter, min, max, step, display }) => (
          <Card key={label} className="p-3 bg-secondary/30 border-0">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold">{label}</span>
              <span className="text-xs text-primary font-bold">{display}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={e => setter(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={speak} disabled={speaking} className="bg-primary hover:bg-primary/90 text-white flex-1">
          <Play className="w-4 h-4 mr-2" /> {speaking ? "Speaking..." : "Play"}
        </Button>
        {speaking && (
          <Button onClick={stop} variant="outline">
            <Square className="w-4 h-4 mr-2" /> Stop
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ToolPage
      toolName="Text to Speech"
      toolDescription="Convert any text to speech instantly using your browser. Adjust speed, pitch, and volume. Choose from multiple voices. Free, offline-capable TTS tool."
      toolIcon={<Volume2 className="w-8 h-8" />}
      category="Utility Tools"
      keywords={["text to speech", "tts", "speech synthesis", "read aloud", "text reader", "voice generator"]}
      features={["Instant text to speech", "Adjustable speed (0.5x – 2x)", "Pitch and volume control", "Multiple voice options", "Works offline", "No sign-up needed"]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
