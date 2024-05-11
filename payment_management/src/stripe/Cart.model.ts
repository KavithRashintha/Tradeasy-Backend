interface CartItem{
    name: string;
    price: number;
    quantity: number;
    description?: string;
}

export type Cart = CartItem[];