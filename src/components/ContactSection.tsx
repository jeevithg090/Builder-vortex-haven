import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  Globe,
} from "lucide-react";
import {
  BUDGET_OPTIONS,
  ContactSubmitError,
  EMPTY_CONTACT_FORM,
  TIMELINE_OPTIONS,
  getContactConfig,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactFormData,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const INPUT_CLASS =
  "w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all";

const fieldClass = (hasError: boolean) =>
  cn(INPUT_CLASS, hasError ? "border-red-400" : "border-white/30");

interface FieldProps {
  id: ContactField;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

const Field = ({ id, label, required, error, children }: FieldProps) => (
  <div>
    <label
      htmlFor={`contact-${id}`}
      className="block text-white font-semibold mb-2"
    >
      {label}
      {required && (
        <span aria-hidden="true" className="text-purple-300">
          {" "}
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p id={`contact-${id}-error`} className="mt-2 text-sm text-red-300">
        {error}
      </p>
    )}
  </div>
);

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "mailto"; href: string }
  | { kind: "error"; message: string };

const contactConfig = getContactConfig();

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
  });
  const [activeService, setActiveService] = useState<string | null>(null);

  const isSubmitting = submitState.kind === "submitting";
  const isSubmitted =
    submitState.kind === "sent" || submitState.kind === "mailto";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const serviceTitle =
      services.find((service) => service.id === activeService)?.title ?? "";
    const validation = validateContact({ ...formData, service: serviceTitle });
    if (!validation.success) {
      setErrors(validation.errors);
      const firstInvalid = Object.keys(validation.errors)[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setErrors({});
    setSubmitState({ kind: "submitting" });
    try {
      const result = await submitContact(validation.data, contactConfig);
      if (result.status === "mailto") {
        window.location.href = result.href;
        setSubmitState({ kind: "mailto", href: result.href });
      } else {
        setSubmitState({ kind: "sent" });
      }
    } catch (error) {
      setSubmitState({
        kind: "error",
        message:
          error instanceof ContactSubmitError
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = e.target.name as ContactField;
    setFormData((previous) => ({ ...previous, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_CONTACT_FORM);
    setErrors({});
    setActiveService(null);
    setSubmitState({ kind: "idle" });
  };

  const describedBy = (field: ContactField) =>
    errors[field] ? `contact-${field}-error` : undefined;

  const services = [
    {
      id: "branding",
      title: "Brand Identity",
      description: "Complete brand strategy, logo design, and visual identity",
      icon: "🎨",
      price: "Starting at $5k",
    },
    {
      id: "web",
      title: "Web Design",
      description: "Custom websites that convert visitors into customers",
      icon: "💻",
      price: "Starting at $8k",
    },
    {
      id: "digital",
      title: "Digital Marketing",
      description: "Strategic campaigns that drive growth and engagement",
      icon: "📱",
      price: "Starting at $3k/mo",
    },
    {
      id: "consulting",
      title: "Strategy Consulting",
      description: "Expert guidance for your brand's growth and evolution",
      icon: "🚀",
      price: "Starting at $2k",
    },
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Call us",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email us",
      value: contactConfig.email,
      action: `mailto:${contactConfig.email}`,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Visit us",
      value: "123 Creative Street, Design District",
      action: null,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Office hours",
      value: "Mon-Fri 9AM-6PM PST",
      action: null,
    },
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope and complexity. Brand identity projects typically take 4-6 weeks, while website projects range from 6-12 weeks. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "What's included in your brand identity package?",
      answer:
        "Our brand identity package includes strategy development, logo design, color palette, typography, brand guidelines, business card design, and 3 rounds of revisions. Additional deliverables can be added based on your needs.",
    },
    {
      question: "Do you work with startups?",
      answer:
        "Absolutely! We love working with startups and have special packages designed for early-stage companies. We understand the unique challenges startups face and offer flexible payment terms and scalable solutions.",
    },
    {
      question: "Can you help with ongoing marketing?",
      answer:
        "Yes, we offer ongoing marketing support including social media management, content creation, digital advertising, and brand maintenance. We can create a custom retainer package based on your needs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
            Let's Create
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Something
            </span>
            <br />
            Amazing Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your brand? We're here to help you tell your
            story, connect with your audience, and achieve your goals.
          </p>
        </motion.div>

        {/* Services Quick Selection */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            What can we help you with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.button
                type="button"
                key={service.id}
                aria-pressed={activeService === service.id}
                className={cn(
                  "p-6 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
                  activeService === service.id
                    ? "bg-white/10 border-purple-400 shadow-lg shadow-purple-400/25"
                    : "bg-white/5 border-gray-600 hover:border-purple-500 hover:bg-white/10",
                )}
                onClick={() =>
                  setActiveService(
                    activeService === service.id ? null : service.id,
                  )
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-purple-400 font-semibold">
                  {service.price}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-purple-400" />
                Get In Touch
              </h2>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    id="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={isSubmitting}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field
                        id="name"
                        label="Name"
                        required
                        error={errors.name}
                      >
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          autoComplete="name"
                          required
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={describedBy("name")}
                          value={formData.name}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.name))}
                          placeholder="Your full name"
                        />
                      </Field>
                      <Field
                        id="email"
                        label="Email"
                        required
                        error={errors.email}
                      >
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          required
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={describedBy("email")}
                          value={formData.email}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.email))}
                          placeholder="your@email.com"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field
                        id="company"
                        label="Company"
                        error={errors.company}
                      >
                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          autoComplete="organization"
                          aria-invalid={Boolean(errors.company)}
                          aria-describedby={describedBy("company")}
                          value={formData.company}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.company))}
                          placeholder="Your company"
                        />
                      </Field>
                      <Field id="phone" label="Phone" error={errors.phone}>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={describedBy("phone")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.phone))}
                          placeholder="(555) 123-4567"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Field
                        id="budget"
                        label="Budget Range"
                        error={errors.budget}
                      >
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.budget))}
                        >
                          <option value="" className="text-gray-900">
                            Select budget
                          </option>
                          {BUDGET_OPTIONS.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="text-gray-900"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        id="timeline"
                        label="Timeline"
                        error={errors.timeline}
                      >
                        <select
                          id="contact-timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className={fieldClass(Boolean(errors.timeline))}
                        >
                          <option value="" className="text-gray-900">
                            Select timeline
                          </option>
                          {TIMELINE_OPTIONS.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className="text-gray-900"
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field
                      id="message"
                      label="Tell us about your project"
                      required
                      error={errors.message}
                    >
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={describedBy("message")}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={cn(
                          fieldClass(Boolean(errors.message)),
                          "resize-none",
                        )}
                        placeholder="Describe your project, goals, and any specific requirements..."
                      />
                    </Field>

                    {submitState.kind === "error" && (
                      <p
                        role="alert"
                        className="rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                      >
                        {submitState.message}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div
                            aria-hidden="true"
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" aria-hidden="true" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {submitState.kind === "sent"
                        ? "Message Sent Successfully!"
                        : "Almost there!"}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {submitState.kind === "mailto" ? (
                        <>
                          Your email app should have opened with your message
                          ready to send. If it didn&apos;t,{" "}
                          <a
                            href={submitState.href}
                            className="text-purple-300 underline hover:text-purple-200"
                          >
                            open it here
                          </a>
                          .
                        </>
                      ) : (
                        "Thanks for reaching out! We'll get back to you within 24 hours."
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info & FAQ */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-purple-400" />
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const content = (
                    <>
                      <div
                        aria-hidden="true"
                        className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600/30 transition-colors"
                      >
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-gray-300 text-sm">
                          {info.label}
                        </div>
                        <div className="text-white font-semibold">
                          {info.value}
                        </div>
                      </div>
                    </>
                  );
                  return info.action ? (
                    <motion.a
                      key={info.label}
                      href={info.action}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 5 }}
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <div key={info.label} className="flex items-center gap-4">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-white/20 pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                  >
                    <h4 className="text-white font-semibold mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-purple-100 mb-6">
                Book a free 30-minute consultation to discuss your project
              </p>
              <motion.a
                href="#contact"
                onClick={() =>
                  document.getElementById("contact-name")?.focus({
                    preventScroll: true,
                  })
                }
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors inline-flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                Schedule a Call
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
