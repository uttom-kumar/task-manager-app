import app from "./app.js"

let PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`server run successfully at http://localhost:${PORT}/api`)
})
