export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface MockOrder {
  id: string;
  items: { title: string; price: number; quantity: number; image: string; size: string; color: string }[];
  total: number;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  date: string;
  address: string;
  trackingSteps?: { label: string; date: string; completed: boolean }[];
  estimatedDelivery?: string;
}

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: "order" | "promo" | "system" | "wishlist" | "sale";
  read: boolean;
  date: string;
}

export interface MockAddress {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface MockPaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex" | "applepay";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export interface MockLoyalty {
  tier: "Silver" | "Gold" | "Elite";
  points: number;
  totalSpent: number;
  nextTierPoints: number;
  perks: string[];
}

export interface MockPreferences {
  favoriteBrands: string[];
  preferredStyles: string[];
  favoriteCategories: string[];
  sizes: { tops: string; bottoms: string; shoes: string };
  colorPreferences: string[];
}

export interface MockActivity {
  id: string;
  type: "view" | "order" | "wishlist" | "review" | "return";
  message: string;
  date: string;
  icon: string;
}

export interface MockCoupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  expires: string;
  minPurchase: number;
}

// ─── Seed Data ───

const SEED_USERS: MockUser[] = [
  {
    id: "user_seed_1",
    name: "Sarah Mitchell",
    email: "demo@trendify.com",
    password: "Demo1234",
    phone: "+1 (555) 123-4567",
    createdAt: "2024-06-15T10:00:00Z",
  },
];

const SEED_ORDERS: Record<string, MockOrder[]> = {
  user_seed_1: [
    {
      id: "ORD-2024-001",
      items: [
        { title: "Classic Wool Overcoat", price: 289.0, quantity: 1, image: "https://images.pexels.com/photos/6625880/pexels-photo-6625880.jpeg?auto=compress&cs=tinysrgb&w=100", size: "M", color: "Black" },
        { title: "Leather Chelsea Boots", price: 245.0, quantity: 1, image: "https://images.pexels.com/photos/2623832/pexels-photo-2623822.jpeg?auto=compress&cs=tinysrgb&w=100", size: "9", color: "Brown" },
      ],
      total: 534.0,
      status: "Delivered",
      date: "2024-11-20",
      address: "123 Fashion Ave, New York, NY 10001",
      trackingSteps: [
        { label: "Order Placed", date: "2024-11-20", completed: true },
        { label: "Processing", date: "2024-11-21", completed: true },
        { label: "Shipped", date: "2024-11-23", completed: true },
        { label: "Out for Delivery", date: "2024-11-25", completed: true },
        { label: "Delivered", date: "2024-11-26", completed: true },
      ],
    },
    {
      id: "ORD-2024-002",
      items: [
        { title: "Silk Wrap Dress", price: 195.0, quantity: 1, image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=100", size: "S", color: "Emerald" },
        { title: "Strappy Heeled Sandals", price: 168.0, quantity: 1, image: "https://images.pexels.com/photos/2988880/pexels-photo-2988880.jpeg?auto=compress&cs=tinysrgb&w=100", size: "8", color: "Black" },
      ],
      total: 363.0,
      status: "Shipped",
      date: "2024-12-05",
      address: "123 Fashion Ave, New York, NY 10001",
      estimatedDelivery: "2024-12-12",
      trackingSteps: [
        { label: "Order Placed", date: "2024-12-05", completed: true },
        { label: "Processing", date: "2024-12-06", completed: true },
        { label: "Shipped", date: "2024-12-07", completed: true },
        { label: "Out for Delivery", date: "", completed: false },
        { label: "Delivered", date: "", completed: false },
      ],
    },
    {
      id: "ORD-2025-001",
      items: [
        { title: "Cashmere Turtleneck", price: 175.0, quantity: 2, image: "https://images.pexels.com/photos/6764471/pexels-photo-6764471.jpeg?auto=compress&cs=tinysrgb&w=100", size: "M", color: "Cream" },
        { title: "Merino Wool Scarf", price: 85.0, quantity: 1, image: "https://images.pexels.com/photos/6712412/pexels-photo-6712412.jpeg?auto=compress&cs=tinysrgb&w=100", size: "One Size", color: "Camel" },
      ],
      total: 435.0,
      status: "Processing",
      date: "2025-04-28",
      address: "123 Fashion Ave, New York, NY 10001",
      estimatedDelivery: "2025-05-05",
      trackingSteps: [
        { label: "Order Placed", date: "2025-04-28", completed: true },
        { label: "Processing", date: "2025-04-29", completed: true },
        { label: "Shipped", date: "", completed: false },
        { label: "Out for Delivery", date: "", completed: false },
        { label: "Delivered", date: "", completed: false },
      ],
    },
    {
      id: "ORD-2024-003",
      items: [
        { title: "Designer Crossbody Bag", price: 320.0, quantity: 1, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100", size: "One Size", color: "Cognac" },
      ],
      total: 320.0,
      status: "Delivered",
      date: "2024-09-14",
      address: "456 Style Blvd, New York, NY 10018",
      trackingSteps: [
        { label: "Order Placed", date: "2024-09-14", completed: true },
        { label: "Processing", date: "2024-09-15", completed: true },
        { label: "Shipped", date: "2024-09-17", completed: true },
        { label: "Out for Delivery", date: "2024-09-19", completed: true },
        { label: "Delivered", date: "2024-09-20", completed: true },
      ],
    },
    {
      id: "ORD-2024-004",
      items: [
        { title: "Bomber Jacket", price: 185.0, quantity: 1, image: "https://images.pexels.com/photos/6765055/pexels-photo-6765055.jpeg?auto=compress&cs=tinysrgb&w=100", size: "M", color: "Olive" },
        { title: "Cargo Jogger Pants", price: 98.0, quantity: 1, image: "https://images.pexels.com/photos/6765050/pexels-photo-6765050.jpeg?auto=compress&cs=tinysrgb&w=100", size: "M", color: "Black" },
      ],
      total: 283.0,
      status: "Cancelled",
      date: "2024-10-03",
      address: "123 Fashion Ave, New York, NY 10001",
    },
  ],
};

const SEED_NOTIFICATIONS: Record<string, MockNotification[]> = {
  user_seed_1: [
    { id: "n1", title: "Order Shipped!", message: "Your order ORD-2024-002 is on its way. Estimated delivery: Dec 12.", type: "order", read: false, date: "2024-12-07" },
    { id: "n2", title: "Winter Collection Launch", message: "Discover our new Winter 2025 collection with 200+ new arrivals.", type: "promo", read: false, date: "2024-12-01" },
    { id: "n3", title: "Flash Sale: 30% Off", message: "Exclusive 48-hour sale on outerwear. Use code WINTER30 at checkout.", type: "sale", read: false, date: "2024-11-28" },
    { id: "n4", title: "Wishlist Item Back in Stock", message: "The Cashmere Lounge Set in Oatmeal is back! Grab yours before it sells out.", type: "wishlist", read: false, date: "2024-11-26" },
    { id: "n5", title: "Order Delivered", message: "Your order ORD-2024-001 has been delivered. Enjoy your new pieces!", type: "order", read: true, date: "2024-11-26" },
    { id: "n6", title: "Earn Double Points", message: "Shop this weekend and earn 2x loyalty points on all purchases.", type: "promo", read: true, date: "2024-11-20" },
    { id: "n7", title: "Welcome to Trendify!", message: "Thanks for joining! Enjoy 10% off your first order with code WELCOME10.", type: "system", read: true, date: "2024-06-15" },
  ],
};

const SEED_ADDRESSES: Record<string, MockAddress[]> = {
  user_seed_1: [
    { id: "addr1", label: "Home", name: "Sarah Mitchell", street: "123 Fashion Ave", city: "New York", state: "NY", zip: "10001", country: "United States", phone: "+1 (555) 123-4567", isDefault: true },
    { id: "addr2", label: "Office", name: "Sarah Mitchell", street: "456 Style Blvd, Suite 200", city: "New York", state: "NY", zip: "10018", country: "United States", phone: "+1 (555) 987-6543", isDefault: false },
  ],
};

const SEED_PAYMENTS: Record<string, MockPaymentMethod[]> = {
  user_seed_1: [
    { id: "pay1", type: "visa", last4: "4829", expiry: "08/27", isDefault: true },
    { id: "pay2", type: "mastercard", last4: "3156", expiry: "03/26", isDefault: false },
    { id: "pay3", type: "applepay", last4: "", expiry: "", isDefault: false },
  ],
};

const SEED_LOYALTY: Record<string, MockLoyalty> = {
  user_seed_1: {
    tier: "Gold",
    points: 2450,
    totalSpent: 1935.0,
    nextTierPoints: 5000,
    perks: ["Free shipping on all orders", "Early access to sales", "Birthday bonus 200 points", "Exclusive member events", "Priority customer support"],
  },
};

const SEED_PREFERENCES: Record<string, MockPreferences> = {
  user_seed_1: {
    favoriteBrands: ["Trendify Essentials", "Maison Luxe", "Atelier Noir", "Studio Minimal"],
    preferredStyles: ["Minimalist", "Classic Elegance", "Smart Casual", "Scandinavian"],
    favoriteCategories: ["Outerwear", "Knitwear", "Accessories", "Footwear"],
    sizes: { tops: "M", bottoms: "M", shoes: "8" },
    colorPreferences: ["Neutral Tones", "Black", "Cream", "Camel", "Navy"],
  },
};

const SEED_ACTIVITY: Record<string, MockActivity[]> = {
  user_seed_1: [
    { id: "a1", type: "order", message: "Placed order ORD-2025-001 for $435.00", date: "2025-04-28", icon: "shopping-bag" },
    { id: "a2", type: "wishlist", message: "Added Alpaca Wool Sweater to wishlist", date: "2025-04-27", icon: "heart" },
    { id: "a3", type: "view", message: "Viewed Fleece-Lined Parka", date: "2025-04-26", icon: "eye" },
    { id: "a4", type: "review", message: "Reviewed Classic Wool Overcoat - 5 stars", date: "2025-04-25", icon: "star" },
    { id: "a5", type: "order", message: "Placed order ORD-2024-002 for $363.00", date: "2024-12-05", icon: "shopping-bag" },
    { id: "a6", type: "wishlist", message: "Added Cashmere Lounge Set to wishlist", date: "2024-12-03", icon: "heart" },
    { id: "a7", type: "view", message: "Viewed Designer Crossbody Bag", date: "2024-12-01", icon: "eye" },
    { id: "a8", type: "order", message: "Placed order ORD-2024-001 for $534.00", date: "2024-11-20", icon: "shopping-bag" },
    { id: "a9", type: "return", message: "Returned Bomber Jacket from ORD-2024-004", date: "2024-10-05", icon: "refresh" },
    { id: "a10", type: "review", message: "Reviewed Designer Crossbody Bag - 4 stars", date: "2024-09-25", icon: "star" },
  ],
};

const SEED_COUPONS: Record<string, MockCoupon[]> = {
  user_seed_1: [
    { id: "c1", code: "WELCOME10", discount: "10%", description: "Welcome discount on your first order", expires: "2025-12-31", minPurchase: 0 },
    { id: "c2", code: "WINTER30", discount: "30%", description: "Winter outerwear flash sale", expires: "2025-01-15", minPurchase: 100 },
    { id: "c3", code: "LOYALTY15", discount: "15%", description: "Gold member exclusive reward", expires: "2025-06-30", minPurchase: 150 },
  ],
};

// ─── Initialize ───

export function initializeMockData() {
  if (!localStorage.getItem("trendify_users")) {
    localStorage.setItem("trendify_users", JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem("trendify_orders")) {
    localStorage.setItem("trendify_orders", JSON.stringify(SEED_ORDERS));
  }
  if (!localStorage.getItem("trendify_notifications")) {
    localStorage.setItem("trendify_notifications", JSON.stringify(SEED_NOTIFICATIONS));
  }
  if (!localStorage.getItem("trendify_addresses")) {
    localStorage.setItem("trendify_addresses", JSON.stringify(SEED_ADDRESSES));
  }
  if (!localStorage.getItem("trendify_payments")) {
    localStorage.setItem("trendify_payments", JSON.stringify(SEED_PAYMENTS));
  }
  if (!localStorage.getItem("trendify_loyalty")) {
    localStorage.setItem("trendify_loyalty", JSON.stringify(SEED_LOYALTY));
  }
  if (!localStorage.getItem("trendify_preferences")) {
    localStorage.setItem("trendify_preferences", JSON.stringify(SEED_PREFERENCES));
  }
  if (!localStorage.getItem("trendify_activity")) {
    localStorage.setItem("trendify_activity", JSON.stringify(SEED_ACTIVITY));
  }
  if (!localStorage.getItem("trendify_coupons")) {
    localStorage.setItem("trendify_coupons", JSON.stringify(SEED_COUPONS));
  }
  if (!localStorage.getItem("trendify_password_resets")) {
    localStorage.setItem("trendify_password_resets", JSON.stringify([]));
  }
}

// ─── User CRUD ───

export function getUsers(): MockUser[] {
  return JSON.parse(localStorage.getItem("trendify_users") || "[]");
}

export function findUserByEmail(email: string): MockUser | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(user: MockUser): boolean {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === user.email.toLowerCase())) return false;
  users.push(user);
  localStorage.setItem("trendify_users", JSON.stringify(users));

  const orders = JSON.parse(localStorage.getItem("trendify_orders") || "{}");
  orders[user.id] = [];
  localStorage.setItem("trendify_orders", JSON.stringify(orders));

  const notifications = JSON.parse(localStorage.getItem("trendify_notifications") || "{}");
  notifications[user.id] = [
    { id: "n_welcome", title: "Welcome to Trendify!", message: "Thanks for creating an account. Enjoy 10% off your first order with code WELCOME10.", type: "system", read: false, date: new Date().toISOString().split("T")[0] },
  ];
  localStorage.setItem("trendify_notifications", JSON.stringify(notifications));

  const addresses = JSON.parse(localStorage.getItem("trendify_addresses") || "{}");
  addresses[user.id] = [];
  localStorage.setItem("trendify_addresses", JSON.stringify(addresses));

  const payments = JSON.parse(localStorage.getItem("trendify_payments") || "{}");
  payments[user.id] = [];
  localStorage.setItem("trendify_payments", JSON.stringify(payments));

  const loyalty = JSON.parse(localStorage.getItem("trendify_loyalty") || "{}");
  loyalty[user.id] = { tier: "Silver", points: 100, totalSpent: 0, nextTierPoints: 1000, perks: ["Free shipping on orders over $100", "Birthday bonus 50 points"] };
  localStorage.setItem("trendify_loyalty", JSON.stringify(loyalty));

  const preferences = JSON.parse(localStorage.getItem("trendify_preferences") || "{}");
  preferences[user.id] = { favoriteBrands: [], preferredStyles: [], favoriteCategories: [], sizes: { tops: "M", bottoms: "M", shoes: "8" }, colorPreferences: [] };
  localStorage.setItem("trendify_preferences", JSON.stringify(preferences));

  const activity = JSON.parse(localStorage.getItem("trendify_activity") || "{}");
  activity[user.id] = [{ id: "a_init", type: "system", message: "Account created", date: new Date().toISOString().split("T")[0], icon: "user" }];
  localStorage.setItem("trendify_activity", JSON.stringify(activity));

  const coupons = JSON.parse(localStorage.getItem("trendify_coupons") || "{}");
  coupons[user.id] = [{ id: "c_welcome", code: "WELCOME10", discount: "10%", description: "Welcome discount on your first order", expires: "2025-12-31", minPurchase: 0 }];
  localStorage.setItem("trendify_coupons", JSON.stringify(coupons));

  return true;
}

// ─── Orders ───

export function getOrders(userId: string): MockOrder[] {
  const all = JSON.parse(localStorage.getItem("trendify_orders") || "{}");
  return all[userId] || [];
}

export function addOrder(userId: string, order: MockOrder) {
  const all = JSON.parse(localStorage.getItem("trendify_orders") || "{}");
  if (!all[userId]) all[userId] = [];
  all[userId].unshift(order);
  localStorage.setItem("trendify_orders", JSON.stringify(all));
}

// ─── Notifications ───

export function getNotifications(userId: string): MockNotification[] {
  const all = JSON.parse(localStorage.getItem("trendify_notifications") || "{}");
  return all[userId] || [];
}

export function markNotificationRead(userId: string, notificationId: string) {
  const all = JSON.parse(localStorage.getItem("trendify_notifications") || "{}");
  if (all[userId]) {
    all[userId] = all[userId].map((n: MockNotification) =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    localStorage.setItem("trendify_notifications", JSON.stringify(all));
  }
}

export function unreadNotificationCount(userId: string): number {
  return getNotifications(userId).filter((n) => !n.read).length;
}

// ─── Addresses ───

export function getAddresses(userId: string): MockAddress[] {
  const all = JSON.parse(localStorage.getItem("trendify_addresses") || "{}");
  return all[userId] || [];
}

export function addAddress(userId: string, address: MockAddress) {
  const all = JSON.parse(localStorage.getItem("trendify_addresses") || "{}");
  if (!all[userId]) all[userId] = [];
  if (address.isDefault) {
    all[userId] = all[userId].map((a: MockAddress) => ({ ...a, isDefault: false }));
  }
  all[userId].push(address);
  localStorage.setItem("trendify_addresses", JSON.stringify(all));
}

export function deleteAddress(userId: string, addressId: string) {
  const all = JSON.parse(localStorage.getItem("trendify_addresses") || "{}");
  if (all[userId]) {
    all[userId] = all[userId].filter((a: MockAddress) => a.id !== addressId);
    localStorage.setItem("trendify_addresses", JSON.stringify(all));
  }
}

// ─── Payments ───

export function getPayments(userId: string): MockPaymentMethod[] {
  const all = JSON.parse(localStorage.getItem("trendify_payments") || "{}");
  return all[userId] || [];
}

// ─── Loyalty ───

export function getLoyalty(userId: string): MockLoyalty {
  const all = JSON.parse(localStorage.getItem("trendify_loyalty") || "{}");
  return all[userId] || { tier: "Silver", points: 0, totalSpent: 0, nextTierPoints: 1000, perks: [] };
}

// ─── Preferences ───

export function getPreferences(userId: string): MockPreferences {
  const all = JSON.parse(localStorage.getItem("trendify_preferences") || "{}");
  return all[userId] || { favoriteBrands: [], preferredStyles: [], favoriteCategories: [], sizes: { tops: "M", bottoms: "M", shoes: "8" }, colorPreferences: [] };
}

// ─── Activity ───

export function getActivity(userId: string): MockActivity[] {
  const all = JSON.parse(localStorage.getItem("trendify_activity") || "{}");
  return all[userId] || [];
}

// ─── Coupons ───

export function getCoupons(userId: string): MockCoupon[] {
  const all = JSON.parse(localStorage.getItem("trendify_coupons") || "{}");
  return all[userId] || [];
}

// ─── Password Reset ───

export interface PasswordResetToken {
  email: string;
  token: string;
  expires: number; // timestamp
}

export function initiatePasswordReset(email: string): string | null {
  const user = findUserByEmail(email);
  if (!user) return null;

  const token: PasswordResetToken = {
    email: email.toLowerCase(),
    token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  const resets = JSON.parse(localStorage.getItem("trendify_password_resets") || "[]");
  // Remove any existing resets for this email
  const filtered = resets.filter((r: PasswordResetToken) => r.email !== email.toLowerCase());
  filtered.push(token);
  localStorage.setItem("trendify_password_resets", JSON.stringify(filtered));

  return token.token;
}

export function verifyResetToken(token: string): string | null {
  const resets: PasswordResetToken[] = JSON.parse(localStorage.getItem("trendify_password_resets") || "[]");
  const reset = resets.find(r => r.token === token && r.expires > Date.now());
  if (!reset) return null;

  return reset.email;
}

export function resetPassword(token: string, newPassword: string): boolean {
  const email = verifyResetToken(token);
  if (!email) return false;

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email);
  if (userIndex === -1) return false;

  users[userIndex].password = newPassword;
  localStorage.setItem("trendify_users", JSON.stringify(users));

  // Clean up the used token
  const resets: PasswordResetToken[] = JSON.parse(localStorage.getItem("trendify_password_resets") || "[]");
  const filtered = resets.filter((r: PasswordResetToken) => r.token !== token);
  localStorage.setItem("trendify_password_resets", JSON.stringify(filtered));

  return true;
}
