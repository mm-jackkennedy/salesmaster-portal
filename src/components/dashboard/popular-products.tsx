
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
}

const mockProducts: Product[] = [
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

export function PopularProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{product.sold} sold</p>
                <p className="text-sm text-muted-foreground">${product.revenue.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
