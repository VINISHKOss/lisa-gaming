import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types/product'

interface CartState {
  activeUserId: string | null
  guestCart: CartItem[]
  userCarts: Record<string, CartItem[]>
  setActiveUserId: (userId: string | null) => void
  getItems: () => CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

function mergeCarts(primary: CartItem[], secondary: CartItem[]): CartItem[] {
  const merged = [...primary]

  secondary.forEach((item) => {
    const existing = merged.find((entry) => entry.product.id === item.product.id)

    if (existing) {
      existing.quantity += item.quantity
      return
    }

    merged.push({ ...item })
  })

  return merged
}

function updateActiveCart(
  state: Pick<CartState, 'activeUserId' | 'guestCart' | 'userCarts'>,
  updater: (items: CartItem[]) => CartItem[],
): Pick<CartState, 'guestCart' | 'userCarts'> {
  if (state.activeUserId) {
    const current = state.userCarts[state.activeUserId] ?? []

    return {
      userCarts: {
        ...state.userCarts,
        [state.activeUserId]: updater(current),
      },
      guestCart: state.guestCart,
    }
  }

  return {
    guestCart: updater(state.guestCart),
    userCarts: state.userCarts,
  }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      activeUserId: null,
      guestCart: [],
      userCarts: {},

      setActiveUserId: (userId) => {
        set((state) => {
          if (!userId) {
            return { activeUserId: null }
          }

          const existingUserCart = state.userCarts[userId] ?? []
          const shouldMergeGuest = state.guestCart.length > 0
          const mergedCart = shouldMergeGuest
            ? mergeCarts(existingUserCart, state.guestCart)
            : existingUserCart

          return {
            activeUserId: userId,
            guestCart: shouldMergeGuest ? [] : state.guestCart,
            userCarts: {
              ...state.userCarts,
              [userId]: mergedCart,
            },
          }
        })
      },

      getItems: () => {
        const { activeUserId, guestCart, userCarts } = get()
        return activeUserId ? (userCarts[activeUserId] ?? []) : guestCart
      },

      addItem: (product) => {
        set((state) =>
          updateActiveCart(state, (items) => {
            const existing = items.find((item) => item.product.id === product.id)

            if (existing) {
              return items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              )
            }

            return [...items, { product, quantity: 1 }]
          }),
        )
      },

      removeItem: (productId) => {
        set((state) =>
          updateActiveCart(state, (items) =>
            items.filter((item) => item.product.id !== productId),
          ),
        )
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId)
          return
        }

        set((state) =>
          updateActiveCart(state, (items) =>
            items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
          ),
        )
      },

      clearCart: () => {
        set((state) => updateActiveCart(state, () => []))
      },

      getTotalItems: () =>
        get().getItems().reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().getItems().reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'lisa-gaming-cart',
      partialize: (state) => ({
        guestCart: state.guestCart,
        userCarts: state.userCarts,
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as (Partial<CartState> & { items?: CartItem[] }) | undefined
        const legacyItems = persisted?.items
        const guestCart = persisted?.guestCart ?? legacyItems ?? currentState.guestCart

        return {
          ...currentState,
          guestCart,
          userCarts: persisted?.userCarts ?? currentState.userCarts,
        }
      },
    },
  ),
)