// CRM.com API Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  brand?: string;
  category?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  stock_quantity: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  requires_prescription?: boolean;
  dosage?: string;
  active_ingredients?: string[];
  image?: string;
  rating?: number;
  reviews_count?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface StockInfo {
  product_id: string;
  sku: string;
  name: string;
  quantity_available: number;
  quantity_reserved: number;
  reorder_level: number;
  last_updated: string;
}

export interface RewardAccount {
  id: string;
  contact_id: string;
  balance: number;
  tier: {
    id: string;
    name: string;
    color: string;
  };
  lifetime_value: number;
}

export interface CRMApiResponse<T> {
  content: T[];
  paging?: {
    page: number;
    size: number;
    total: number;
  };
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    products?: Product[];
    stockInfo?: StockInfo[];
    actions?: CartAction[];
  };
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  products?: Product[];
  stockInfo?: StockInfo[];
}

// Cart Action Types for OpenAI Function Calling
export type CartActionType =
  | 'ADD_TO_CART'
  | 'REMOVE_FROM_CART'
  | 'UPDATE_QUANTITY'
  | 'CLEAR_CART'
  | 'SHOW_CART';

export interface CartAction {
  type: CartActionType;
  productId?: string;
  productName?: string;
  quantity?: number;
}

// Cart summary sent to API for context
export interface CartSummary {
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  itemCount: number;
}

// Simplified message for conversation history
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Enhanced request with history and cart context
export interface EnhancedChatRequest {
  message: string;
  conversationHistory?: ConversationMessage[];
  cartContext?: CartSummary;
}

// Enhanced response with actions
export interface EnhancedChatResponse {
  message: string;
  products?: Product[];
  actions?: CartAction[];
}
