import { createApp } from 'vue'
import App from './App.vue'


import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import 'quasar/dist/quasar.css'


import Router from './router'


const app = createApp(App);

app.use(Router)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
});


app.mount('#app')
