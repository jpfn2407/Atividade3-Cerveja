const PORT = process.env.PORT || 42080
const express = require('express')

const { response } = require('express')

const app = express()

require("./routs/router")(app);

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`O servidor está a ouvir a porta ${PORT}`);
});


