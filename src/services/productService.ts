
import { getUseApi, getApiBaseUrl } from '../config/initialize-config';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

// Mock data for offline/development use
const mockProducts: Product[] = [
  {
    id: "PRD001",
    name: "Premium Coffee Blend",
    category: "Beverages",
    price: 9.99,
    stock: 42,
    status: "In Stock",
  },
  {
    id: "PRD002",
    name: "Artisan Sandwich",
    category: "Food",
    price: 9.99,
    stock: 38,
    status: "In Stock",
  },
  {
    id: "PRD003",
    name: "Organic Smoothie",
    category: "Beverages",
    price: 8.99,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "PRD004",
    name: "Gourmet Pastry",
    category: "Bakery",
    price: 7.99,
    stock: 24,
    status: "In Stock",
  },
  {
    id: "PRD005",
    name: "Cold Brew Coffee",
    category: "Beverages",
    price: 6.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD006",
    name: "Fruit Salad",
    category: "Food",
    price: 5.99,
    stock: 15,
    status: "In Stock",
  },
  {
    id: "PRD007",
    name: "Fresh Bagel",
    category: "Bakery",
    price: 4.99,
    stock: 3,
    status: "Low Stock",
  },
  {
    id: "PRD008",
    name: "Vegan Wrap",
    category: "Food",
    price: 8.49,
    stock: 12,
    status: "In Stock",
  },
];

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProducts), 500); // Simulate network delay
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data if API fails
    return mockProducts;
  }
};

// Get a product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === id) || null;
        resolve(product);
      }, 300);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/products/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    // Fallback to mock data if API fails
    return mockProducts.find(p => p.id === id) || null;
  }
};

// Add additional product-related methods as needed (create, update, delete)
