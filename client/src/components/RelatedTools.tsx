import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

interface RelatedTool {
  name: string;
  description: string;
  path: string;
}

interface RelatedToolsProps {
  currentTool: string;
  tools: RelatedTool[];
}

export default function RelatedTools({ currentTool, tools }: RelatedToolsProps) {
  const [, navigate] = useLocation();

  // Filter out current tool and get up to 3 related tools
  const relatedTools = tools.filter((tool) => tool.name !== currentTool).slice(0, 3);

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTools.map((tool, idx) => (
          <Card
            key={idx}
            className="p-6 bg-secondary/20 border-border hover:border-primary hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate(tool.path)}
          >
            <h3 className="font-bold text-foreground mb-2">{tool.name}</h3>
            <p className="text-sm text-foreground/70 mb-4">{tool.description}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 p-0"
              onClick={() => navigate(tool.path)}
            >
              Try Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
