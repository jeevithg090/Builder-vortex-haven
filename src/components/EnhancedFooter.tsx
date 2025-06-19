import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Award,
  Shield,
  Clock,
  Heart,
} from "lucide-react";

const EnhancedFooter = () => {
  const services = [
    "Brand Identity Design",
    "Web Development",
    "Digital Marketing",
    "Content Strategy",
    "UI/UX Design",
    "E-commerce Solutions",
  ];

  const company = [
    "About Us",
    "Our Team",
    "Careers",
    "Press Kit",
    "Case Studies",
    "Blog",
  ];

  const resources = [
    "Design Resources",
    "Brand Guidelines",
    "Industry Reports",
    "Webinars",
    "Tools & Templates",
    "Help Center",
  ];

  const legal = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "GDPR Compliance",
    "Accessibility",
    "Site Map",
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "#",
      label: "Instagram",
    },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Award Winning",
      description: "50+ Design Awards",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Partner",
      description: "200+ Happy Clients",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "On-time Guarantee",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="border-b border-white/10 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Stay in the
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {" "}
                    Creative Loop
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Get insights, tips, and inspiration delivered straight to your
                  inbox. Join 10,000+ creative professionals.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <form className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-purple-400 focus:bg-white/25 transition-all"
                    />
                    <motion.button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
              {/* Company Info */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white mb-4">
                    The Agency
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    We're a creative agency passionate about helping brands tell
                    their stories through exceptional design and strategic
                    thinking.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <span>hello@theagency.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-purple-400" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <span>123 Creative Street, Design District</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:text-white transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">
                  Services
                </h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors hover:translate-x-1 transform duration-200 block"
                      >
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">
                  Company
                </h4>
                <ul className="space-y-3">
                  {company.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors hover:translate-x-1 transform duration-200 block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors hover:translate-x-1 transform duration-200 block"
                      >
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">Legal</h4>
                <ul className="space-y-3">
                  {legal.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-purple-400 transition-colors hover:translate-x-1 transform duration-200 block"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          className="border-t border-white/10 py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                    {achievement.icon}
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">
                      {achievement.title}
                    </h5>
                    <p className="text-gray-400 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span>© 2024 The Agency. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-4 h-4 text-red-400" /> in San
                  Francisco
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Cookies
                </a>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
