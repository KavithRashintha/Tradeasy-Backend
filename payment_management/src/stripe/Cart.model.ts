interface CartItem{
    name: string;
    price: number;
    quantity: number;
    desccription: string;
    _id: string;
    __v: number;
}

export type Cart = CartItem[];