import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    matterType: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline split reveal
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Phone number count up + scale
      gsap.fromTo(
        phoneRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Contact info stagger
      const contactItems = contactInfoRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        gsap.fromTo(
          contactItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Form container
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Form fields stagger
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      matterType: '',
      description: '',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-gq-dark-gradient py-12 lg:py-16 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gq-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gq-burgundy/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-gq relative z-10">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-8">
          <h2 className="font-serif font-bold text-gq-light text-3xl sm:text-4xl md:text-5xl mb-2">
            Ready to <span className="text-gq-gold-gradient shimmer-hover">Win?</span>
          </h2>
          <p className="text-gq-light/70 text-base">
            Let&apos;s discuss your case.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-4">
            {/* Phone Number */}
            <a
              ref={phoneRef}
              href="tel:405-607-2266"
              className="block group mb-6"
            >
              <span className="text-gq-gold text-xs uppercase tracking-widest mb-1 block">
                Call Now
              </span>
              <span className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-gq-light group-hover:text-gq-gold transition-colors duration-300 block">
                (405) 607-2266
              </span>
            </a>

            {/* Contact Details */}
            <div ref={contactInfoRef} className="space-y-4">
              <a
                href="mailto:gary@gq-law.com"
                className="contact-item flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gq-gold/10 flex items-center justify-center group-hover:bg-gq-gold/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gq-gold" />
                </div>
                <div>
                  <span className="text-gq-light/60 text-xs block">Email</span>
                  <span className="text-gq-light text-sm group-hover:text-gq-gold transition-colors duration-300 underline-animate">
                    gary@gq-law.com
                  </span>
                </div>
              </a>

              <div className="contact-item flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gq-gold/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gq-gold" />
                </div>
                <div>
                  <span className="text-gq-light/60 text-xs block">Office</span>
                  <span className="text-gq-light text-sm">
                    10005 N May Ave, Suite 120
                    <br />
                    Oklahoma City, OK 73120
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="w-px h-full bg-gq-gold-gradient/30 mx-auto" />
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {isSubmitted ? (
                <div className="bg-gq-gold/10 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gq-gold/20 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-gq-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-gq-light mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-gq-light/70 text-sm">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-field">
                      <Label htmlFor="name" className="text-gq-light/80 mb-1 block text-sm">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-gq-dark-warm/50 border-gq-gold/20 text-gq-light placeholder:text-gq-light/40 form-focus h-10 text-sm"
                      />
                    </div>

                    <div className="form-field">
                      <Label htmlFor="email" className="text-gq-light/80 mb-1 block text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-gq-dark-warm/50 border-gq-gold/20 text-gq-light placeholder:text-gq-light/40 form-focus h-10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-field">
                      <Label htmlFor="phone" className="text-gq-light/80 mb-1 block text-sm">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(405) 555-0123"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="bg-gq-dark-warm/50 border-gq-gold/20 text-gq-light placeholder:text-gq-light/40 form-focus h-10 text-sm"
                      />
                    </div>

                    <div className="form-field">
                      <Label htmlFor="matter" className="text-gq-light/80 mb-1 block text-sm">
                        Type of Matter
                      </Label>
                      <Select
                        value={formData.matterType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, matterType: value })
                        }
                      >
                        <SelectTrigger className="bg-gq-dark-warm/50 border-gq-gold/20 text-gq-light h-10 text-sm">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent className="bg-gq-dark border-gq-gold/30">
                          <SelectItem value="construction" className="text-gq-light hover:bg-gq-gold/20 focus:bg-gq-gold/20 focus:text-gq-light">
                            Construction Law
                          </SelectItem>
                          <SelectItem value="ma" className="text-gq-light hover:bg-gq-gold/20 focus:bg-gq-gold/20 focus:text-gq-light">
                            Mergers & Acquisitions
                          </SelectItem>
                          <SelectItem value="realestate" className="text-gq-light hover:bg-gq-gold/20 focus:bg-gq-gold/20 focus:text-gq-light">
                            Real Estate Law
                          </SelectItem>
                          <SelectItem value="oilgas" className="text-gq-light hover:bg-gq-gold/20 focus:bg-gq-gold/20 focus:text-gq-light">
                            Oil & Gas Law
                          </SelectItem>
                          <SelectItem value="other" className="text-gq-light hover:bg-gq-gold/20 focus:bg-gq-gold/20 focus:text-gq-light">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="form-field">
                    <Label
                      htmlFor="description"
                      className="text-gq-light/80 mb-1 block text-sm"
                    >
                      Brief Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about your situation..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                      className="bg-gq-dark-warm/50 border-gq-gold/20 text-gq-light placeholder:text-gq-light/40 form-focus resize-none text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary h-11 text-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
