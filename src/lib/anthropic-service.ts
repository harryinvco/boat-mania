import Anthropic from '@anthropic-ai/sdk';
import {
  Product,
  CartAction,
  CartSummary,
  ConversationMessage,
  EnhancedChatResponse
} from '@/types';
import { searchProducts, getProductById, PRODUCTS } from '@/data/products';

// Lazy initialization to avoid build-time errors when API key is not present
let anthropicClient: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
  return anthropicClient;
}

// System prompt for the pharmacy assistant
const SYSTEM_PROMPT = `You are a helpful pharmacy assistant for PharmaCare+. Your role is to:
- Help customers find products (medications, vitamins, supplements, etc.)
- Answer questions about medications, dosages, and availability
- Manage their shopping cart (add items, remove items, update quantities)
- Provide helpful health-related information (but always recommend consulting a doctor for medical advice)

Guidelines:
- Be friendly, professional, and concise
- When showing products, include relevant details like price and stock status
- For prescription medications, always mention that a prescription is required
- If a product is out of stock, suggest alternatives when possible
- When adding to cart, confirm the action was completed
- Never provide medical diagnoses or replace professional medical advice

Language:
- If the user writes in Greek (Ελληνικά), respond in Greek
- If the user writes in Greeklish (Greek words written with Latin characters, e.g., "kalimera", "thelo paracetamol"), respond in Greek (using the Greek alphabet)
- Otherwise, respond in the same language the user is using

You have access to tools to search products, manage the cart, and check availability.
Always use the appropriate tool when the user wants to find products or manage their cart.`;

// Anthropic tool definitions
const tools: Anthropic.Tool[] = [
  {
    name: 'search_products',
    description: 'Search for products by name, category, brand, or active ingredient. Use this when customers ask about products or want to see available items.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Search query - product name, category (painkillers, vitamins, antibiotics, allergy, digestive, skincare, firstaid), brand, or active ingredient',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'add_to_cart',
    description: 'Add a product to the customer\'s shopping cart. Use this when customer wants to buy or add an item.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string',
          description: 'The product ID to add to cart',
        },
        quantity: {
          type: 'number',
          description: 'Quantity to add (default: 1)',
        },
      },
      required: ['productId'],
    },
  },
  {
    name: 'remove_from_cart',
    description: 'Remove a product from the customer\'s shopping cart.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string',
          description: 'The product ID to remove from cart',
        },
      },
      required: ['productId'],
    },
  },
  {
    name: 'update_cart_quantity',
    description: 'Update the quantity of a product in the cart.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string',
          description: 'The product ID to update',
        },
        quantity: {
          type: 'number',
          description: 'New quantity',
        },
      },
      required: ['productId', 'quantity'],
    },
  },
  {
    name: 'get_cart_contents',
    description: 'Get the current contents of the customer\'s shopping cart. Use when customer asks what\'s in their cart.',
    input_schema: {
      type: 'object' as const,
      properties: {},
    },
  },
  {
    name: 'check_product_availability',
    description: 'Check the stock status and availability of a specific product.',
    input_schema: {
      type: 'object' as const,
      properties: {
        productId: {
          type: 'string',
          description: 'The product ID to check',
        },
      },
      required: ['productId'],
    },
  },
  {
    name: 'clear_cart',
    description: 'Remove all items from the customer\'s shopping cart.',
    input_schema: {
      type: 'object' as const,
      properties: {},
    },
  },
];

// Function handlers
interface FunctionResult {
  result: string;
  products?: Product[];
  actions?: CartAction[];
}

function handleSearchProducts(args: { query: string }): FunctionResult {
  const products = searchProducts(args.query);

  if (products.length === 0) {
    return {
      result: `No products found for "${args.query}". Available categories: painkillers, vitamins, antibiotics, allergy, digestive, skincare, firstaid.`,
    };
  }

  const productList = products.slice(0, 5).map(p =>
    `- ${p.name} (${p.currency}${p.price.toFixed(2)}) - ${p.stock_status.replace('_', ' ')}${p.requires_prescription ? ' [Prescription Required]' : ''}`
  ).join('\n');

  return {
    result: `Found ${products.length} product(s):\n${productList}`,
    products: products.slice(0, 5),
  };
}

function handleAddToCart(
  args: { productId: string; quantity?: number },
  cartContext?: CartSummary
): FunctionResult {
  const product = getProductById(args.productId);
  const quantity = args.quantity || 1;

  if (!product) {
    // Try to find by name match
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(args.productId.toLowerCase()) ||
      p.sku.toLowerCase() === args.productId.toLowerCase()
    );

    if (matches.length === 1) {
      const p = matches[0];
      if (p.stock_status === 'out_of_stock') {
        return {
          result: `Sorry, ${p.name} is currently out of stock.`,
          products: [p],
        };
      }
      return {
        result: `Added ${quantity}x ${p.name} to cart at ${p.currency}${p.price.toFixed(2)} each.`,
        products: [p],
        actions: [{
          type: 'ADD_TO_CART',
          productId: p.id,
          productName: p.name,
          quantity,
        }],
      };
    }

    return {
      result: `Product not found. Please search for available products first.`,
    };
  }

  if (product.stock_status === 'out_of_stock') {
    return {
      result: `Sorry, ${product.name} is currently out of stock.`,
      products: [product],
    };
  }

  return {
    result: `Added ${quantity}x ${product.name} to cart at ${product.currency}${product.price.toFixed(2)} each.`,
    products: [product],
    actions: [{
      type: 'ADD_TO_CART',
      productId: product.id,
      productName: product.name,
      quantity,
    }],
  };
}

function handleRemoveFromCart(
  args: { productId: string },
  cartContext?: CartSummary
): FunctionResult {
  // Find product in cart by ID or name
  const cartItem = cartContext?.items.find(item =>
    item.productId === args.productId ||
    item.productName.toLowerCase().includes(args.productId.toLowerCase())
  );

  if (!cartItem && cartContext) {
    return {
      result: `This item is not in your cart. Current cart has ${cartContext.itemCount} item(s).`,
    };
  }

  const product = getProductById(cartItem?.productId || args.productId);

  return {
    result: `Removed ${cartItem?.productName || 'item'} from your cart.`,
    products: product ? [product] : undefined,
    actions: [{
      type: 'REMOVE_FROM_CART',
      productId: cartItem?.productId || args.productId,
      productName: cartItem?.productName,
    }],
  };
}

function handleUpdateCartQuantity(
  args: { productId: string; quantity: number },
  cartContext?: CartSummary
): FunctionResult {
  const cartItem = cartContext?.items.find(item =>
    item.productId === args.productId ||
    item.productName.toLowerCase().includes(args.productId.toLowerCase())
  );

  if (!cartItem && cartContext) {
    return {
      result: `This item is not in your cart.`,
    };
  }

  if (args.quantity <= 0) {
    return {
      result: `Removed ${cartItem?.productName || 'item'} from your cart.`,
      actions: [{
        type: 'REMOVE_FROM_CART',
        productId: cartItem?.productId || args.productId,
        productName: cartItem?.productName,
      }],
    };
  }

  return {
    result: `Updated ${cartItem?.productName || 'item'} quantity to ${args.quantity}.`,
    actions: [{
      type: 'UPDATE_QUANTITY',
      productId: cartItem?.productId || args.productId,
      productName: cartItem?.productName,
      quantity: args.quantity,
    }],
  };
}

function handleGetCartContents(cartContext?: CartSummary): FunctionResult {
  if (!cartContext || cartContext.items.length === 0) {
    return {
      result: 'Your cart is empty.',
      actions: [{ type: 'SHOW_CART' }],
    };
  }

  const itemsList = cartContext.items.map(item =>
    `- ${item.quantity}x ${item.productName} (${item.price.toFixed(2)} each)`
  ).join('\n');

  return {
    result: `Your cart contains ${cartContext.itemCount} item(s):\n${itemsList}\n\nTotal: ${cartContext.total.toFixed(2)}`,
    actions: [{ type: 'SHOW_CART' }],
  };
}

function handleCheckAvailability(args: { productId: string }): FunctionResult {
  const product = getProductById(args.productId);

  if (!product) {
    // Try to find by name match
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(args.productId.toLowerCase())
    );

    if (matches.length > 0) {
      const p = matches[0];
      return {
        result: `${p.name}: ${p.stock_quantity} units available (${p.stock_status.replace('_', ' ')})`,
        products: [p],
      };
    }

    return {
      result: `Product not found.`,
    };
  }

  return {
    result: `${product.name}: ${product.stock_quantity} units available (${product.stock_status.replace('_', ' ')})`,
    products: [product],
  };
}

function handleClearCart(): FunctionResult {
  return {
    result: 'Cart has been cleared.',
    actions: [{ type: 'CLEAR_CART' }],
  };
}

// Process a function call and return the result
function processFunctionCall(
  name: string,
  args: Record<string, unknown>,
  cartContext?: CartSummary
): FunctionResult {
  switch (name) {
    case 'search_products':
      return handleSearchProducts(args as { query: string });
    case 'add_to_cart':
      return handleAddToCart(args as { productId: string; quantity?: number }, cartContext);
    case 'remove_from_cart':
      return handleRemoveFromCart(args as { productId: string }, cartContext);
    case 'update_cart_quantity':
      return handleUpdateCartQuantity(args as { productId: string; quantity: number }, cartContext);
    case 'get_cart_contents':
      return handleGetCartContents(cartContext);
    case 'check_product_availability':
      return handleCheckAvailability(args as { productId: string });
    case 'clear_cart':
      return handleClearCart();
    default:
      return { result: 'Unknown function' };
  }
}

// Main function to process chat with Anthropic
export async function processAnthropicChat(
  message: string,
  conversationHistory: ConversationMessage[] = [],
  cartContext?: CartSummary
): Promise<EnhancedChatResponse> {
  // Build system prompt with cart context
  let systemPrompt = SYSTEM_PROMPT;
  if (cartContext && cartContext.items.length > 0) {
    const cartInfo = cartContext.items.map(item =>
      `${item.quantity}x ${item.productName}`
    ).join(', ');
    systemPrompt += `\n\nCurrent cart: ${cartInfo}. Total: ${cartContext.total.toFixed(2)} (${cartContext.itemCount} items)`;
  }

  // Build messages array
  const messages: Anthropic.MessageParam[] = [];

  // Add conversation history (limited to recent messages)
  const recentHistory = conversationHistory.slice(-20);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    });
  }

  // Add current user message
  messages.push({ role: 'user', content: message });

  // Collect products and actions from function calls
  let allProducts: Product[] = [];
  let allActions: CartAction[] = [];

  try {
    const anthropic = getAnthropicClient();

    // Initial API call
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
      tools,
    });

    // Handle function calling loop (max 5 iterations to prevent infinite loops)
    let iterations = 0;
    const maxIterations = 5;

    while (response.stop_reason === 'tool_use' && iterations < maxIterations) {
      iterations++;

      // Find tool use blocks in the response
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
      );

      // Process each tool call and build tool results
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const toolUse of toolUseBlocks) {
        const result = processFunctionCall(
          toolUse.name,
          toolUse.input as Record<string, unknown>,
          cartContext
        );

        // Collect products and actions
        if (result.products) {
          allProducts = [...allProducts, ...result.products];
        }
        if (result.actions) {
          allActions = [...allActions, ...result.actions];
        }

        toolResults.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: result.result,
        });
      }

      // Add assistant response and tool results to messages
      messages.push({
        role: 'assistant',
        content: response.content,
      });
      messages.push({
        role: 'user',
        content: toolResults,
      });

      // Get next response
      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
        tools,
      });
    }

    // Extract text from the final response
    const textBlocks = response.content.filter(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    );
    const responseText = textBlocks.map(block => block.text).join('\n');

    // Remove duplicate products
    const uniqueProducts = allProducts.filter((p, i, arr) =>
      arr.findIndex(x => x.id === p.id) === i
    );

    return {
      message: responseText || "I'm here to help! What would you like to know about our products?",
      products: uniqueProducts.length > 0 ? uniqueProducts : undefined,
      actions: allActions.length > 0 ? allActions : undefined,
    };
  } catch (error) {
    console.error('Anthropic API error:', error);

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return {
          message: "I'm a bit busy right now. Please try again in a moment.",
        };
      }
      if (error.status === 401) {
        return {
          message: "I'm having trouble connecting. Please contact support.",
        };
      }
    }

    return {
      message: "I apologize, but I'm having trouble processing your request. Please try again.",
    };
  }
}
