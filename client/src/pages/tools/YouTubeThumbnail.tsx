import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolPage from "@/components/ToolPage";
import { Youtube, Download, Image, AlertCircle } from "lucide-react";
import { toast } from "sonner";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

interface Thumbnail {
  label: string;
  quality: string;
  url: string;
  resolution: string;
}

function getThumbnails(videoId: string): Thumbnail[] {
  return [
    { label: "Max Resolution", quality: "maxresdefault", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, resolution: "1280×720" },
    { label: "HD Quality", quality: "sddefault", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, resolution: "640×480" },
    { label: "High Quality", quality: "hqdefault", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, resolution: "480×360" },
    { label: "Medium Quality", quality: "mqdefault", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, resolution: "320×180" },
    { label: "Default", quality: "default", url: `https://img.youtube.com/vi/${videoId}/default.jpg`, resolution: "120×90" },
  ];
}

const SAMPLE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function YouTubeThumbnailDownloaderPage() {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  const fetchThumbnails = () => {
    setError("");
    setThumbnails([]);
    const id = extractVideoId(url.trim());
    if (!id) {
      setError("Invalid YouTube URL. Please paste a valid YouTube video link.");
      return;
    }
    setVideoId(id);
    setThumbnails(getThumbnails(id));
    toast.success("Thumbnails loaded! Click any to download.");
  };

  const downloadImage = async (thumb: Thumbnail) => {
    try {
      const response = await fetch(thumb.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${videoId}-${thumb.quality}.jpg`;
      a.click();
      URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded: ${thumb.label}`);
    } catch {
      // fallback: open in new tab if CORS blocks download
      window.open(thumb.url, "_blank");
      toast.info("Opened in new tab — right-click → Save image as");
    }
  };

  const tryExample = () => {
    setUrl(SAMPLE_URL);
    const id = extractVideoId(SAMPLE_URL)!;
    setVideoId(id);
    setThumbnails(getThumbnails(id));
    setError("");
  };

  const faqs = [
    { question: "Is it free to download YouTube thumbnails?", answer: "Yes, 100% free and unlimited. Thumbnails are publicly accessible images on YouTube's servers." },
    { question: "What quality thumbnails can I download?", answer: "Up to 1280×720 (Max Resolution/HD). Availability depends on the video — older videos may not have maxresdefault." },
    { question: "Can I use YouTube thumbnails for my own content?", answer: "Thumbnails may be copyrighted. You may use them for personal reference or commentary, but always credit the creator and check fair use guidelines." },
    { question: "Why does the Max Resolution thumbnail show an error?", answer: "Not all videos have a maxresdefault thumbnail. In that case, use the HD or High Quality option — they always exist." },
    { question: "Does this tool store my data?", answer: "No. Everything runs in your browser. We never store video IDs or thumbnails on our servers." },
  ];

  const toolInterface = (
    <div className="space-y-5">
      {/* URL Input */}
      <div>
        <label className="text-sm font-semibold mb-2 block">YouTube Video URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && fetchThumbnails()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={fetchThumbnails} className="bg-primary hover:bg-primary/90 text-white">
            <Youtube className="w-4 h-4 mr-2" />Get Thumbnails
          </Button>
        </div>
        <button onClick={tryExample} className="text-xs text-primary underline mt-1.5">
          Try an example
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      {/* Thumbnails Grid */}
      {thumbnails.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Available Thumbnails — Click to Download</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {thumbnails.map((thumb) => (
              <Card key={thumb.quality} className="overflow-hidden border hover:border-primary/40 transition-all group">
                <div className="relative bg-black aspect-video">
                  <img
                    src={thumb.url}
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white text-black hover:bg-white/90" onClick={() => downloadImage(thumb)}>
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{thumb.label}</p>
                    <p className="text-xs text-muted-foreground">{thumb.resolution}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => downloadImage(thumb)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Image className="w-3 h-3" />
            If download is blocked, the image will open in a new tab — right-click → "Save image as"
          </p>
        </div>
      )}
    </div>
  );

  return (
    <ToolPage
      toolName="YouTube Thumbnail Downloader"
      toolDescription="Download YouTube video thumbnails in HD quality for free. Get the maximum resolution thumbnail from any YouTube video URL instantly — no sign-up required."
      toolIcon={<Youtube className="w-8 h-8" />}
      category="Social Media Tools"
      keywords={["youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail hd", "youtube thumbnail 1080p", "free thumbnail downloader", "youtube video thumbnail"]}
      features={[
        "Download thumbnails up to 1280×720 (Max HD)",
        "5 quality options per video",
        "Works with any public YouTube video",
        "One-click download — no sign-up needed",
        "100% browser-based, no data stored",
        "Preview before downloading"
      ]}
      faqs={faqs}
    >
      {toolInterface}
    </ToolPage>
  );
}
