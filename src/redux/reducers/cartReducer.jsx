import { ActionTypes } from "../constants/action-types";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_TO_CART:
            const existingItem = state.items.find(item => item.id === payload.id);
            let updatedItems;
            
            if (existingItem) {
                updatedItems = state.items.map(item =>
                    item.id === payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [...state.items, { ...payload, quantity: 1 }];
            }
            
            return {
                ...state,
                items: updatedItems,
                totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            };
            
        case ActionTypes.REMOVE_FROM_CART:
            const filteredItems = state.items.filter(item => item.id !== payload);
            return {
                ...state,
                items: filteredItems,
                totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            };
            
        case ActionTypes.ADJUST_QUANTITY:
            const adjustedItems = state.items.map(item =>
                item.id === payload.id
                    ? { ...item, quantity: payload.quantity }
                    : item
            ).filter(item => item.quantity > 0);
            
            return {
                ...state,
                items: adjustedItems,
                totalItems: adjustedItems.reduce((sum, item) => sum + item.quantity, 0),
                totalPrice: adjustedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            };
            
        case ActionTypes.CLEAR_CART:
            return initialState;
            
        default:
            return state;
    }
};

