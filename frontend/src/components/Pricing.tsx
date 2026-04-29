import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Starter",
    desc: "Perfect for startups needing accurate market insights.",
    price: "$999",
    period: "/mo",
    features: [
      "Access to 5M+ User Records",
      "Basic Firmographics",
      "Email Support",
      "Monthly Data Updates",
    ],
    highlighted: false,
  },
  {
    id: 2,
    name: "Growth",
    desc: "Advanced technographics for scaling sales teams.",
    price: "$2,499",
    period: "/mo",
    features: [
      "Access to 50M+ User Records",
      "Advanced Technographics",
      "Channel Partner Insights",
      "Priority Support",
      "Weekly Data Updates",
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: "Enterprise",
    desc: "Customized data appending and API access for large teams.",
    price: "Custom",
    period: "",
    features: [
      "Full Database Access (200M+)",
      "Stack Data Append",
      "Dedicated Account Manager",
      "Real-time API Access",
      "Custom Integrations",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-display text-foreground"
          >
            Transparent{" "}
            <span className="bg-lime-grad bg-clip-text text-transparent">
              Pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Choose the perfect data intelligence plan for your business needs.
            No hidden fees, cancel anytime.
          </motion.p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl border p-8 flex flex-col gap-6 shadow-card ${
                plan.highlighted
                  ? "border-primary/40 bg-card-grad shadow-glow"
                  : "border-white/10 glass"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-grad text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold font-display text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground pb-1">{plan.period}</span>
                )}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-full text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-lime-grad text-primary-foreground shadow-glow hover:opacity-90"
                    : "border border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                {plan.highlighted ? "Start Free Trial" : "Get Started"}
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check size={12} className="text-primary" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
