import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (in production, send to backend)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      toast.success("Message sent successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">support@toolverse.com</p>
                    <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Monday to Friday, 9 AM - 5 PM EST</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">Online Support Only</p>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7 via email and contact form</p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Quick Help</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Check our FAQ section for answers to common questions about our tools.
                </p>
                <a href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View Blog & FAQs →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <p className="text-gray-600 mb-8">
                  We read every message. Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[200px]"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    We respect your privacy. Your information will only be used to respond to your inquiry.
                  </p>
                </form>
              </div>

              {/* Additional Info */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2026 ToolVerse. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="/about" className="text-gray-400 hover:text-white text-sm">
                About Us
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              Designed and Developed by Sadeem
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
