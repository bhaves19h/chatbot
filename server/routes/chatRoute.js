import express from "express";
import ai from "../config/gemini.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "No input message provided." });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    // ✅ Correct way to extract generated text from response
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    res.json({ success: true, response: responseText });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Something went wrong." });
  }
});

export default router;
