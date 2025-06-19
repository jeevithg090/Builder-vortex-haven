import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    orderCapacity: "Up to 1,000 orders per month",
    description:
      "Perfect for new sellers just starting their Amazon journey. Get all essential features to manage your first reviews effectively.",
    price: "$15.99",
    isPopular: false,
    features: [
      "Dashboard Access",
      "Basic Analytics",
      "Email Support",
      "Review Automation",
      "Customer Templates",
    ],
  },
  {
    id: 2,
    name: "Growth",
    orderCapacity: "Up to 2,500 orders per month",
    description:
      "Are growing and scaling operations. Ideal for sellers who are expanding their product range and need more review automation.",
    price: "$29.99",
    isPopular: true,
    features: [
      "Everything in Starter",
      "Advanced Analytics",
      "Priority Support",
      "Custom Branding",
      "A/B Testing",
      "API Access",
    ],
  },
  {
    id: 3,
    name: "Pro",
    orderCapacity: "Up to 10,000 orders per month",
    description:
      "For established sellers managing high volumes. Get enterprise-level features and dedicated support for your growing business.",
    price: "$59.99",
    isPopular: false,
    features: [
      "Everything in Growth",
      "Dedicated Account Manager",
      "Custom Integrations",
      "White-label Solution",
      "Advanced Reporting",
      "24/7 Phone Support",
    ],
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
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
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4">
            Choose a plan based on your monthly order volume. Whether you're
            just starting out or scaling up, find a plan that fits your growth
            and unlock the full power of our all-in-one platform.
          </p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Starting from just $15.99 per month.
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
                  <div className="bg-vibrant-pink text-white text-xs font-bold py-2 px-4 rounded-full uppercase tracking-wide">
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
                {plan.orderCapacity}
              </p>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-8 leading-relaxed">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
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
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <motion.button
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 uppercase tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
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
          <motion.button
            className="text-brand-purple hover:text-brand-purple/80 font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact our sales team →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
