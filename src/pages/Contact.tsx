'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/mlgrrvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        // Reset success state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'azebotdress@gmail.com',
      link: 'mailto:azebotdress@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+251 928 776 001',
      link: 'tel:+251928776001',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      content: 'Addis Ababa, Ethiopia',
    },
  ];

  const faqs = [
    {
      question: 'What is your shipping policy?',
      answer: 'We offer worldwide shipping tailored to your needs. You may choose your preferred shipping option, and shipping fees will be calculated accordingly and covered by the customer. Delivery timelines depend on destination and carrier.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship worldwide. Shipping times vary by location but typically take 7-14 business days.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of delivery. Items must be unworn and in original condition with tags attached.',
    },
    {
      question: 'How do I care for my traditional Ethiopian clothing?',
      answer: 'Most items should be hand washed in cold water and line dried.',
    },
    {
      question: 'Are your products authentic?',
      answer: 'Absolutely! All our pieces are handcrafted in Ethiopia by skilled artisans using traditional techniques and authentic materials.',
    },
    {
      question: 'How do I know my size?',
      answer: 'We provide detailed size charts for each product where applicable. Many of our products are free size and designed to fit a range of body types. If you’re between sizes, we recommend sizing up. For personalized sizing assistance or fit questions, please contact us before placing your',
    },
  ];

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      {/* Header */}
      <div className="bg-white border-b border-[--linen-beige]">
        <Container>
          <div className="py-12 text-center">
            <h1 className="mb-4">Get in Touch</h1>
            <p className="text-xl text-[--warm-grey] max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </Container>
      </div>

      {/* Contact Info */}
      <Section backgroundColor="cream">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--azebot-gold] text-white mb-4">
                {info.icon}
              </div>
              <h3 className="mb-2">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-[--warm-grey] hover:text-[--azebot-gold] transition-colors"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-[--warm-grey]">{info.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 shadow-md">
          <h2 className="mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--ethiopian-green] text-white mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="mb-2">Message Sent!</h3>
              <p className="text-[--warm-grey]">
                Thank you for contacting us. We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                value={name}
                onChange={setName}
                required
                placeholder="John Doe"
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                required
                placeholder="john@example.com"
                icon={<Mail className="w-4 h-4" />}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm">
                  Message
                  <span className="text-[--sacred-red] ml-1">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-2.5 rounded-md border border-[--warm-grey]/30 bg-white focus:outline-none focus:ring-2 focus:ring-[--azebot-gold] focus:border-transparent transition-all duration-200"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send className="w-5 h-5" />}
                iconPosition="right"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section title="Frequently Asked Questions" backgroundColor="white">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[--soft-cream] rounded-lg p-6">
              <h4 className="mb-3">{faq.question}</h4>
              <p className="text-[--warm-grey]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
