'use client';

import { useState } from 'react';
import ChatView from '@/components/chat/ChatView';
import CatalogSheet from '@/components/catalog/CatalogSheet';
import CartSheet from '@/components/catalog/CartSheet';

export default function Home() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <main className="h-screen bg-white">
      {/* Main Chat View */}
      <ChatView
        onOpenCatalog={() => setCatalogOpen(true)}
      />

      {/* Catalog Sheet (opens from bottom) */}
      <CatalogSheet
        isOpen={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onOpenCart={() => {
          setCatalogOpen(false);
          setCartOpen(true);
        }}
      />

      {/* Cart Sheet */}
      <CartSheet
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </main>
  );
}
