const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 연결 오류:"));
db.once("open", () => {
    console.log("MongoDB와 연결되었습니다.");
});

const markerSchema = new mongoose.Schema({
    user: String,
    date: String,
    lat: Number,
    lng: Number,
    state: String,
    image: String,
});
const Marker = mongoose.model("Marker", markerSchema);

app.use(cors());
app.use(express.json());
// app.use("/storage", express.static("uploads"));

app.get("/api/markers", async (req, res) => {
    try {
        const markers = await Marker.find({});
        res.json(markers);
    } catch (err) {
        console.error("Error fetching markers:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/save", async (req, res) => {
    try {
        const { user, date, lat, lng, state, image } = req.body;

        // const uploadDirectory = path.join(__dirname, "uploads");
        // if (!fs.existsSync(uploadDirectory)) {
        //   fs.mkdirSync(uploadDirectory);
        // }

        // const imageFileName = `${uuid.v4()}.png`;
        // const imagePath = path.join(uploadDirectory, imageFileName);

        // fs.writeFileSync(imagePath, image, "base64");

        const marker = new Marker({ user, date, lat, lng, state, image });

        await marker.save();

        console.log("Marker saved successfully.");
        res.status(200).send("Marker saved successfully");
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
