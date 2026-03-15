import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Terms() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using ToolVerse (the Site), you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on
              ToolVerse for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on ToolVerse</li>
              <li>Transfer the materials to another person or mirror the materials on any other server</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Upload viruses or malicious code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p>
              The materials on ToolVerse are provided on an as is basis. ToolVerse makes no warranties, expressed or
              implied, and hereby disclaims and negates all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p>
              In no event shall ToolVerse or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on ToolVerse, even if ToolVerse or an authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on ToolVerse could include technical, typographical, or photographic errors.
              ToolVerse does not warrant that any of the materials on its website are accurate, complete, or current.
              ToolVerse may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
            <p>
              ToolVerse has not reviewed all of the sites linked to its website and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by ToolVerse of the site. Use
              of any such linked website is at the user own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
            <p>
              ToolVerse may revise these terms of service for its website at any time without notice. By using this
              website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
              in which ToolVerse operates, and you irrevocably submit to the exclusive jurisdiction of the courts
              located in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. User Responsibilities</h2>
            <p>You agree that:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>You will not use ToolVerse for any illegal or unauthorized purpose</li>
              <li>You will not transmit any harmful or malicious code</li>
              <li>You will not attempt to gain unauthorized access to our systems</li>
              <li>You will use the tools responsibly and ethically</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, in no event shall ToolVerse be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
              or indirectly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-4">
              <strong>ToolVerse</strong>
              <br />
              Email: support@toolverse.manus.space
              <br />
              Website: toolverse.manus.space
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Last Updated: March 15, 2026</p>
        </div>
      </main>
    </div>
  );
}
