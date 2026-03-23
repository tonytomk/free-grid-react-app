import { useState } from 'react';
import { Grid, type Column } from 'free-grid-react';
import 'free-grid-react/free-grid.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, stock: 45, description: 'High-fidelity audio with active noise cancellation.' },
  { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 449.50, stock: 12, description: 'Adjustable lumbar support and breathable mesh.' },
  { id: 3, name: 'Smart Home Hub', category: 'Electronics', price: 129.00, stock: 89, description: 'Centralize your smart devices with voice control.' },
  { id: 4, name: 'Mechanical Keyboard', category: 'Accessories', price: 159.99, stock: 23, description: 'Tactile feedback and RGB backlighting.' },
  { id: 5, name: '4K Ultra HD Monitor', category: 'Electronics', price: 599.00, stock: 15, description: 'Vibrant colors and razor-sharp clarity.' },
  { id: 6, name: 'USB-C Docking Station', category: 'Accessories', price: 89.00, stock: 56, description: 'Expand your connectivity with multiple ports.' },
  { id: 7, name: 'Leather Travel Backpack', category: 'Accessories', price: 199.00, stock: 34, description: 'Durable and stylish for your daily commute.' },
  { id: 8, name: 'Smart Fitness Tracker', category: 'Wearables', price: 79.50, stock: 67, description: 'Track your steps, heart rate, and sleep.' },
  { id: 9, name: 'Brewed Coffee Maker', category: 'Kitchen', price: 49.99, stock: 110, description: 'Start your morning with a perfect cup of coffee.' },
];

const columns: Column<Product>[] = [
  { key: 'id', header: 'ID', width: 60, sortable: true, resizable: false },
  { key: 'name', header: 'Product Name', flex: 2, sortable: true, minWidth: 150 },
  { key: 'category', header: 'Category', flex: 1, sortable: true },
  { 
    key: 'price', 
    header: 'Price', 
    flex: 1,
    sortable: true,
    render: (price: number) => `₹${price.toFixed(2)}`
  },
  { key: 'stock', header: 'In Stock', width: 100, sortable: true },
];

function App() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [showHeader, setShowHeader] = useState(true);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1b', margin: '0 0 8px 0' }}>Data Grid Pro Demo</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Showcasing the latest features of <code>free-grid-react</code>: sorting, reordering, and resizing.
        </p>
      </header>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => setShowHeader(!showHeader)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          {showHeader ? 'Hide Header' : 'Show Header'}
        </button>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Try dragging headers to reorder or resizing columns!
        </span>
      </div>

      <section style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' }}>
        <Grid
          data={mockProducts}
          columns={columns}
          showHeader={showHeader}
          selectable={true}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          allowSorting={true}
          allowReordering={true}
          allowResizing={true}
          pagination={{
            total: mockProducts.length,
            page: 1,
            pageSize: 5
          }}
          renderChildView={(product: Product) => (
            <div style={{ padding: '16px', backgroundColor: '#f9fafb', color: '#4b5563' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Product Description</h4>
              <p style={{ margin: 0 }}>{product.description}</p>
            </div>
          )}
        />
      </section>

      <footer style={{ marginTop: '24px', color: '#888', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>{selectedIds.length} item(s) selected.</span>
        <span>Version 0.2.3</span>
      </footer>
    </div>
  );
}

export default App;
