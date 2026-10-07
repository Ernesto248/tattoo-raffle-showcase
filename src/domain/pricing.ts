// Premium Packages Pricing System
// 1x$50, 2x$100, 3x$130, 4x$180, 5x$220, 6x$260, 7x$300, 8x$340, 9x$380, 10x$420

export interface PremiumPackage {
  quantity: number;
  price: number;
  savings?: number;
  popular?: boolean;
}

export interface PriceBreakdown {
  totalPrice: number;
  quantity: number;
  savings: number;
}

// Premium packages configuration
export const PREMIUM_PACKAGES: PremiumPackage[] = [
  { quantity: 1, price: 50 },
  { quantity: 2, price: 100 },
  { quantity: 3, price: 130, savings: 20 },
  { quantity: 4, price: 180, savings: 20 },
  { quantity: 5, price: 220, savings: 30 },
  { quantity: 6, price: 260, savings: 40 },
  { quantity: 7, price: 300, savings: 50 },
  { quantity: 8, price: 340, savings: 60 },
  { quantity: 9, price: 380, savings: 70 },
  { quantity: 10, price: 420, savings: 80 },
];

export function calculateOptimalPrice(ticketCount: number): PriceBreakdown {
  if (ticketCount <= 0 || ticketCount > 10) {
    return { totalPrice: 0, quantity: 0, savings: 0 };
  }

  const packageInfo = PREMIUM_PACKAGES.find(
    (pkg) => pkg.quantity === ticketCount
  );

  if (!packageInfo) {
    return { totalPrice: 0, quantity: 0, savings: 0 };
  }

  const regularPrice = ticketCount * 50; // $50 per ticket
  const savings = regularPrice - packageInfo.price;

  return {
    totalPrice: packageInfo.price,
    quantity: ticketCount,
    savings: Math.max(0, savings),
  };
}

export function formatPriceBreakdown(breakdown: PriceBreakdown): string {
  if (breakdown.quantity === 0) return "";

  const baseText = `${breakdown.quantity} ticket${
    breakdown.quantity > 1 ? "s" : ""
  } - $${breakdown.totalPrice}`;

  if (breakdown.savings > 0) {
    return `${baseText} (Save $${breakdown.savings})`;
  }

  return baseText;
}

// Get package by quantity
export function getPackageByQuantity(
  quantity: number
): PremiumPackage | undefined {
  return PREMIUM_PACKAGES.find((pkg) => pkg.quantity === quantity);
}
