import { useState } from "react";
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

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  budget: string;
  timeline: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      value: "hello@theagency.com",
      action: "mailto:hello@theagency.com",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Visit us",
      value: "123 Creative Street, Design District",
      action: "#",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Office hours",
      value: "Mon-Fri 9AM-6PM PST",
      action: "#",
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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Let's Create
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Something
            </span>
            <br />
            Amazing Together
          </h1>
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
              <motion.div
                key={service.id}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  activeService === service.id
                    ? "bg-white/10 border-purple-400 shadow-lg shadow-purple-400/25"
                    : "bg-white/5 border-gray-600 hover:border-purple-500 hover:bg-white/8"
                }`}
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
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {service.description}
                </p>
                <div className="text-purple-400 font-semibold">
                  {service.price}
                </div>
              </motion.div>
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
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                        >
                          <option value="" className="text-gray-900">
                            Select budget
                          </option>
                          <option value="5k-10k" className="text-gray-900">
                            $5k - $10k
                          </option>
                          <option value="10k-25k" className="text-gray-900">
                            $10k - $25k
                          </option>
                          <option value="25k-50k" className="text-gray-900">
                            $25k - $50k
                          </option>
                          <option value="50k+" className="text-gray-900">
                            $50k+
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                        >
                          <option value="" className="text-gray-900">
                            Select timeline
                          </option>
                          <option value="asap" className="text-gray-900">
                            ASAP
                          </option>
                          <option value="1-2months" className="text-gray-900">
                            1-2 months
                          </option>
                          <option value="3-6months" className="text-gray-900">
                            3-6 months
                          </option>
                          <option value="6months+" className="text-gray-900">
                            6+ months
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Tell us about your project *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all resize-none"
                        placeholder="Describe your project, goals, and any specific requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Thanks for reaching out! We'll get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          phone: "",
                          message: "",
                          budget: "",
                          timeline: "",
                        });
                      }}
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
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.action}
                    className="flex items-center gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600/30 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-gray-300 text-sm">{info.label}</div>
                      <div className="text-white font-semibold">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
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
              <motion.button
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
