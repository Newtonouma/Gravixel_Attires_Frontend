/**
 * Utility functions for formatting currency and numbers
 */

/**
 * Format a number as Kenyan Shillings with comma separation
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: 'KES')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'KES'): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `${currency} 0`;
  }
  
  return `${currency} ${amount.toLocaleString()}`;
};

/**
 * Format a number with comma separation (no currency)
 * @param number - The number to format
 * @returns Formatted number string with commas
 */
export const formatNumber = (number: number): string => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  return number.toLocaleString();
};

/**
 * Parse a currency string back to number
 * @param currencyString - Currency string like "KES 1,234"
 * @returns The numeric value
 */
export const parseCurrency = (currencyString: string): number => {
  if (typeof currencyString !== 'string') {
    return 0;
  }
  
  // Remove currency symbol and commas, then convert to number
  const numericString = currencyString.replace(/[^0-9.-]/g, '');
  const number = parseFloat(numericString);
  
  return isNaN(number) ? 0 : number;
};