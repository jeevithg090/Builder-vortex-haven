import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

interface PricingPlan {
  id: number;
  name: string;
  capacity: string;
  description: string;
  price: string;
  isPopular: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter",
    capacity: "1 active project at a time",
    description:
      "For founders and small teams who need a sharp brand foundation and a focused partner to get their first launch out the door.",
    price: "$1,500",
    isPopular: false,
    features: [
      "Brand & visual identity refresh",
      "Landing page design",
      "Monthly strategy call",
      "Email support",
      "2 revision rounds per deliverable",
    ],
  },
  {
    id: 2,
    name: "Growth",
    capacity: "Up to 3 active projects",
    description:
      "For growing companies that need design, web and marketing working together, with a dedicated team that knows the brand.",
    price: "$3,500",
    isPopular: true,
    features: [
      "Everything in Starter",
      "Multi-page website design & build",
      "Social & campaign creative",
      "Bi-weekly check-ins",
      "Priority support",
      "Analytics reporting",
    ],
  },
  {
    id: 3,
    name: "Pro",
    capacity: "Unlimited requests, prioritised weekly",
    description:
      "For established brands that want an embedded creative partner across every channel, with senior attention on every project.",
    price: "$7,500",
    isPopular: false,
    features: [
      "Everything in Growth",
      "Dedicated creative director",
      "Product & UX design",
      "Video & motion content",
      "Quarterly brand workshops",
      "Same-day response times",
    ],
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-colors duration-300"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4">
            Pick a monthly retainer that matches how much you need from us.
            Every plan includes a dedicated team, clear timelines and no
            long-term lock-in.
          </p>
          <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            Retainers start at $1,500 per month.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-pricing-purple dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.isPopular ? "ring-2 ring-brand-purple" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Most Popular Tag */}
              {plan.isPopular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                >
                  <div className="bg-pink-700 text-white text-xs font-bold py-2 px-4 rounded-full uppercase tracking-wide">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Plan Name */}
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {plan.name}
              </h3>

              {/* Order Capacity */}
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {plan.capacity}
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                  per month
                </span>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Features Included
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.8 + index * 0.2 + featureIndex * 0.1,
                        duration: 0.5,
                      }}
                    >
                      <Check
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                aria-label={`Get started with the ${plan.name} plan`}
                className="block w-full text-center bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 uppercase tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need a custom solution for your enterprise?
          </p>
          <motion.a
            href="#contact"
            className="inline-block text-brand-purple hover:text-brand-purple/80 dark:text-light-purple dark:hover:text-light-purple/80 font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact our sales team →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
