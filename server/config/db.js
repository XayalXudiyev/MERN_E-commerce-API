
import mongoose from "mongoose"

const db = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('db conneecttt')
    }).catch(() => {
        console.log(`${err}`)
    })
}

export default db 