
import React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

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

const ProductsPage = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="Products" 
        description="Manage your product inventory"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-[200px] lg:w-[280px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </PageHeader>

      <Card className="animate-in">
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            A list of all products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "In Stock"
                          ? "default"
                          : product.status === "Low Stock"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ProductsPage;
