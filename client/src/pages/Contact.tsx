import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error("Please enter your name"); return; }
    if (!formData.email.trim()) { toast.error("Please enter your email"); return; }
    if (!formData.email.includes("@")) { toast.error("Please enter a valid email address"); return; }
    if (!formData.message.trim()) { toast.error("Please enter your message"); return; }

    setIsSubmitting(true);
    try {
      // Netlify Form Submission logic
      const body = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      if (!response.ok) throw new Error("Form submission failed");

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with the My ToolVerse team. Have questions, feedback, or bug reports? We'd love to hear from you."
        keywords={["contact my-toolverse", "support", "feedback", "help", "reach us"]}
        url="https://my-my-toolverse.netlify.app/contact"
      />
      <Layout variant="page" title="Contact">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {/* Info */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-8">Why Contact Us?</h2>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Have feedback about our tools? Found a bug? Want to suggest a new feature? We'd love to hear from you!
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Your input helps us improve My ToolVerse and create better tools for everyone.
                  </p>
                </div>
                <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Quick Help</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Check our blog section for answers to common questions about our tools.
                  </p>
                  <a href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    View Blog &amp; FAQs →
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-2">
                <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <p className="text-gray-600 mb-8">
                    We read every message. Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                  >
                    {/* Hidden input for Netlify bot/form handling */}
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                      <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Your Email *</label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="w-full" disabled={isSubmitting} />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <Textarea id="message" name="message" placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} className="w-full min-h-[200px]" disabled={isSubmitting} />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Your information will only be used to respond to your inquiry.
                    </p>
                  </form>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-3">What to Include in Your Message</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Specific tool name if your inquiry is about a particular tool</li>
                    <li>✓ Description of your issue or question</li>
                    <li>✓ Steps you've already tried (if reporting a problem)</li>
                    <li>✓ Your preferred contact method for our response</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
