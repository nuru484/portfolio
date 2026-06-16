// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Phone, MapPin, Mails } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CONTACT } from '@/config/constants';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  budget: string;
  exactBudget: string;
  timeline: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  companyWebsite: '',
  budget: '',
  exactBudget: '',
  timeline: '',
  message: '',
};

const budgetOptions = ['< 2k', '2-5k', '5-10k', '10-15k', '> 20k'];

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to an API route / email service.
    toast.success("Thanks for reaching out! I'll get back to you soon.");
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:px-12 md:p-8 bg-muted">
      <div className="flex justify-between flex-wrap gap-5 lg:flex-nowrap lg:gap-20 font-urbanist w-full">
        {/* Left Column */}
        <div className="space-y-6">
          <h2 className="text-3xl font-light mb-4">
            Schedule a call
            <br />
            with me to see
            <br />
            if I can help
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you&apos;re looking to start a new project or want to update
            an existing one, feel free to reach out to me!
          </p>
          <div className="flex flex-col justify-center mx-auto gap-4 px-10 py-8 text-xl font-medium bg-card rounded-3xl">
            <span className="flex flex-nowrap items-center gap-2">
              <Phone strokeWidth={1} />
              {CONTACT.phone}
            </span>
            <p className="flex flex-nowrap items-center gap-2">
              <Mails strokeWidth={1} />
              <span className="w-40 md:w-auto overflow-scroll md:overflow-hidden">
                {CONTACT.email}
              </span>
            </p>

            <span className="flex flex-nowrap items-center gap-2">
              <MapPin strokeWidth={1} />
              {CONTACT.location}
            </span>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="p-6 md:p-14 rounded-3xl bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="url"
              name="companyWebsite"
              placeholder="Company Website"
              value={formData.companyWebsite}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <div className="space-y-2">
              <p className="text-muted-foreground">My budget is:</p>
              <div className="flex flex-wrap gap-4">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, budget }))}
                    className={cn(
                      'px-4 py-2 rounded-full border',
                      formData.budget === budget
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-input hover:border-foreground'
                    )}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              name="exactBudget"
              placeholder="Do you have an exact budget?"
              value={formData.exactBudget}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <input
              type="text"
              name="timeline"
              placeholder="What is your timeline?"
              value={formData.timeline}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              className="w-full border-b border-input py-2 focus:outline-none focus:border-foreground"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-foreground mx-auto md:mx-0 text-background border border-foreground px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-background hover:text-foreground transition-colors duration-500 ease-in-out"
            >
              <span>Submit Message</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
