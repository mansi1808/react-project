import cartReducer, { addToCart, removeFromCart, clearCart } from './cartSlice';

describe('cart reducer', () => {
  it('should handle initial state', () => {
    expect(cartReducer(undefined as any, { type: 'unknown' })).toEqual({ items: [] });
  });

  it('should add item to cart', () => {
    const initial = { items: [] };
    const next = cartReducer(initial as any, addToCart({ id: 1, title: 'A', price: 10, quantity: 1 } as any));
    expect(next.items.length).toBe(1);
    expect(next.items[0].quantity).toBe(1);
  });

  it('should remove item', () => {
    const initial = { items: [{ id: 1, title: 'A', price: 10, quantity: 1 }] };
    const next = cartReducer(initial as any, removeFromCart(1));
    expect(next.items.length).toBe(0);
  });
});
