import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Users,
  Globe,
  Zap,
  Coffee,
  Heart,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
  };
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const TeamAboutSection = () => {
  const [activeTab, setActiveTab] = useState<"about" | "team">("about");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const stats: Stat[] = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "50+",
      label: "Team Members",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "200+",
      label: "Projects Delivered",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "25+",
      label: "Countries Served",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      value: "∞",
      label: "Cups of Coffee",
      color: "from-orange-500 to-red-500",
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Creative Director",
      image:
        "https://images.pexels.com/photos/7552372/pexels-photo-7552372.jpeg",
      bio: "With over 10 years of experience in brand strategy and visual identity, Sarah leads our creative vision and ensures every project tells a compelling story.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@agency.com",
      },
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Lead Designer",
      image:
        "https://images.pexels.com/photos/6248976/pexels-photo-6248976.jpeg",
      bio: "Marcus brings technical expertise and innovative thinking to our design process, specializing in user experience and interface design.",
      socials: {
        linkedin: "#",
        instagram: "#",
        email: "marcus@agency.com",
      },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Brand Strategist",
      image:
        "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
      bio: "Emma's strategic insight helps brands find their unique voice and position in the market, with a focus on authentic storytelling.",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        email: "emma@agency.com",
      },
    },
    {
      id: 4,
      name: "David Park",
      role: "Technical Director",
      image:
        "https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg",
      bio: "David ensures our creative visions come to life with cutting-edge technology and seamless user experiences across all platforms.",
      socials: {
        linkedin: "#",
        email: "david@agency.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet The
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Visionaries
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a diverse team of creators, strategists, and innovators
            passionate about bringing extraordinary brand experiences to life.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "about"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "team"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Our Team
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "about" ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Story Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Founded in 2018, The Agency began as a small collective of
                      passionate designers and strategists who believed that
                      great brands have the power to change the world.
                    </p>
                    <p>
                      Today, we've grown into a dynamic team of 50+
                      professionals, but our core mission remains the same:
                      creating authentic, impactful brand experiences that
                      resonate with audiences and drive meaningful connections.
                    </p>
                    <p>
                      We don't just design brands—we craft stories, build
                      communities, and help our clients discover their unique
                      voice in an increasingly noisy world.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/6248976/pexels-photo-6248976.jpeg"
                      alt="Our creative workspace"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Heart className="w-8 h-8" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Values Section */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-12">
                  Our Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Authenticity",
                      description:
                        "We believe in genuine connections and honest storytelling that resonates with real people.",
                      icon: <Heart className="w-8 h-8" />,
                    },
                    {
                      title: "Innovation",
                      description:
                        "We constantly push boundaries and explore new ways to solve creative challenges.",
                      icon: <Zap className="w-8 h-8" />,
                    },
                    {
                      title: "Collaboration",
                      description:
                        "Our best work happens when we combine diverse perspectives and expertise.",
                      icon: <Users className="w-8 h-8" />,
                    },
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white">
                        {value.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onClick={() => setSelectedMember(member)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-purple-600 font-semibold mb-4">
                          {member.role}
                        </p>
                        <div className="flex gap-3">
                          {member.socials.linkedin && (
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors">
                              <Linkedin className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                          {member.socials.twitter && (
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors">
                              <Twitter className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                          {member.socials.instagram && (
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors">
                              <Instagram className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                          {member.socials.email && (
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors">
                              <Mail className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-purple-600 font-semibold text-lg mb-6">
                    {selectedMember.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedMember.bio}
                  </p>
                  <div className="flex gap-4">
                    {Object.entries(selectedMember.socials).map(
                      ([platform, url]) => (
                        <button
                          key={platform}
                          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-shadow"
                        >
                          {platform === "linkedin" && (
                            <Linkedin className="w-5 h-5" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="w-5 h-5" />
                          )}
                          {platform === "instagram" && (
                            <Instagram className="w-5 h-5" />
                          )}
                          {platform === "email" && <Mail className="w-5 h-5" />}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamAboutSection;
