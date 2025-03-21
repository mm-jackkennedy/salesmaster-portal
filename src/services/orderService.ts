
import { getUseApi, getApiBaseUrl } from '../config/initialize-config';

export interface Order {
  id: string;
  customer: string;
  date: Date;
  items: number;
  total: number;
  status: "Completed" | "Processing" | "Cancelled";
  paymentMethod: string;
}

// Mock data for offline/development use
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Alex Johnson",
    date: new Date("2023-08-15T14:24:00"),
    items: 3,
    total: 149.99,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Sarah Williams",
    date: new Date("2023-08-15T12:54:00"),
    items: 2,
    total: 89.95,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: new Date("2023-08-15T10:15:00"),
    items: 5,
    total: 249.50,
    status: "Processing",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Emma Davis",
    date: new Date("2023-08-14T16:42:00"),
    items: 1,
    total: 59.99,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "ORD-005",
    customer: "James Wilson",
    date: new Date("2023-08-14T09:30:00"),
    items: 4,
    total: 129.99,
    status: "Cancelled",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-006",
    customer: "Olivia Garcia",
    date: new Date("2023-08-13T15:20:00"),
    items: 2,
    total: 79.98,
    status: "Completed",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-007",
    customer: "William Martinez",
    date: new Date("2023-08-13T11:45:00"),
    items: 3,
    total: 119.97,
    status: "Processing",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-008",
    customer: "Sophia Rodriguez",
    date: new Date("2023-08-12T14:10:00"),
    items: 1,
    total: 49.99,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
];

// Parse dates from API responses
const parseDates = (orders: any[]): Order[] => {
  return orders.map(order => ({
    ...order,
    date: new Date(order.date)
  }));
};

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockOrders]), 500);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/orders`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return parseDates(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Fallback to mock data if API fails
    return mockOrders;
  }
};

// Get an order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = mockOrders.find(o => o.id === id) || null;
        resolve(order);
      }, 300);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/orders/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return {
      ...data,
      date: new Date(data.date)
    };
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    // Fallback to mock data if API fails
    return mockOrders.find(o => o.id === id) || null;
  }
};

// Add additional order-related methods as needed (create, update, delete)
