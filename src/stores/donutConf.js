import { defineStore } from "pinia";

export const useDonutStore = defineStore({
    id: "donut",
    state: () => ({
        glazeColor: "#000",
        toppings: '',
        sprinkles: '',
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
        setSprinkles(sprinkles) {
            this.sprinkles = sprinkles;
        },
        setLogoShape(logoShape) {
            this.logoShape = logoShape;
        },
        setExtraWishes(extraWishes) {
            this.extraWishes = extraWishes;
        }
    }
});