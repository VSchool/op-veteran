import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Client from 'shopify-buy/index.unoptimized.umd'
import products from './data/shopifyProducts'

const client = Client.buildClient({
  domain: 'o-p-veteran.myshopify.com',
  storefrontAccessToken: '76c1fba5d995f6b7dbb1eb1c1c3c5745',
})

// Async thunk to create a new Shopify cart
export const createCart = createAsyncThunk(
  'cart/createCart',
  async (data, { dispatch }) => {
    const checkout = await client.checkout.create({
      shippingAddress: {
        address1: data.street,
        address2: data.apt,
        city: data.city,
        company: data.organization,
        country: 'United States',
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        province: data.state,
        zip: data.zip,
      },
      email: data.repEmail,
    })

    dispatch(setVendorCart({ cartId: checkout.id, cartUrl: checkout.webUrl }))

    return checkout
  }
)

// Async thunk to fetch an existing Shopify cart
export const getShopifyCart = createAsyncThunk(
  'cart/getShopifyCart',
  async (cartId) => {
    const checkout = await client.checkout.fetch(cartId)
    return checkout.lineItems.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      id: item.id,
    }))
  }
)

// Async thunk to add an item to the Shopify cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ item, boothId, electricity }, { getState }) => {
    const currentVendor = getState().vendor.currentVendor
    const variantItems = [
      {
        variantId: products[item],
        quantity: 1,
        customAttributes: [{ key: 'boothID', value: boothId }],
      },
    ]

    if (electricity) {
      variantItems.push({
        variantId: products[electricity],
        quantity: 1,
        customAttributes: [{ key: 'boothID', value: boothId }],
      })
    }

    const checkout = await client.checkout.addLineItems(
      currentVendor.cartId,
      variantItems
    )
    return checkout.lineItems
  }
)

// Async thunk to remove all items from the Shopify cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState }) => {
    const currentVendor = getState().vendor.currentVendor
    const lineItemsToRemove = getState().cart.cartItems.map((item) => item.id)

    const checkout = await client.checkout.removeLineItems(
      currentVendor.cartId,
      lineItemsToRemove
    )
    return checkout.lineItems
  }
)

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    localCart: {
      primaryBoothId: null,
      secondaryBoothId: null,
    },
    loading: false,
  },
  reducers: {
    setLocalCart(state, action) {
      state.localCart = action.payload
      localStorage.setItem('localCart', JSON.stringify(action.payload))
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        // Handle cart creation success if needed
      })
      .addCase(getShopifyCart.fulfilled, (state, action) => {
        state.cartItems = action.payload
        state.loading = false
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartItems = []
      })
  },
})

export const { setLocalCart, setLoading } = cartSlice.actions

export default cartSlice.reducer
