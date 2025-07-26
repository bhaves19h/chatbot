// exampleUsage.js
/*
import { generateText } from "./config/gemini.js";

async function run() {
  const response = await generateText();
  console.log("Gemini Response:", response);
}

run();
*/
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoute.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

app.get('/',(req,res)=>{
    res.json({message:"your request is succesfully made!"})
})


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
