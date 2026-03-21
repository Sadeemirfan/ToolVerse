import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Hash, Copy, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

const HASHTAG_DATABASE: Record<string, string[]> = {
  // Fitness & Health
  fitness: ["#fitness", "#workout", "#gym", "#fitnessmotivation", "#fitlife", "#healthylifestyle", "#exercise", "#motivation", "#health", "#bodybuilding", "#personaltrainer", "#fitfam", "#strong", "#training", "#gains"],
  health: ["#health", "#healthy", "#wellness", "#selfcare", "#healthyeating", "#nutrition", "#mentalhealth", "#wellbeing", "#healthyliving", "#fit", "#lifestyle", "#mindfulness", "#cleaneating", "#organic", "#yoga"],
  yoga: ["#yoga", "#yogalife", "#yogapractice", "#meditation", "#namaste", "#yogainspiration", "#asana", "#mindfulness", "#breathe", "#zenlife", "#flexibility", "#balance", "#yogaeveryday", "#yogi", "#spiritual"],

  // Food & Cooking
  food: ["#food", "#foodie", "#foodporn", "#instafood", "#yummy", "#delicious", "#cooking", "#recipe", "#homemade", "#tasty", "#foodphotography", "#eat", "#dinner", "#lunch", "#breakfast"],
  cooking: ["#cooking", "#recipe", "#homemade", "#chef", "#foodie", "#kitchen", "#baking", "#cook", "#meal", "#dinner", "#culinary", "#foodlover", "#homecooking", "#eatwell", "#feedfeed"],
  vegan: ["#vegan", "#plantbased", "#veganfood", "#veganism", "#crueltyfree", "#govegan", "#veganlife", "#plantbasedfood", "#veganrecipes", "#vegancommunity", "#whatveganseat", "#veganish", "#wholefood", "#eatgreen", "#veganmeal"],

  // Fashion & Beauty
  fashion: ["#fashion", "#style", "#ootd", "#outfitoftheday", "#fashionista", "#instafashion", "#clothing", "#streetstyle", "#fashionblogger", "#trendy", "#look", "#outfit", "#stylish", "#wiwt", "#model"],
  beauty: ["#beauty", "#makeup", "#skincare", "#beautytips", "#glam", "#cosmetics", "#beautyblogger", "#makeuplover", "#beautyroutine", "#glow", "#selfcare", "#skincareroutine", "#beautyhacks", "#eyeshadow", "#lipstick"],
  makeup: ["#makeup", "#makeupoftheday", "#makeuplook", "#makeuplife", "#beautyguru", "#makeupjunkie", "#makeuptutorial", "#contour", "#highlighter", "#mua", "#makeupbyme", "#eyemakeup", "#lipcolor", "#makeupforever", "#glam"],

  // Travel & Lifestyle
  travel: ["#travel", "#travelgram", "#wanderlust", "#traveling", "#travelphotography", "#instatravel", "#traveler", "#explore", "#adventure", "#vacation", "#trip", "#world", "#tourism", "#visittheworld", "#travellife"],
  lifestyle: ["#lifestyle", "#motivation", "#inspiration", "#life", "#positivevibes", "#happy", "#love", "#instagood", "#photooftheday", "#beautiful", "#daily", "#goals", "#mindset", "#success", "#blessed"],

  // Business & Finance
  business: ["#business", "#entrepreneur", "#success", "#marketing", "#motivation", "#startup", "#hustle", "#entrepreneurship", "#businessowner", "#money", "#leadership", "#growth", "#smallbusiness", "#investing", "#wealth"],
  money: ["#money", "#finance", "#investing", "#wealth", "#financialfreedom", "#personalfinance", "#investment", "#millionaire", "#passive income", "#savings", "#budgeting", "#stockmarket", "#crypto", "#realestate", "#makemoney"],

  // Technology
  tech: ["#tech", "#technology", "#coding", "#programming", "#developer", "#software", "#ai", "#artificialintelligence", "#innovation", "#digital", "#cybersecurity", "#machinelearning", "#startup", "#gadgets", "#future"],
  coding: ["#coding", "#programming", "#developer", "#code", "#softwaredeveloper", "#webdevelopment", "#javascript", "#python", "#html", "#css", "#fullstack", "#frontend", "#backend", "#codenewbie", "#100daysofcode"],

  // Art & Design
  art: ["#art", "#artwork", "#artist", "#drawing", "#painting", "#design", "#creative", "#illustration", "#artoftheday", "#digitalart", "#sketch", "#artlover", "#instaart", "#modernart", "#colorful"],
  photography: ["#photography", "#photo", "#photographer", "#photooftheday", "#picoftheday", "#instaphoto", "#naturephotography", "#portrait", "#streetphotography", "#travel photography", "#canon", "#nikon", "#lightroom", "#adobe", "#photoshoot"],

  // Music & Entertainment
  music: ["#music", "#musician", "#musica", "#newmusic", "#hiphop", "#rap", "#pop", "#rnb", "#singer", "#songwriter", "#producer", "#beats", "#studio", "#concert", "#livemusic"],
  dance: ["#dance", "#dancing", "#dancer", "#choreography", "#ballet", "#hiphop", "#dancelife", "#dancevideo", "#danceclass", "#contemporary", "#salsa", "#moves", "#dancecover", "#freestyle", "#viral"],

  // Pets & Animals
  dog: ["#dog", "#dogsofinstagram", "#puppy", "#dogs", "#doglovers", "#doglove", "#dogoftheday", "#doglife", "#pets", "#cutedogs", "#puppylove", "#doggo", "#goldenretriever", "#husky", "#labrador"],
  cat: ["#cat", "#catsofinstagram", "#cats", "#kitten", "#catlovers", "#catlover", "#meow", "#catlife", "#catoftheday", "#kitty", "#pets", "#catphotography", "#fluffycat", "#catmom", "#catsagram"],

  // Education
  education: ["#education", "#learning", "#study", "#student", "#knowledge", "#school", "#college", "#university", "#teacher", "#teaching", "#onlinelearning", "#edtech", "#studymotivation", "#studyabroad", "#scholarship"],
  motivation: ["#motivation", "#success", "#hustle", "#mindset", "#goals", "#inspiration", "#positive", "#believe", "#winning", "#grind", "#nevergiveup", "#hardwork", "#focus", "#determined", "#achieve"],

  // TikTok specific trending
  tiktok: ["#foryou", "#fyp", "#foryoupage", "#viral", "#trending", "#tiktok", "#tiktoktrend", "#blowup", "#explore", "#fypシ", "#xyzabc", "#foru", "#trending", "#tiktokviral", "#recommended"],
  viral: ["#viral", "#trending", "#fyp", "#foryou", "#blowup", "#explore", "#recommended", "#goviral", "#viralvideo", "#foryoupage", "#trend", "#trendingvideo", "#viraltiktok", "#foryoupage", "#tren"],
};

function getHashtags(topic: string): string[] {
  const lower = topic.toLowerCase().trim();
  const results = new Set<string>();

  // Direct match
  if (HASHTAG_DATABASE[lower]) {
    HASHTAG_DATABASE[lower].forEach(h => results.add(h));
  }

  // Partial match
  Object.keys(HASHTAG_DATABASE).forEach(key => {
    if (lower.includes(key) || key.includes(lower)) {
      HASHTAG_DATABASE[key].forEach(h => results.add(h));
    }
  });

  // Always add generic TikTok boosters
  HASHTAG_DATABASE.tiktok.slice(0, 5).forEach(h => results.add(h));

  if (results.size === 0) {
    // Generic hashtags if no match
    return [
      `#${lower.replace(/\s+/g, "")}`,
      `#${lower.replace(/\s+/g, "")}tiktok`,
      `#${lower.replace(/\s+/g, "")}video`,
      "#fyp", "#foryou", "#foryoupage", "#viral", "#trending",
      "#explore", "#blowup", "#content", "#creator", "#tiktokviral"
    ];
  }

  return Array.from(results).slice(0, 30);
}

const POPULAR_TOPICS = [
  "Fitness", "Food", "Travel", "Fashion", "Beauty",
  "Music", "Dance", "Dog", "Art", "Coding",
  "Business", "Motivation", "Yoga", "Cooking", "Photography"
];

export default function HashtagGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(20);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = (topicOverride?: string) => {
    const t = topicOverride ?? topic;
    if (!t.trim()) { toast.error("Please enter a topic first."); return; }
    const tags = getHashtags(t);
    setHashtags(tags.slice(0, count));
    setGenerated(true);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast.success("All hashtags copied!");
  };

  const copyOne = (tag: string) => {
    navigator.clipboard.writeText(tag);
    toast.success(`${tag} copied!`);
  };

  const faqs = [
    { question: "How many hashtags should I use on TikTok?", answer: "TikTok recommends 3–5 highly relevant hashtags rather than using all 30 allowed. Quality beats quantity." },
    { question: "What is #fyp and should I use it?", answer: "#fyp (For You Page) is one of TikTok's most used tags. It doesn't guarantee virality but signals your target feed to the algorithm." },
    { question: "Can I use the same hashtags every video?", answer: "It's fine to mix consistent tags with video-specific ones. Rotate trending tags to reach new audiences." },
    { question: "Are these hashtags free to use?", answer: "Absolutely! All hashtags generated here are free to copy and use on TikTok, Instagram Reels, or YouTube Shorts." },
    { question: "How do I find low-competition hashtags?", answer: "Use niche-specific tags with moderate view counts (100k–5M) rather than massive tags with billions of views where you'll get buried." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      {/* Input */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Your Topic / Niche</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && generate()}
            placeholder="e.g. fitness, food, travel, coding..."
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={() => generate()} className="bg-primary hover:bg-primary/90 text-white">
            <Sparkles className="w-4 h-4 mr-2" />Generate
          </Button>
        </div>
      </div>

      {/* Count Selector */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Number of Hashtags: <span className="text-primary">{count}</span></label>
        <input
          type="range" min={5} max={30} step={5}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>5 (focus)</span><span>15 (balanced)</span><span>30 (max)</span>
        </div>
      </div>

      {/* Popular Topics */}
      <div>
        <label className="text-sm font-semibold mb-2 block">Popular Topics</label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOPICS.map(t => (
            <button
              key={t}
              onClick={() => { setTopic(t); generate(t); }}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {generated && hashtags.length > 0 && (
        <Card className="p-4 border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">{hashtags.length} Hashtags for "{topic}"</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => generate()}>
                <RefreshCw className="w-3 h-3 mr-1" />Refresh
              </Button>
              <Button size="sm" className="bg-primary text-white" onClick={copyAll}>
                <Copy className="w-3 h-3 mr-1" />Copy All
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {hashtags.map((tag, i) => (
              <button
                key={i}
                onClick={() => copyOne(tag)}
                className="px-3 py-1.5 bg-white border border-border hover:border-primary hover:text-primary rounded-full text-xs font-medium transition-all hover:shadow-sm"
                title="Click to copy"
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Copy className="w-3 h-3" />Click any hashtag to copy individually
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="Hashtag Generator for TikTok"
      toolDescription="Generate the best TikTok hashtags for your niche in seconds. Boost your video reach on the For You Page with trending, relevant hashtags. Free hashtag generator for creators."
      toolIcon={<Hash className="w-8 h-8" />}
      category="Social Media Tools"
      keywords={["tiktok hashtags", "hashtag generator", "tiktok hashtag generator", "best hashtags for tiktok", "fyp hashtags", "viral hashtags", "hashtag finder", "social media hashtags"]}
      features={[
        "Generate up to 30 hashtags per topic",
        "15+ popular niches covered",
        "Always includes trending TikTok boosters",
        "Click any hashtag to copy individually",
        "One-click copy all hashtags",
        "Works for Instagram Reels & YouTube Shorts too"
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
