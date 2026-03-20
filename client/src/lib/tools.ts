// My ToolVerse Tools Library
// All tools are client-side only for fast, secure processing

// 1. AI Content Detector
export const analyzeAIContent = (text: string): { isAI: number; confidence: number } => {
  if (!text.trim()) return { isAI: 0, confidence: 0 };

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  if (words.length < 10) {
    return { isAI: 50, confidence: 10 }; // Not enough data
  }

  // 1. Vocabulary Analysis (ChatGPT-isms & Humanisms)
  const aiBuzzwords = [
    "delve", "tapestry", "seamlessly", "furthermore", "moreover", "in conclusion",
    "testament", "crucial", "robust", "navigating", "landscape", "vital", "multifaceted",
    "underscore", "embark", "realm", "profound", "intricate", "paradigm", "leverage",
    "transformative", "comprehensive", "foster", "catalyst", "dynamic", "notably", "it is important to note"
  ];
  
  const humanWords = [
    "i", "me", "my", "we", "our", "us", "think", "guess", "feel", "maybe", "probably",
    "actually", "honestly", "literally", "basically", "pretty sure", "yeah", "stuff",
    "things", "anyway", "like", "lol", "kinda", "sorta", "totally", "wow", "omg"
  ];

  let aiWordCount = 0;
  let humanWordCount = 0;

  words.forEach(word => {
    if (aiBuzzwords.includes(word)) aiWordCount += 1.5;
    if (humanWords.includes(word)) humanWordCount += 1.5;
  });

  // Calculate phrases (2-3 words)
  const textLower = text.toLowerCase();
  if (textLower.includes("in summary")) aiWordCount += 2;
  if (textLower.includes("it should be noted")) aiWordCount += 2;
  if (textLower.includes("in today's digital age")) aiWordCount += 3;
  if (textLower.includes("in conclusion,")) aiWordCount += 3;
  if (textLower.includes("in my opinion")) humanWordCount += 2;

  // 2. Burstiness (Sentence Length Variation)
  // AI tends to have consistent sentence lengths. Humans vary from very short to very long.
  const sentenceLengths = sentences.map(s => (s.match(/\b\w+\b/g) || []).length);
  const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  
  let variance = 0;
  sentenceLengths.forEach(len => {
    variance += Math.pow(len - avgLen, 2);
  });
  const stdDev = Math.sqrt(variance / sentenceLengths.length);
  const burstinessScore = stdDev / avgLen; // Coefficient of variation

  // 3. Lexical Diversity (Unique words)
  const uniqueWords = new Set(words).size;
  const lexicalDiversity = uniqueWords / words.length;

  // Scoring Logic
  let aiProbability = 50; // Starting baseline

  // Factor 1: Buzzword ratio
  const vocabTotal = aiWordCount + humanWordCount;
  if (vocabTotal > 0) {
    const aiVocabRatio = aiWordCount / vocabTotal;
    aiProbability += (aiVocabRatio - 0.5) * 40; // Max impact: ±20
  }

  // Factor 2: Burstiness
  // High burstiness (> 0.6) = Human. Low burstiness (< 0.4) = AI.
  if (burstinessScore < 0.35) aiProbability += 25;
  else if (burstinessScore < 0.45) aiProbability += 10;
  else if (burstinessScore > 0.65) aiProbability -= 20;
  else if (burstinessScore > 0.8) aiProbability -= 30;

  // Factor 3: Lexical Diversity
  // AI usually has medium diversity (0.4 - 0.6). Humans can be very high or very low.
  if (lexicalDiversity > 0.7) aiProbability -= 15; // Very diverse = Human
  if (lexicalDiversity < 0.35) aiProbability -= 10; // Very repetitive = Usually human

  // Factor 4: Formatting
  // AI loves using lots of colons, bullet points, and perfectly crafted lists
  const colonCount = text.split(":").length - 1;
  if (colonCount > 2 && words.length < 200) aiProbability += 15;

  // Constrain bounds
  aiProbability = Math.max(1, Math.min(99, Math.round(aiProbability)));

  // Confidence based on text length
  let confidence = Math.min(words.length / 3, 95); 
  
  return {
    isAI: aiProbability,
    confidence: Math.round(confidence),
  };
};

// 2. SEO Meta Tag Generator
export const generateMetaTags = (
  title: string,
  description: string,
  keywords: string[]
): { title: string; description: string; keywords: string } => {
  // Optimize title (50-60 characters ideal)
  let optimizedTitle = title.substring(0, 60);
  if (title.length > 60) {
    optimizedTitle = optimizedTitle.substring(0, 57) + "...";
  }

  // Optimize description (150-160 characters ideal)
  let optimizedDescription = description.substring(0, 160);
  if (description.length > 160) {
    optimizedDescription = optimizedDescription.substring(0, 157) + "...";
  }

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: keywords.slice(0, 5).join(", "),
  };
};

// 3. Word Counter
export const countWords = (
  text: string
): {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
} => {
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;

  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(words / 200);
  const readingTime =
    readingTimeMinutes < 1 ? "Less than 1 minute" : `${readingTimeMinutes} minute${readingTimeMinutes > 1 ? "s" : ""}`;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
};

// 4. Case Converter
export const convertCase = (
  text: string,
  caseType: "uppercase" | "lowercase" | "titlecase" | "sentencecase" | "alternating" | "camelcase"
): string => {
  switch (caseType) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "titlecase":
      return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    case "sentencecase":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "alternating":
      return text
        .split("")
        .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join("");
    case "camelcase":
      return text
        .split(/\s+/)
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    default:
      return text;
  }
};

// 5. JSON Formatter
export const formatJSON = (
  jsonString: string
): { formatted: string; isValid: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      formatted: JSON.stringify(parsed, null, 2),
      isValid: true,
    };
  } catch (error) {
    return {
      formatted: jsonString,
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
};

export const minifyJSON = (jsonString: string): { minified: string; isValid: boolean } => {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      minified: JSON.stringify(parsed),
      isValid: true,
    };
  } catch {
    return {
      minified: jsonString,
      isValid: false,
    };
  }
};

// 6. Password Generator
export const generatePassword = (
  length: number = 16,
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  } = { uppercase: true, lowercase: true, numbers: true, symbols: true }
): string => {
  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  let availableChars = "";
  if (options.uppercase) availableChars += chars.uppercase;
  if (options.lowercase) availableChars += chars.lowercase;
  if (options.numbers) availableChars += chars.numbers;
  if (options.symbols) availableChars += chars.symbols;

  if (!availableChars) availableChars = chars.lowercase;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
  }

  return password;
};

export const calculatePasswordStrength = (password: string): "weak" | "medium" | "strong" => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength < 3) return "weak";
  if (strength < 5) return "medium";
  return "strong";
};

// 7. Unit Converter
export const convertUnits = (
  value: number,
  fromUnit: string,
  toUnit: string,
  category: string
): number => {
  const conversions: { [key: string]: { [key: string]: number | ((val: number, to: string) => number) } } = {
    length: {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      inch: 25.4,
      foot: 304.8,
      yard: 914.4,
      mile: 1609344,
    },
    weight: {
      mg: 1,
      g: 1000,
      kg: 1000000,
      oz: 28349.5,
      lb: 453592,
      ton: 1000000000,
    },
    temperature: {
      celsius: (val: number, to: string) => {
        if (to === "fahrenheit") return (val * 9) / 5 + 32;
        if (to === "kelvin") return val + 273.15;
        return val;
      },
      fahrenheit: (val: number, to: string) => {
        if (to === "celsius") return ((val - 32) * 5) / 9;
        if (to === "kelvin") return ((val - 32) * 5) / 9 + 273.15;
        return val;
      },
      kelvin: (val: number, to: string) => {
        if (to === "celsius") return val - 273.15;
        if (to === "fahrenheit") return ((val - 273.15) * 9) / 5 + 32;
        return val;
      },
    },
  };

  if (category === "temperature") {
    const tempConvert = conversions.temperature[fromUnit];
    if (typeof tempConvert === "function") {
      return tempConvert(value, toUnit);
    }
  }

  const fromFactor = conversions[category]?.[fromUnit];
  const toFactor = conversions[category]?.[toUnit];

  if (typeof fromFactor !== "number" || typeof toFactor !== "number") return value;

  return (value * fromFactor) / toFactor;
};

// 8. QR Code Generator (returns data URL)
export const generateQRCode = (text: string): string => {
  // Using QR Server API for simplicity
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
};

// 9. Lorem Ipsum Generator
export const generateLoremIpsum = (
  count: number,
  type: "paragraphs" | "sentences" | "words"
): string => {
  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
  ];

  const generateSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 5;
    let sentence = [];
    for (let i = 0; i < sentenceLength; i++) {
      sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return sentence.join(" ").charAt(0).toUpperCase() + sentence.join(" ").slice(1) + ".";
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    let paragraph = [];
    for (let i = 0; i < sentenceCount; i++) {
      paragraph.push(generateSentence());
    }
    return paragraph.join(" ");
  };

  if (type === "words") {
    let words = [];
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(" ");
  }

  if (type === "sentences") {
    let sentences = [];
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  }

  let paragraphs = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph());
  }
  return paragraphs.join("\n\n");
};

// 10. Image Resizer (returns canvas data URL)
export const resizeImage = (
  imageData: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = imageData;
  });
};
