import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineGlobe, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh, HiOutlineSupport } from "react-icons/hi";
import Breadcrumb from "../components/Breadcrumb";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Premium Products" },
  { value: "15+", label: "Countries Served" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: HiOutlineSparkles,
    title: "Quality First",
    description: "Every piece is crafted from premium materials sourced from the finest suppliers worldwide. We never compromise on quality.",
  },
  {
    icon: HiOutlineGlobe,
    title: "Sustainable Fashion",
    description: "We are committed to ethical practices and sustainable sourcing. Our packaging is 100% recyclable and we offset our carbon footprint.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Timeless Design",
    description: "Our collections blend contemporary trends with classic elegance that transcends seasons. Invest in pieces that last.",
  },
];

const team = [
  {
    name: "Olivia Hart",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    bio: "With 15 years in luxury fashion, Olivia founded Trendify to make premium style accessible to everyone.",
  },
  {
    name: "Marcus Chen",
    role: "Creative Director",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    bio: "Marcus brings his vision from Milan and Paris runways to every Trendify collection.",
  },
  {
    name: "Aisha Patel",
    role: "Head of Sustainability",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    bio: "Aisha ensures every step of our supply chain meets the highest ethical and environmental standards.",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300",
    bio: "David oversees our global logistics, ensuring your orders arrive swiftly and sustainably.",
  },
];

const perks = [
  { icon: HiOutlineTruck, title: "Free Shipping", desc: "On orders over $200" },
  { icon: HiOutlineRefresh, title: "Easy Returns", desc: "30-day return policy" },
  { icon: HiOutlineShieldCheck, title: "Secure Payment", desc: "SSL encrypted checkout" },
  { icon: HiOutlineSupport, title: "24/7 Support", desc: "Always here to help" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "About Us" }]} />

        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mt-4 mb-20">
          <div className="aspect-[21/9] sm:aspect-[3/1] relative">
            <img
              src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="About Trendify"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-16 max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium tracking-[0.2em] uppercase text-amber-400 mb-3"
                >
                  Our Story
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Fashion That Speaks Your Language
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-neutral-300 text-lg leading-relaxed"
                >
                  Founded in 2020, Trendify was born from a passion for creating premium fashion that empowers individuals to express their unique identity.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-3">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                Crafting Excellence Since Day One
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                At Trendify, we believe that fashion is more than clothing -- it is a form of
                self-expression. Our team of designers and artisans work tirelessly to create
                pieces that combine premium quality with contemporary design.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                From sourcing the finest Italian wools to partnering with sustainable fabric
                mills, every step of our process reflects our commitment to excellence and
                environmental responsibility.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                Our mission is simple: to make premium fashion accessible, sustainable, and
                empowering for everyone. We believe that looking good should never come at the
                cost of feeling good about your choices.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                Explore Our Collection
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6764471/pexels-photo-6764471.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Fashion craftsmanship"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                <img
                  src="https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Premium materials"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
              >
                <p className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center mx-auto mb-5">
                  <value.icon className="text-white dark:text-neutral-900" size={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-3">
              The People Behind
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{member.role}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl">
          <div className="px-8 sm:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">Why Shop With Us</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center mx-auto mb-3">
                    <perk.icon className="text-neutral-900 dark:text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{perk.title}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-8">
              Discover our latest collection and find pieces that speak to your unique identity.
            </p>
            <Link
              to="/shop"
              className="inline-flex px-8 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
