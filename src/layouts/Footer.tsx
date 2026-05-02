import { Link } from "react-router-dom";
import { HiOutlineArrowUp } from "react-icons/hi";
import { FaInstagram, FaTwitter, FaPinterest, FaFacebookF } from "react-icons/fa";

const footerLinks = {
  Shop: [
    { label: "Women", to: "/shop?category=Women" },
    { label: "Men", to: "/shop?category=Men" },
    { label: "Accessories", to: "/shop?category=Accessories" },
    { label: "Footwear", to: "/shop?category=Footwear" },
    { label: "Outerwear", to: "/shop?category=Outerwear" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "#" },
    { label: "Press", to: "#" },
  ],
  Help: [
    { label: "Shipping & Returns", to: "#" },
    { label: "Size Guide", to: "#" },
    { label: "FAQ", to: "#" },
    { label: "Track Order", to: "#" },
  ],
};

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaPinterest, href: "#", label: "Pinterest" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Trendify
            </Link>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-sm">
              Curating premium fashion for the modern individual. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Trendify. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"
            aria-label="Back to top"
          >
            <HiOutlineArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
