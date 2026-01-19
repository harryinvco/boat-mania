import { Product, StockInfo, CRMApiResponse, RewardAccount } from '@/types';

/**
 * CRM.com API Client for Pharmacy Stock Management
 *
 * This client integrates with CRM.com's Self-Service API
 * Documentation: https://crmcom.stoplight.io/docs/stoplight-api-doc/
 */
class CRMComApiClient {
  private apiKey: string;
  private baseUrl: string;
  private orgId?: string;

  constructor() {
    this.apiKey = process.env.CRMCOM_API_KEY || '';
    this.baseUrl = process.env.CRMCOM_API_URL || 'https://sandbox.crm.com/backoffice/v2';
    this.orgId = process.env.CRMCOM_ORG_ID;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'api_key': this.apiKey,
      ...(this.orgId && { 'org_id': this.orgId }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `CRM.com API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Search products by name, SKU, or category
   */
  async searchProducts(query: string, filters?: {
    category?: string;
    inStockOnly?: boolean;
    limit?: number;
  }): Promise<Product[]> {
    const params = new URLSearchParams({
      search_value: query,
      ...(filters?.category && { category: filters.category }),
      ...(filters?.inStockOnly && { in_stock: 'true' }),
      size: String(filters?.limit || 10),
    });

    try {
      const response = await this.request<CRMApiResponse<Product>>(
        `/products?${params}`
      );
      return response.content || [];
    } catch (error) {
      console.error('Error searching products:', error);
      // Return demo data in case of API error (for demo purposes)
      return this.getDemoProducts(query);
    }
  }

  /**
   * Get product by ID
   */
  async getProduct(productId: string): Promise<Product | null> {
    try {
      return await this.request<Product>(`/products/${productId}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  /**
   * Get stock information for products
   */
  async getStockInfo(productIds?: string[]): Promise<StockInfo[]> {
    try {
      const params = productIds
        ? `?product_ids=${productIds.join(',')}`
        : '';

      const response = await this.request<CRMApiResponse<StockInfo>>(
        `/inventory/stock${params}`
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching stock info:', error);
      return this.getDemoStockInfo();
    }
  }

  /**
   * Check stock availability for a specific product
   */
  async checkStockAvailability(sku: string): Promise<{
    available: boolean;
    quantity: number;
    product?: Product;
  }> {
    try {
      const products = await this.searchProducts(sku);
      const product = products.find(p => p.sku.toLowerCase() === sku.toLowerCase());

      if (!product) {
        return { available: false, quantity: 0 };
      }

      return {
        available: product.stock_quantity > 0,
        quantity: product.stock_quantity,
        product,
      };
    } catch (error) {
      console.error('Error checking stock availability:', error);
      return { available: false, quantity: 0 };
    }
  }

  /**
   * Get customer reward account
   */
  async getRewardAccount(accountId: string): Promise<RewardAccount | null> {
    try {
      return await this.request<RewardAccount>(`/accounts/${accountId}/rewards`);
    } catch (error) {
      console.error('Error fetching reward account:', error);
      return null;
    }
  }

  /**
   * Get low stock products (for alerts)
   */
  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    try {
      const response = await this.request<CRMApiResponse<Product>>(
        `/products?stock_quantity_lte=${threshold}&sort=stock_quantity:asc`
      );
      return response.content || [];
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      return [];
    }
  }

  /**
   * Get products by category (e.g., "painkillers", "antibiotics", "vitamins")
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.searchProducts('', { category });
  }

  // Demo data for testing without API connection
  private getDemoProducts(query: string): Product[] {
    const demoProducts: Product[] = [
      {
        id: 'prod_001',
        sku: 'PARA500',
        name: 'Paracetamol 500mg',
        description: 'Pain relief and fever reducer',
        brand: 'PharmaCare',
        category: 'Painkillers',
        price: 5.99,
        currency: 'EUR',
        stock_quantity: 150,
        stock_status: 'in_stock',
        requires_prescription: false,
        dosage: '500mg',
        active_ingredients: ['Paracetamol'],
      },
      {
        id: 'prod_002',
        sku: 'IBUP400',
        name: 'Ibuprofen 400mg',
        description: 'Anti-inflammatory pain relief',
        brand: 'PharmaCare',
        category: 'Painkillers',
        price: 7.50,
        currency: 'EUR',
        stock_quantity: 85,
        stock_status: 'in_stock',
        requires_prescription: false,
        dosage: '400mg',
        active_ingredients: ['Ibuprofen'],
      },
      {
        id: 'prod_003',
        sku: 'AMOX500',
        name: 'Amoxicillin 500mg',
        description: 'Antibiotic for bacterial infections',
        brand: 'MediPharm',
        category: 'Antibiotics',
        price: 12.99,
        currency: 'EUR',
        stock_quantity: 45,
        stock_status: 'in_stock',
        requires_prescription: true,
        dosage: '500mg',
        active_ingredients: ['Amoxicillin'],
      },
      {
        id: 'prod_004',
        sku: 'VITC1000',
        name: 'Vitamin C 1000mg',
        description: 'Immune system support',
        brand: 'VitaHealth',
        category: 'Vitamins',
        price: 9.99,
        currency: 'EUR',
        stock_quantity: 200,
        stock_status: 'in_stock',
        requires_prescription: false,
        dosage: '1000mg',
        active_ingredients: ['Ascorbic Acid'],
      },
      {
        id: 'prod_005',
        sku: 'OMEP20',
        name: 'Omeprazole 20mg',
        description: 'Acid reflux and heartburn relief',
        brand: 'GastroMed',
        category: 'Digestive',
        price: 14.50,
        currency: 'EUR',
        stock_quantity: 8,
        stock_status: 'low_stock',
        requires_prescription: true,
        dosage: '20mg',
        active_ingredients: ['Omeprazole'],
      },
      {
        id: 'prod_006',
        sku: 'LORAT10',
        name: 'Loratadine 10mg',
        description: 'Antihistamine for allergies',
        brand: 'AllerClear',
        category: 'Allergy',
        price: 8.25,
        currency: 'EUR',
        stock_quantity: 0,
        stock_status: 'out_of_stock',
        requires_prescription: false,
        dosage: '10mg',
        active_ingredients: ['Loratadine'],
      },
    ];

    const lowerQuery = query.toLowerCase();
    return demoProducts.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.sku.toLowerCase().includes(lowerQuery) ||
        p.category?.toLowerCase().includes(lowerQuery) ||
        p.active_ingredients?.some(i => i.toLowerCase().includes(lowerQuery))
    );
  }

  private getDemoStockInfo(): StockInfo[] {
    return [
      {
        product_id: 'prod_001',
        sku: 'PARA500',
        name: 'Paracetamol 500mg',
        quantity_available: 150,
        quantity_reserved: 5,
        reorder_level: 50,
        last_updated: new Date().toISOString(),
      },
      {
        product_id: 'prod_005',
        sku: 'OMEP20',
        name: 'Omeprazole 20mg',
        quantity_available: 8,
        quantity_reserved: 2,
        reorder_level: 20,
        last_updated: new Date().toISOString(),
      },
    ];
  }
}

// Export singleton instance
export const crmApi = new CRMComApiClient();
