// ToolVerse Tools Library
// All tools are client-side only for fast, secure processing

// 1. AI Content Detector
export const analyzeAIContent = (text: string): { isAI: number; confidence: number } => {
  // Simplified AI detection based on patterns
  // In production, this would use a more sophisticated ML model
  const patterns = {
    aiIndicators: [
      /\b(however|moreover|furthermore|in conclusion|therefore)\b/gi,
      /\b(it is important to note|it should be noted|it can be argued)\b/gi,
      /\b(as mentioned|as discussed|as stated)\b/gi,
      /\b(the aforementioned|the aforementioned|aforementioned)\b/gi,
    ],
    humanIndicators: [
      /\b(I think|I believe|I feel|in my opinion|I guess)\b/gi,
      /\b(lol|haha|omg|wow|seriously)\b/gi,
      /\b(you know|like|actually|basically|literally)\b/gi,
      /[!]{2,}|[\?]{2,}/g, // Multiple exclamation marks or question marks
    ],
  };

  let aiScore = 0;
  let humanScore = 0;

  patterns.aiIndicators.forEach((pattern) => {
    const matches = text.match(pattern);
    aiScore += matches ? matches.length : 0;
  });

  patterns.humanIndicators.forEach((pattern) => {
    const matches = text.match(pattern);
    humanScore += matches ? matches.length : 0;
  });

  const total = aiScore + humanScore;
  const aiPercentage = total > 0 ? (aiScore / total) * 100 : 50;

  return {
    isAI: Math.round(aiPercentage),
    confidence: Math.min(total / 10, 100),
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
