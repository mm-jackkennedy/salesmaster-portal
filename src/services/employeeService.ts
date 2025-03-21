
import { getUseApi, getApiBaseUrl } from '../config/initialize-config';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "On Leave" | "Inactive";
  joinDate: Date;
}

// Mock data for offline/development use
const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Store Manager",
    status: "Active",
    joinDate: new Date("2022-01-15"),
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Cashier",
    status: "Active",
    joinDate: new Date("2022-03-10"),
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Sales Associate",
    status: "On Leave",
    joinDate: new Date("2022-05-22"),
  },
  {
    id: "EMP004",
    name: "Lisa Brown",
    email: "lisa.brown@example.com",
    role: "Inventory Manager",
    status: "Active",
    joinDate: new Date("2022-02-08"),
  },
  {
    id: "EMP005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Cashier",
    status: "Inactive",
    joinDate: new Date("2022-04-17"),
  },
  {
    id: "EMP006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Sales Associate",
    status: "Active",
    joinDate: new Date("2022-06-30"),
  },
];

// Parse dates from API responses
const parseDates = (employees: any[]): Employee[] => {
  return employees.map(employee => ({
    ...employee,
    joinDate: new Date(employee.joinDate)
  }));
};

// Get all employees
export const getEmployees = async (): Promise<Employee[]> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockEmployees]), 500);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/employees`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return parseDates(data);
  } catch (error) {
    console.error('Error fetching employees:', error);
    // Fallback to mock data if API fails
    return mockEmployees;
  }
};

// Get an employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  if (!getUseApi()) {
    // Return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const employee = mockEmployees.find(e => e.id === id) || null;
        resolve(employee);
      }, 300);
    });
  }
  
  // Fetch from API
  try {
    const response = await fetch(`${getApiBaseUrl()}/employees/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return {
      ...data,
      joinDate: new Date(data.joinDate)
    };
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    // Fallback to mock data if API fails
    return mockEmployees.find(e => e.id === id) || null;
  }
};

// Add additional employee-related methods as needed (create, update, delete)
