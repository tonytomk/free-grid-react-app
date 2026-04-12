import { useState } from 'react';
import { Grid, type Column } from 'free-grid-react';
import 'free-grid-react/free-grid.css';
import { FREE_GRID_REACT_VERSION } from './version';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

interface ProductSnapshot {
  id: number;
  product: string;
  category: string;
  stock: number;
  price: number;
  health: string;
}

interface ActivityRow {
  id: number;
  lane: string;
  owner: string;
  priority: string;
  status: string;
}

interface SelectionRow {
  id: number;
  task: string;
  owner: string;
  progress: string;
  updated: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 299.99, stock: 45, description: 'High-fidelity audio with active noise cancellation.' },
  { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 449.5, stock: 12, description: 'Adjustable lumbar support and breathable mesh.' },
  { id: 3, name: 'Smart Home Hub', category: 'Electronics', price: 129, stock: 89, description: 'Centralize your smart devices with voice control.' },
  { id: 4, name: 'Mechanical Keyboard', category: 'Accessories', price: 159.99, stock: 23, description: 'Tactile feedback and RGB backlighting.' },
  { id: 5, name: '4K Ultra HD Monitor', category: 'Electronics', price: 599, stock: 15, description: 'Vibrant colors and razor-sharp clarity.' },
  { id: 6, name: 'USB-C Docking Station', category: 'Accessories', price: 89, stock: 56, description: 'Expand your connectivity with multiple ports.' },
  { id: 7, name: 'Leather Travel Backpack', category: 'Accessories', price: 199, stock: 34, description: 'Durable and stylish for your daily commute.' },
  { id: 8, name: 'Smart Fitness Tracker', category: 'Wearables', price: 79.5, stock: 67, description: 'Track your steps, heart rate, and sleep.' },
  { id: 9, name: 'Brewed Coffee Maker', category: 'Kitchen', price: 49.99, stock: 110, description: 'Start your morning with a perfect cup of coffee.' },
];

const configuredSnapshots: ProductSnapshot[] = mockProducts.map((product) => ({
  id: product.id,
  product: product.name,
  category: product.category,
  stock: product.stock,
  price: product.price,
  health: product.stock >= 60 ? 'Strong' : product.stock >= 25 ? 'Steady' : 'Low',
}));

const activityRows: ActivityRow[] = [
  { id: 101, lane: 'Checkout', owner: 'Mina', priority: 'High', status: 'Queued' },
  { id: 102, lane: 'Shipping', owner: 'Dev', priority: 'Medium', status: 'Packed' },
  { id: 103, lane: 'Support', owner: 'Rina', priority: 'High', status: 'Waiting' },
  { id: 104, lane: 'Inventory', owner: 'Noah', priority: 'Low', status: 'Synced' },
  { id: 105, lane: 'Billing', owner: 'Sara', priority: 'Medium', status: 'Review' },
  { id: 106, lane: 'Returns', owner: 'Omar', priority: 'Low', status: 'Open' },
];

const selectionRows: SelectionRow[] = [
  { id: 201, task: 'Homepage refresh', owner: 'Aria', progress: 'In review', updated: '2h ago' },
  { id: 202, task: 'Checkout polish', owner: 'Mason', progress: 'Ready', updated: '1h ago' },
  { id: 203, task: 'Dark mode QA', owner: 'Nina', progress: 'Blocked', updated: '35m ago' },
  { id: 204, task: 'Analytics cards', owner: 'Leo', progress: 'On track', updated: '12m ago' },
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
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  { key: 'stock', header: 'In Stock', width: 100, sortable: true },
];

const configuredColumns: Column<ProductSnapshot>[] = [
  { key: 'id', header: 'ID', width: 60, sortable: true, resizable: false },
  { key: 'product', header: 'Configured Product', flex: 2, sortable: true, minWidth: 180 },
  { key: 'category', header: 'Category', flex: 1, sortable: true },
  {
    key: 'health',
    header: 'Health',
    width: 110,
    sortable: true,
    render: (health: string) => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '78px',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor: health === 'Strong' ? '#f97316' : health === 'Steady' ? '#22c55e' : '#a855f7',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          boxShadow: '0 8px 18px -10px rgba(0, 0, 0, 0.8)',
        }}
      >
        {health}
      </span>
    ),
  },
  { key: 'stock', header: 'Stock', width: 90, sortable: true },
  {
    key: 'price',
    header: 'Price',
    width: 110,
    sortable: true,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
];

const activityColumns: Column<ActivityRow>[] = [
  {
    key: 'id',
    header: 'Ticket',
    width: 80,
    sortable: true,
    resizable: false,
    render: (value: number) => <strong style={{ color: '#0f172a' }}>{value}</strong>,
  },
  { key: 'lane', header: 'Lane', flex: 1, sortable: true },
  {
    key: 'owner',
    header: 'Owner',
    width: 100,
    sortable: true,
    render: (value: string) => (
      <span style={{ color: '#0f172a', fontWeight: 700, letterSpacing: '0.01em' }}>{value}</span>
    ),
  },
  {
    key: 'priority',
    header: 'Priority',
    width: 120,
    sortable: true,
    render: (value: string) => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '76px',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor: value === 'High' ? '#ef4444' : value === 'Medium' ? '#f59e0b' : '#38bdf8',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 800,
          boxShadow: '0 8px 18px -10px rgba(0, 0, 0, 0.45)',
        }}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    flex: 1,
    sortable: true,
    render: (value: string) => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor:
            value === 'Queued'
              ? '#f43f5e'
              : value === 'Packed'
                ? '#14b8a6'
                : value === 'Waiting'
                  ? '#8b5cf6'
                  : value === 'Synced'
                    ? '#22c55e'
                    : value === 'Review'
                      ? '#f97316'
                      : '#0f172a',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 700,
          boxShadow: '0 8px 18px -10px rgba(0, 0, 0, 0.45)',
        }}
      >
        {value}
      </span>
    ),
  },
];

const selectionColumns: Column<SelectionRow>[] = [
  { key: 'id', header: 'ID', width: 70, sortable: true, resizable: false },
  { key: 'task', header: 'Task', flex: 2, sortable: true, minWidth: 160 },
  { key: 'owner', header: 'Owner', width: 100, sortable: true },
  {
    key: 'progress',
    header: 'Progress',
    width: 120,
    sortable: true,
    render: (value: string) => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: '999px',
          backgroundColor:
            value === 'Ready'
              ? '#22c55e'
              : value === 'Blocked'
                ? '#ef4444'
                : value === 'On track'
                  ? '#3b82f6'
                  : '#a855f7',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 800,
          boxShadow: '0 8px 18px -10px rgba(0, 0, 0, 0.45)',
        }}
      >
        {value}
      </span>
    ),
  },
  { key: 'updated', header: 'Updated', width: 100, sortable: true },
];

function App() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [singleSelectedIds, setSingleSelectedIds] = useState<(string | number)[]>([]);
  const [showHeader, setShowHeader] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 24px 56px',
        background: 'radial-gradient(circle at top, #f8fafc 0%, #edf2f7 45%, #e2e8f0 100%)',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <header style={{ marginBottom: '32px' }}>
          <p style={{ margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.75rem', color: '#475569' }}>
            free-grid-react {FREE_GRID_REACT_VERSION}
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0f172a', margin: '0 0 12px 0', lineHeight: 1.05 }}>
            Free grid react demo
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '740px', margin: 0 }}>
            The latest release adds built-in themes and striped rows, plus a dedicated single-select example to show
            row selection control in action.
          </p>
        </header>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowHeader(!showHeader)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid #cbd5e1',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            {showHeader ? 'Hide Header' : 'Show Header'}
          </button>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Sort, reorder, resize, and compare the three layouts.
          </span>
        </div>

        <section
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -24px rgb(15 23 42 / 0.35)',
            overflow: 'hidden',
            marginBottom: '28px',
            borderTop: '6px solid #2563eb',
          }}
        >
          <div style={{ padding: '18px 20px 0 20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#2563eb' }}>Classic product grid</h2>
            <p style={{ margin: '4px 0 0', color: '#475569', fontSize: '0.9rem' }}>
              Sorting, selection, row expansion, and pagination are all enabled here.
            </p>
          </div>
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
            rowHeight={56}
            theme="light"
            pagination={{
              total: mockProducts.length,
              page: 1,
              pageSize: 5,
            }}
            renderChildView={(product: Product) => (
              <div style={{ padding: '16px', backgroundColor: '#f8fafc', color: '#475569' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Product Description</h4>
                <p style={{ margin: 0 }}>{product.description}</p>
              </div>
            )}
          />
        </section>

        <section
          style={{
            backgroundColor: '#09090b',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -24px rgb(0 0 0 / 0.55)',
            overflow: 'hidden',
            marginBottom: '28px',
            borderTop: '6px solid #f59e0b',
          }}
        >
          <div style={{ padding: '18px 20px 0 20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#fbbf24' }}>Dark built-in theme grid</h2>
            <p style={{ margin: '4px 0 0', color: '#f4f4f5', fontSize: '0.9rem' }}>
              This one uses the new `theme="dark"` prop from `free-grid-react@0.2.7`.
            </p>
          </div>
          <Grid
            data={configuredSnapshots}
            columns={configuredColumns}
            showHeader={true}
            selectable={false}
            allowSorting={true}
            allowReordering={true}
            allowResizing={true}
            theme="dark"
            rowHeight={56}
            pagination={{
              total: configuredSnapshots.length,
              page: 1,
              pageSize: 4,
            }}
          />
        </section>

        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -24px rgb(15 23 42 / 0.25)',
            overflow: 'hidden',
            borderTop: '6px solid #ec4899',
          }}
        >
          <div style={{ padding: '18px 20px 0 20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#db2777' }}>Striped activity grid</h2>
            <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
              A third grid with alternate row striping using the built-in striped row props.
            </p>
          </div>
          <Grid
            data={activityRows}
            columns={activityColumns}
            showHeader={true}
            selectable={false}
            allowSorting={true}
            allowReordering={true}
            allowResizing={true}
            stripedRows={true}
            stripedRowOddColor="#fff1f2"
            stripedRowEvenColor="#eef2ff"
            rowHeight={56}
            pagination={{
              total: activityRows.length,
              page: 1,
              pageSize: 6,
            }}
          />
        </section>

        <section
          style={{
            backgroundColor: '#eff6ff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -24px rgb(37 99 235 / 0.3)',
            overflow: 'hidden',
            marginTop: '28px',
            borderTop: '6px solid #3b82f6',
          }}
        >
          <div style={{ padding: '18px 20px 0 20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#1d4ed8' }}>Single-select grid</h2>
            <p style={{ margin: '4px 0 0', color: '#1e3a8a', fontSize: '0.9rem' }}>
              Only one row stays selected at a time, even though the grid still uses checkbox selection UI.
            </p>
          </div>
          <Grid
            data={selectionRows}
            columns={selectionColumns}
            showHeader={true}
            selectable={true}
            selectionMode="single"
            selectedIds={singleSelectedIds}
            onSelectionChange={setSingleSelectedIds}
            allowSorting={true}
            allowReordering={true}
            allowResizing={true}
            theme="blue"
            rowHeight={56}
            pagination={{
              total: selectionRows.length,
              page: 1,
              pageSize: 4,
            }}
          />
        </section>

        <section
          style={{
            backgroundColor: '#f0fdf4',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -24px rgb(34 197 94 / 0.3)',
            overflow: 'hidden',
            marginTop: '28px',
            marginBottom: '28px',
            borderTop: '6px solid #22c55e',
          }}
        >
          <div style={{ padding: '18px 20px 0 20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#166534' }}>Filterable product grid</h2>
            <p style={{ margin: '4px 0 0', color: '#15803d', fontSize: '0.9rem' }}>
              New in 0.3.0: Built-in filtering capabilities with multiple column filter support.
            </p>
          </div>
          <Grid
            data={mockProducts}
            columns={columns}
            showHeader={true}
            selectable={true}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            allowSorting={true}
            allowReordering={true}
            allowResizing={true}
            allowFiltering={true}
            rowHeight={56}
            theme="light"
            pagination={{
              total: mockProducts.length,
              page: 1,
              pageSize: 5,
            }}
          />
        </section>

        <footer
          style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(148, 163, 184, 0.25)',
            color: '#64748b',
            fontSize: '0.95rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span>
            Copyright ©{' '}
            <a
              href="https://tonytomk.github.io"
              target="_blank"
              rel="noreferrer"
              style={{
                color: '#f59e0b',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Tony Tom K
            </a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
