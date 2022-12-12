import { defineStore } from "pinia";

export const useDonutStore = defineStore({
    id: "donut",
    state: () => ({
        glazeColor: "#ffffff",
        toppings: 'none',
        sprinkles: 'none',
        logoShape: 'rectangle',
        comment: '',
        filling: 'none',
        logo: '',
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
        getComment() {
            return this.comment;
        },
        getFilling() {
            return this.filling;
        },
        getLogo() {
            return this.logo;
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
        setComment(comment) {
            this.comment = comment;
        },
        setFilling(filling) {
            this.filling = filling;
        },
        setLogo(logo) {
            this.logo = logo;
        }
    }
});