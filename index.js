const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv').config();

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": userMessage }
            ],
            model: "gpt-3.5-turbo",
        });

        const gptResponse = completion.choices[0].message.content.trim();
        res.json({ response: gptResponse });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
