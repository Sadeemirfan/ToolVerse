import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="My ToolVerse Terms of Service — read our terms and conditions for using our free online tools for productivity, SEO, and development."
        keywords={["terms of service", "terms and conditions", "my-toolverse terms", "user agreement"]}
        url="https://my-my-toolverse.netlify.app/terms"
      />
      <Layout variant="page" title="Terms of Service">
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using My ToolVerse (the Site), you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on My ToolVerse for personal,
                non-commercial transitory viewing only. Under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on My ToolVerse</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Upload viruses or malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p>
                The materials on My ToolVerse are provided on an as is basis. My ToolVerse makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p>
                In no event shall My ToolVerse or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on My ToolVerse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on My ToolVerse could include technical, typographical, or photographic errors.
                My ToolVerse does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
              <p>
                My ToolVerse has not reviewed all of the sites linked to its website and is not responsible for the contents
                of any such linked site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
              <p>
                My ToolVerse may revise these terms of service for its website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                in which My ToolVerse operates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. User Responsibilities</h2>
              <p>You agree that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>You will not use My ToolVerse for any illegal or unauthorized purpose</li>
                <li>You will not transmit any harmful or malicious code</li>
                <li>You will not attempt to gain unauthorized access to our systems</li>
                <li>You will use the tools responsibly and ethically</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, in no event shall My ToolVerse be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="mt-4">
                <strong>My ToolVerse</strong><br />
                Email: support@my-toolverse.com<br />
                Website: my-my-toolverse.netlify.app
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">Last Updated: March 15, 2026</p>
          </div>
        </main>
      </Layout>
    </>
  );
}
