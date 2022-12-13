import { defineStore } from "pinia";

export const useDonutStore = defineStore({
    id: "donut",
    state: () => ({
        glazeColor: "#ffebfc",
        toppings: 'none',
        sprinkles: 'none',
        logoShape: '',
        comment: '',
        filling: 'none',
        logo: '',
        donutName: '',
        companyName: '',
        email: '',
        phone: '',
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
        },
        getDonutName() {
            return this.donutName;
        },
        getCompanyName() {
            return this.companyName;
        },
        getEmail() {
            return this.email;
        },
        getPhone() {
            return this.phone;
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
        },
        setDonutName(donutName) {
            this.donutName = donutName;
        },
        setCompanyName(companyName) {
            this.companyName = companyName;
        },
        setEmail(email) {
            this.email = email;
        },
        setPhone(phone) {
            this.phone = phone;
        }
    }
});