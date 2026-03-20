import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <>
      <SEOHead
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist. It may have been moved or deleted. Return to My ToolVerse home for free online tools."
        keywords={["404", "page not found", "my-toolverse error"]}
      />
      <Layout variant="page" title="404 Error">
        <div className="min-h-[70vh] w-full flex items-center justify-center p-4">
          <div className="w-full max-w-lg text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse scale-150" />
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10">
                  <AlertCircle className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              We couldn't find the page you were looking for. It might have been moved, deleted, or the URL might be incorrect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGoHome}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Back Home
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
