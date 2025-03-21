
import { getUseApi, getApiBaseUrl } from '../config/initialize-config';

export interface SaleTransaction {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  amount: number;
  date: Date;
  status: "completed" | "pending" | "failed";
}

export interface PopularProduct {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
}

export interface SalesData {
  day: string;
  sales: number;
}

// Mock data for recent sales
const mockRecentSales: SaleTransaction[] = [
  {
    id: "T1",
    customer: {
      name: "Alex Johnson",
      email: "alex@example.com",
    },
    amount: 149.99,
    date: new Date("2023-08-15T14:24:00"),
    status: "completed",
  },
  {
    id: "T2",
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
    },
    amount: 89.95,
    date: new Date("2023-08-15T12:54:00"),
    status: "completed",
  },
  {
    id: "T3",
    customer: {
      name: "Michael Brown",
      email: "michael@example.com",
    },
    amount: 249.50,
    date: new Date("2023-08-15T10:15:00"),
    status: "pending",
  },
  {
    id: "T4",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
    },
    amount: 59.99,
    date: new Date("2023-08-14T16:42:00"),
    status: "completed",
  },
  {
    id: "T5",
    customer: {
      name: "James Wilson",
      email: "james@example.com",
    },
    amount: 129.99,
    date: new Date("2023-08-14T09:30:00"),
    status: "failed",
  },
];

// Mock data for popular products
const mockPopularProducts: PopularProduct[] = [
  {
    id: "P1",
    name: "Premium Coffee Blend",
    category: "Beverages",
    sold: 42,
    revenue: 419.58,
  },
  {
    id: "P2",
    name: "Artisan Sandwich",
    category: "Food",
    sold: 38,
    revenue: 379.62,
  },
  {
    id: "P3",
    name: "Organic Smoothie",
    category: "Beverages",
    sold: 27,
    revenue: 242.73,
  },
  {
    id: "P4",
    name: "Gourmet Pastry",
    category: "Bakery",
    sold: 24,
    revenue: 191.76,
  },
];

// Mock data for sales chart
const mockSalesChart: SalesData[] = [
  { day: "Mon", sales: 1200 },
  { day: "Tue", sales: 1800 },
  { day: "Wed", sales: 1400 },
  { day: "Thu", sales: 2100 },
  { day: "Fri", sales: 2400 },
  { day: "Sat", sales: 3000 },
  { day: "Sun", sales: 2300 },
];

// Parse dates from API responses
const parseSalesDates = (sales: any[]): SaleTransaction[] => {
  return sales.map(sale => ({
    ...sale,
    date: new Date(sale.date)
  }));
};

// Get recent sales
export const getRecentSales = async (): Promise<SaleTransaction[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockRecentSales]), 500);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/dashboard/recent-sales`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return parseSalesDates(data);
  } catch (error) {
    console.error('Error fetching recent sales:', error);
    // Fallback to mock data if API fails
    return mockRecentSales;
  }
};

// Get popular products
export const getPopularProducts = async (): Promise<PopularProduct[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockPopularProducts]), 500);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/dashboard/popular-products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular products:', error);
    // Fallback to mock data if API fails
    return mockPopularProducts;
  }
};

// Get sales chart data
export const getSalesChartData = async (): Promise<SalesData[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockSalesChart]), 500);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/dashboard/sales-chart`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales chart data:', error);
    // Fallback to mock data if API fails
    return mockSalesChart;
  }
};
