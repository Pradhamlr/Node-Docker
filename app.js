//EXPRESS AND DEPENDENCIES
const express = require("express")
const cors = rerquire("cors")

//MONGO DATABASE
const connectDB = require("./db/connect")
const { MONGO_USER, MONGO_PASS, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config")

//REDIS AND SESSION
const session = require("express-session")
const redis = require("redis")

const ConnectRedis = require("connect-redis")
const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: REDIS_URL,
      port: REDIS_PORT,
    }
})

redisClient.connect().catch(console.error);
const RedisStore = ConnectRedis(session);

//ROUTES
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

//MIDDLEWARE
const authenticationMiddleware = require("./middleware/authMiddleware")

//APP
const app = express()

app.enable("trust proxy")
app.use(cors())

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000
    }
}))
app.use(express.json())

app.get("/api/v1", (req, res) => {
    res.send("<h2>HI THERE</h2>")
    console.log("Succesfull")
})

app.use("/api/v1/posts", authenticationMiddleware, postRouter)
app.use("/api/v1/auth", userRouter)

//PORT
const port = process.env.PORT || 3000

//START
const start = async () => {
    try {
        await connectDB(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
        app.listen(port, () => {
            console.log(`Server is Listening On Port ${port}`)
        })
    } catch (error) {
        console.log(error)
        setTimeout(start, 5000)
    }
}

start()