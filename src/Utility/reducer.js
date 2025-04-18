import React, { useReducer } from "react";
import { Type } from "./action.type";

// Initial global state
export const initialState = {
  basket: [],
  user: null,
};

// Reducer function
export const reducer = (state, action) => {
  switch (action.type) {

    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find((item) => item.id === action.item.id);
      console.log("Existing item:", existingItem);

      if (!existingItem) {
        // If item not in basket, add it with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If item exists, increment the amount
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      const newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // Decrease item quantity
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
        };
        } else {
          // Remove item entirely
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
