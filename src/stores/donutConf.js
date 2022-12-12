import { defineStore } from "pinia";

export const useDonutStore = defineStore({
    id: "donut",
    state: () => ({
        glazeColor: "#000",
        toppings: '',
        sprinkles: '',
        logoShape: '',
        extraWishes: '',
        filling: ''
    }),
    getters: {
        getGlazeColor() {
            return this.glazeColor;
        },
        getTopping() {
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
        },
        getFilling() {
            return this.filling;
        }
    },
    actions: {
        setGlazeColor(color) {
            this.glazeColor = color;
        },
        setTopping(toppings) {
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
        },
        setFilling(filling) {
            this.filling = filling;
        }
    }
});