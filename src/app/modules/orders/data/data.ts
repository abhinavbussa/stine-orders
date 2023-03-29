export interface Order {
  orderId: string;
  orderTotal: number;
  customerName: string;
  customerId?: number;
  lines?: {
    productId: number,
    quantity: number
  }[]
}

export interface OrderLine {
  productId: number,
  quantity: number
}

export const ORDERS: Order[] = [
  { orderId: 'd0d6f6fd-b14c-47d4-9d2e-ee69fa579aa1', customerId: 1, customerName: 'Hydrogen', orderTotal: 20, lines: [{ productId: 1, quantity: 2 }] },
  { orderId: '08f89e26-ce3b-11ed-afa1-0242ac120002', customerId: 2, customerName: 'Helium', orderTotal: 230, lines: [{ productId: 2, quantity: 4 }, { productId: 3, quantity: 5 }] },
  { orderId: '0f5a6056-ce3b-11ed-afa1-0242ac120002', customerId: 3, customerName: 'Lithium', orderTotal: 40, lines: [{ productId: 4, quantity: 1 }] },
  { orderId: '12d3c218-ce3b-11ed-afa1-0242ac120002', customerId: 4, customerName: 'Beryllium', orderTotal: 60, lines: [{ productId: 2, quantity: 1 }, { productId: 4, quantity: 1 }] },
  { orderId: '16e9f278-ce3b-11ed-afa1-0242ac120002', customerId: 5, customerName: 'Boron', orderTotal: 130, lines: [{ productId: 3, quantity: 3 }, { productId: 4, quantity: 1 }] },
  { orderId: '1e01e002-ce3b-11ed-afa1-0242ac120002', customerId: 1, customerName: 'Hydrogen', orderTotal: 100, lines: [{ productId: 3, quantity: 2 }, { productId: 4, quantity: 1 }] },
  { orderId: '1f2344f8-ce3b-11ed-afa1-0242ac120002', customerId: 2, customerName: 'Helium', orderTotal: 170, lines: [{ productId: 2, quantity: 2 }, { productId: 3, quantity: 3 }, { productId: 4, quantity: 1 }] },
  { orderId: '22faf486-ce3b-11ed-afa1-0242ac120002', customerId: 3, customerName: 'Lithium', orderTotal: 300, lines: [{ productId: 1, quantity: 6 }, { productId: 4, quantity: 6 }] },
  { orderId: '26d97d2a-ce3b-11ed-afa1-0242ac120002', customerId: 4, customerName: 'Beryllium', orderTotal: 100, lines: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }, { productId: 3, quantity: 1 }, { productId: 4, quantity: 1 }] },
  { orderId: '2a3d03f6-ce3b-11ed-afa1-0242ac120002', customerId: 5, customerName: 'Boron', orderTotal: 100, lines: [{ productId: 3, quantity: 2 }, { productId: 4, quantity: 1 }] },
  { orderId: '2ef3cd6c-ce3b-11ed-afa1-0242ac120002', customerId: 1, customerName: 'Hydrogen', orderTotal: 220, lines: [{ productId: 2, quantity: 2 }, { productId: 3, quantity: 6 }] },
  { orderId: '323e1130-ce3b-11ed-afa1-0242ac120002', customerId: 2, customerName: 'Helium', orderTotal: 90, lines: [{ productId: 1, quantity: 5 }, { productId: 2, quantity: 2 }] },
  { orderId: '38d33c5a-ce3b-11ed-afa1-0242ac120002', customerId: 3, customerName: 'Lithium', orderTotal: 100, lines: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }, { productId: 3, quantity: 1 }, { productId: 4, quantity: 1 }] },
  { orderId: '3a33414e-ce3b-11ed-afa1-0242ac120002', customerId: 4, customerName: 'Beryllium', orderTotal: 100, lines: [{ productId: 3, quantity: 2 }, { productId: 4, quantity: 1 }] },
  { orderId: '3deec9b6-ce3b-11ed-afa1-0242ac120002', customerId: 5, customerName: 'Boron', orderTotal: 140, lines: [{ productId: 1, quantity: 6 }, { productId: 4, quantity: 2 }] },
  { orderId: '410c407e-ce3b-11ed-afa1-0242ac120002', customerId: 1, customerName: 'Hydrogen', orderTotal: 90, lines: [{ productId: 1, quantity: 5 }, { productId: 2, quantity: 2 }]  },
  { orderId: '44a77136-ce3b-11ed-afa1-0242ac120002', customerId: 2, customerName: 'Helium', orderTotal: 240, lines: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 2 }, { productId: 3, quantity: 6 } ]  },
  { orderId: '47dd17c0-ce3b-11ed-afa1-0242ac120002', customerId: 3, customerName: 'Lithium  ', orderTotal: 220, lines: [{ productId: 2, quantity: 2 }, { productId: 3, quantity: 6 }] },
  { orderId: '4aea4cb2-ce3b-11ed-afa1-0242ac120002', customerId: 4, customerName: 'Beryllium', orderTotal: 110, lines: [{ productId: 2, quantity: 2 }, { productId: 3, quantity: 2 }, { productId: 4, quantity: 1 }] },
  { orderId: '4de5df30-ce3b-11ed-afa1-0242ac120002', customerId: 5, customerName: 'Boron', orderTotal: 120, lines: [{ productId: 2, quantity: 3 }, { productId: 3, quantity: 2 }]  },
];

export const PRODUCTS = [
  { productId: 1, name: 'Mouse', price: 10 },
  { productId: 2, name: 'Keyboard', price: 20 },
  { productId: 3, name: 'Desktop', price: 30 },
  { productId: 4, name: 'Adoptor', price: 40 },
]

export const CUSTOMERS = [
  { customerId: 1, name: 'Hydrogen' },
  { customerId: 2, name: 'Helium' },
  { customerId: 3, name: 'Lithium' },
  { customerId: 4, name: 'Beryllium' },
  { customerId: 5, name: 'Boron' },
]