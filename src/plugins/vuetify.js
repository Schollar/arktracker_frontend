import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#b58141',
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
            },
            dark: {
                primary: '#b58141',
            },
        },
    },
})

export default new Vuetify({
    theme: { vuetify },
    defaultTheme: 'vuetify'
});
