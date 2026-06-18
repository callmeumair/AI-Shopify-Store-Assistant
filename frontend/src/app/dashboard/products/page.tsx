'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, MoreHorizontal, PackageOpen } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 'PROD-001', name: 'Air Max Runner', status: 'active', inventory: 2, price: '$120.00', category: 'Shoes' },
  { id: 'PROD-002', name: 'Leather Wallet', status: 'active', inventory: 1, price: '$45.00', category: 'Accessories' },
  { id: 'PROD-003', name: 'Cotton T-Shirt (M)', status: 'draft', inventory: 4, price: '$25.00', category: 'Apparel' },
  { id: 'PROD-004', name: 'Silk Tie', status: 'archived', inventory: 0, price: '$45.00', category: 'Accessories' },
  { id: 'PROD-005', name: 'Denim Jacket', status: 'active', inventory: 15, price: '$85.00', category: 'Apparel' },
  { id: 'PROD-006', name: 'Canvas Backpack', status: 'active', inventory: 8, price: '$65.00', category: 'Accessories' },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = DUMMY_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost">
            <Filter size={16} /> Filter
          </button>
          <button className="btn-primary">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-label text-[var(--text-muted)] bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Inventory</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[var(--surface-2)] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{product.name}</span>
                        <span className="text-xs font-mono text-[var(--text-muted)]">{product.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.status === 'active' && <span className="badge badge-green">Active</span>}
                      {product.status === 'draft' && <span className="badge badge-amber">Draft</span>}
                      {product.status === 'archived' && <span className="badge badge-gray">Archived</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-mono ${product.inventory < 3 ? 'text-[var(--red)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                        {product.inventory} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{product.category}</td>
                    <td className="px-6 py-4 font-mono text-[var(--text-secondary)]">{product.price}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-[var(--text-muted)] hover:text-white rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center border border-[var(--border-subtle)] mb-4">
              <PackageOpen className="text-[var(--text-muted)]" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No products found</h3>
            <p className="text-[var(--text-secondary)] max-w-sm">
              {searchTerm ? `No products match your search "${searchTerm}".` : 'Get started by creating your first product or sync with Shopify.'}
            </p>
            {!searchTerm && (
              <button className="btn-primary mt-6">
                <Plus size={16} /> Add Product
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
