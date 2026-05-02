import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock, HiOutlineChat, HiOutlineGlobeAlt } from "react-icons/hi";
import Breadcrumb from "../components/Breadcrumb";

const contactInfo = [
  {
    icon: HiOutlineMail,
    label: "Email Us",
    value: "hello@trendify.com",
    desc: "We reply within 24 hours",
  },
  {
    icon: HiOutlinePhone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    desc: "Mon-Fri, 9am - 6pm EST",
  },
  {
    icon: HiOutlineLocationMarker,
    label: "Visit Us",
    value: "123 Fashion Ave, New York, NY 10001",
    desc: "Open for walk-ins",
  },
  {
    icon: HiOutlineClock,
    label: "Business Hours",
    value: "Mon - Sat: 9AM - 9PM",
    desc: "Sunday: 10AM - 6PM",
  },
];

const faqs = [
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy on all unworn items with tags attached. Returns are free for orders within the US.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 15 countries worldwide. International shipping typically takes 7-14 business days.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you will receive a tracking number via email. You can also check order status in your account.",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden mt-4 mb-20">
          <div className="aspect-[21/9] sm:aspect-[3/1] relative">
            <img
              src="https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Contact Trendify"
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
                  Get in Touch
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  We&apos;d Love to Hear From You
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-neutral-300 text-lg leading-relaxed"
                >
                  Have a question, feedback, or just want to say hello? Our team is here to help.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center mb-4">
                  <info.icon className="text-white dark:text-neutral-900" size={22} />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-1">{info.label}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{info.value}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form + Map */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <p className="text-sm font-medium tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 mb-3">
                  Send a Message
                </p>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                    <HiOutlineChat className="text-emerald-600 dark:text-emerald-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                    Thank you for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 px-6 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="product">Product Question</option>
                      <option value="shipping">Shipping Information</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Side - Store Image + FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Store Image */}
              <div className="rounded-2xl overflow-hidden aspect-video">
                <img
                  src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Trendify Store"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Quick Contact */}
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center">
                    <HiOutlineGlobeAlt className="text-white dark:text-neutral-900" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-white">Quick Connect</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Reach us on social media</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "Facebook", "Pinterest"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 transition-colors"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
                    >
                      <h4 className="font-medium text-sm text-neutral-900 dark:text-white">{faq.q}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
