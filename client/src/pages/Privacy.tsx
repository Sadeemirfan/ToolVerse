import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="ToolVerse Privacy Policy — learn how we protect your data. All tool processing is done client-side in your browser. We never store your personal data."
        keywords={["privacy policy", "data protection", "toolverse privacy", "client-side processing"]}
        url="https://my-toolverse.netlify.app/privacy"
      />
      <Layout variant="page" title="Privacy Policy">
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                Welcome to ToolVerse ("we," "us," "our," or "Company"). We are committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website my-toolverse.netlify.app (the "Site").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p>
                ToolVerse is designed to protect your privacy. We collect minimal information and process all data
                client-side in your browser. We do not collect or store personal information unless you voluntarily
                provide it.
              </p>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Information You Provide:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact information if you reach out to us via email</li>
                <li>Feedback or suggestions you provide about our tools</li>
              </ul>
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Automatically Collected Information:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring/exit pages</li>
                <li>Pages visited and time spent on pages</li>
                <li>IP address (anonymized)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide, maintain, and improve our tools and services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze website usage and trends</li>
                <li>Monitor and prevent fraudulent activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Processing</h2>
              <p>
                All text, files, and data you enter into our tools are processed entirely in your browser. We do not send
                your data to our servers. This ensures maximum privacy and security. Your data is never stored on our
                servers unless you explicitly save or export it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. These are used for analytics
                purposes only and do not identify you personally. You can disable cookies in your browser settings if you
                prefer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Services</h2>
              <p>
                We may use third-party services for analytics (e.g., Google Analytics). These services may collect
                information about your use of our Site in accordance with their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Your Privacy Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt-out of certain data processing</li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us at privacy@toolverse.manus.space</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
              <p>
                ToolVerse does not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-4">
                <strong>ToolVerse</strong><br />
                Email: privacy@toolverse.manus.space<br />
                Website: my-toolverse.netlify.app
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">Last Updated: March 15, 2026</p>
          </div>
        </main>
      </Layout>
    </>
  );
}
