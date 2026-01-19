import { crmApi } from './crmcom-api';
import { ChatResponse, Product } from '@/types';

/**
 * Chat Service - Processes user messages and fetches relevant stock data
 * This service can be enhanced with OpenAI for more sophisticated responses
 */

// Intent detection patterns
const INTENT_PATTERNS = {
  STOCK_CHECK: /stock|inventory|available|availability|how many|quantity/i,
  PRODUCT_SEARCH: /find|search|show|looking for|need|want|have/i,
  LOW_STOCK: /low stock|running low|almost out|need to order|reorder/i,
  OUT_OF_STOCK: /out of stock|not available|unavailable|sold out/i,
  PRICE: /price|cost|how much|expensive/i,
  PRESCRIPTION: /prescription|rx|doctor|prescribed/i,
  CATEGORY: /painkiller|antibiotic|vitamin|allergy|digestive|category/i,
  GREETING: /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
  HELP: /help|what can you do|how do you work/i,
};

// Extract potential product names or SKUs from message
function extractProductTerms(message: string): string[] {
  // Common medicine names and patterns
  const terms: string[] = [];

  // Look for SKU patterns (uppercase letters followed by numbers)
  const skuMatches = message.match(/[A-Z]{3,}[0-9]+/g);
  if (skuMatches) terms.push(...skuMatches);

  // Common drug name patterns
  const drugPatterns = [
    /paracetamol/i,
    /ibuprofen/i,
    /aspirin/i,
    /amoxicillin/i,
    /omeprazole/i,
    /loratadine/i,
    /vitamin\s*[a-z0-9]+/i,
    /antibiotic/i,
    /painkiller/i,
  ];

  drugPatterns.forEach((pattern) => {
    const match = message.match(pattern);
    if (match) terms.push(match[0]);
  });

  return [...new Set(terms)];
}

// Detect the user's intent
function detectIntent(message: string): string[] {
  const intents: string[] = [];

  Object.entries(INTENT_PATTERNS).forEach(([intent, pattern]) => {
    if (pattern.test(message)) {
      intents.push(intent);
    }
  });

  return intents.length > 0 ? intents : ['GENERAL'];
}

// Generate response based on intent and data
async function generateResponse(
  message: string,
  intents: string[],
  products: Product[]
): Promise<string> {
  // Greeting
  if (intents.includes('GREETING')) {
    return `Hello! I'm your Pharmacy Stock Assistant. I can help you check product availability, search for medications, and provide stock information. What would you like to know?`;
  }

  // Help
  if (intents.includes('HELP')) {
    return `I can help you with:
- Checking stock levels for specific products
- Searching for medications by name or category
- Finding products that are low on stock
- Checking if items are out of stock
- Providing pricing information
- Identifying prescription requirements

Just ask me something like "Do we have paracetamol in stock?" or "Show me all painkillers"`;
  }

  // Low stock query
  if (intents.includes('LOW_STOCK')) {
    const lowStockProducts = products.filter(
      (p) => p.stock_status === 'low_stock' || p.stock_quantity < 20
    );
    if (lowStockProducts.length > 0) {
      return `I found ${lowStockProducts.length} product(s) with low stock levels that may need reordering:`;
    }
    return 'Good news! All products currently have adequate stock levels.';
  }

  // Out of stock query
  if (intents.includes('OUT_OF_STOCK')) {
    const outOfStockProducts = products.filter(
      (p) => p.stock_status === 'out_of_stock' || p.stock_quantity === 0
    );
    if (outOfStockProducts.length > 0) {
      return `I found ${outOfStockProducts.length} product(s) that are currently out of stock:`;
    }
    return 'Great news! All products are currently in stock.';
  }

  // Stock check for specific product
  if (intents.includes('STOCK_CHECK') && products.length > 0) {
    if (products.length === 1) {
      const p = products[0];
      const status =
        p.stock_status === 'in_stock'
          ? `in stock with ${p.stock_quantity} units available`
          : p.stock_status === 'low_stock'
          ? `running low with only ${p.stock_quantity} units remaining`
          : 'currently out of stock';
      return `${p.name} is ${status}.${
        p.requires_prescription ? ' Note: This product requires a prescription.' : ''
      }`;
    }
    return `I found ${products.length} matching products. Here's the stock information:`;
  }

  // Product search
  if (intents.includes('PRODUCT_SEARCH') || intents.includes('CATEGORY')) {
    if (products.length > 0) {
      return `I found ${products.length} product(s) matching your search:`;
    }
    return "I couldn't find any products matching your search. Try searching by product name, SKU, or category (e.g., painkillers, vitamins, antibiotics).";
  }

  // Price inquiry
  if (intents.includes('PRICE') && products.length > 0) {
    if (products.length === 1) {
      const p = products[0];
      return `${p.name} is priced at ${p.currency} ${p.price.toFixed(2)}.${
        p.stock_quantity > 0
          ? ` We have ${p.stock_quantity} units in stock.`
          : ' However, it is currently out of stock.'
      }`;
    }
    return `Here are the prices for the products I found:`;
  }

  // General response with products
  if (products.length > 0) {
    return `Here's what I found based on your query:`;
  }

  // Default fallback
  return `I understand you're asking about "${message}". Could you please be more specific? You can ask me about:
- Stock levels (e.g., "Check stock for paracetamol")
- Product availability (e.g., "Is ibuprofen available?")
- Categories (e.g., "Show me all vitamins")
- Low stock alerts (e.g., "What's running low?")`;
}

export async function processChat(message: string): Promise<ChatResponse> {
  const intents = detectIntent(message);
  const searchTerms = extractProductTerms(message);

  let products: Product[] = [];

  // Fetch products based on intent
  if (
    intents.includes('LOW_STOCK') ||
    intents.includes('OUT_OF_STOCK')
  ) {
    // Get all products and filter
    const allProducts = await crmApi.searchProducts('');
    products =
      intents.includes('OUT_OF_STOCK')
        ? allProducts.filter((p) => p.stock_quantity === 0)
        : allProducts.filter((p) => p.stock_quantity < 20 && p.stock_quantity > 0);
  } else if (searchTerms.length > 0) {
    // Search for specific products
    const searchPromises = searchTerms.map((term) => crmApi.searchProducts(term));
    const results = await Promise.all(searchPromises);
    products = results.flat();
    // Remove duplicates
    products = products.filter(
      (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
    );
  } else if (
    intents.includes('PRODUCT_SEARCH') ||
    intents.includes('CATEGORY')
  ) {
    // Try to extract category or search term from message
    const categoryMatch = message.match(
      /painkiller|antibiotic|vitamin|allergy|digestive/i
    );
    if (categoryMatch) {
      products = await crmApi.searchProducts(categoryMatch[0]);
    } else {
      // General search with the message
      const words = message.split(' ').filter((w) => w.length > 3);
      for (const word of words) {
        const found = await crmApi.searchProducts(word);
        if (found.length > 0) {
          products = found;
          break;
        }
      }
    }
  }

  const responseMessage = await generateResponse(message, intents, products);

  return {
    message: responseMessage,
    products: products.length > 0 ? products : undefined,
  };
}
