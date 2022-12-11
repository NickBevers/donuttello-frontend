import { defineStore } from "pinia";

export const useDonutStore = defineStore({
    id: "donut",
    state: () => ({
        glazeColor: "#000",
        toppings: '',
        logoShape: '',
        extraWishes: '',
    }),
    getters: {
        getGlazeColor() {
            return this.glazeColor;
        },
        getToppings() {
            return this.toppings;
        },
        getSprinkles() {
            return this.sprinkles;
        },
        getLogoShape() {
            return this.logoShape;
        },
        getExtraWishes() {
            return this.extraWishes;
        }
    },
    actions: {
        setGlazeColor(color) {
            this.glazeColor = color;
        },
        setToppings(toppings) {
            this.toppings = toppings;
        },
        setLogoShape(logoShape) {
            this.logoShape = logoShape;
        },
        setExtraWishes(extraWishes) {
            this.extraWishes = extraWishes;
        }
    }
});