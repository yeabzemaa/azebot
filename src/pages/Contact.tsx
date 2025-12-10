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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'hello@azebot.com',
      link: 'mailto:hello@azebot.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
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
      answer: 'We offer free shipping on all orders over $100. Standard shipping takes 7-14 business days for international orders.',
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
      answer: 'Most items should be hand washed in cold water and line dried. Detailed care instructions are included with each purchase.',
    },
    {
      question: 'Are your products authentic?',
      answer: 'Absolutely! All our pieces are handcrafted in Ethiopia by skilled artisans using traditional techniques and authentic materials.',
    },
    {
      question: 'How do I know my size?',
      answer: 'We provide detailed size charts for each product. If you\'re between sizes, we recommend sizing up. Contact us for personalized sizing help!',
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

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Send className="w-5 h-5" />}
                iconPosition="right"
                className="w-full"
              >
                Send Message
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
