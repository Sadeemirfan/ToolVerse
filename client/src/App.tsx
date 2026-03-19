import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import WordCounterPage from "./pages/tools/WordCounter";
import CaseConverterPage from "./pages/tools/CaseConverter";
import JSONFormatterPage from "./pages/tools/JSONFormatter";
import PasswordGeneratorPage from "./pages/tools/PasswordGenerator";
import QRGeneratorPage from "./pages/tools/QRGenerator";
import LoremIpsumPage from "./pages/tools/LoremIpsum";
import AIDetectorPage from "./pages/tools/AIDetector";
import MetaGeneratorPage from "./pages/tools/MetaGenerator";
import UnitConverterPage from "./pages/tools/UnitConverter";
import ImageResizerPage from "./pages/tools/ImageResizer";
import RobotsGeneratorPage from "./pages/tools/RobotsGenerator";
import SitemapGeneratorPage from "./pages/tools/SitemapGenerator";
import ColorPickerPage from "./pages/tools/ColorPicker";
import Base64ToolPage from "./pages/tools/Base64Tool";
import URLEncoderPage from "./pages/tools/URLEncoder";
import MarkdownEditorPage from "./pages/tools/MarkdownEditor";
import RegexTesterPage from "./pages/tools/RegexTester";
import TimestampConverterPage from "./pages/tools/TimestampConverter";
import HashGeneratorPage from "./pages/tools/HashGenerator";
import CSSMinifierPage from "./pages/tools/CSSMinifier";
import TextToSpeechPage from "./pages/tools/TextToSpeech";
import InvoiceGeneratorPage from "./pages/tools/InvoiceGenerator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";


function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/about" component={About} />
      <Route path="/tools/word-counter" component={WordCounterPage} />
      <Route path="/tools/case-converter" component={CaseConverterPage} />
      <Route path="/tools/json-formatter" component={JSONFormatterPage} />
      <Route path="/tools/password-generator" component={PasswordGeneratorPage} />
      <Route path="/tools/qr-generator" component={QRGeneratorPage} />
      <Route path="/tools/lorem-ipsum" component={LoremIpsumPage} />
      <Route path="/tools/ai-detector" component={AIDetectorPage} />
      <Route path="/tools/meta-generator" component={MetaGeneratorPage} />
      <Route path="/tools/unit-converter" component={UnitConverterPage} />
      <Route path="/tools/image-resizer" component={ImageResizerPage} />
      <Route path="/tools/robots-generator" component={RobotsGeneratorPage} />
      <Route path="/tools/sitemap-generator" component={SitemapGeneratorPage} />
      <Route path="/tools/color-picker" component={ColorPickerPage} />
      <Route path="/tools/base64" component={Base64ToolPage} />
      <Route path="/tools/url-encoder" component={URLEncoderPage} />
      <Route path="/tools/markdown-editor" component={MarkdownEditorPage} />
      <Route path="/tools/regex-tester" component={RegexTesterPage} />
      <Route path="/tools/timestamp-converter" component={TimestampConverterPage} />
      <Route path="/tools/hash-generator" component={HashGeneratorPage} />
      <Route path="/tools/css-minifier" component={CSSMinifierPage} />
      <Route path="/tools/text-to-speech" component={TextToSpeechPage} />
      <Route path="/tools/invoice-generator" component={InvoiceGeneratorPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
