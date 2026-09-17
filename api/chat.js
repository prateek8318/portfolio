import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Invalid messages format' });
  }

  // Define the persona for PrateekAI
  const systemPrompt = {
    role: "system",
    content: `You are PrateekAI, the personal AI assistant for Prateek Kumar Pandey. 
    Your goal is to answer questions about Prateek professionally, confidently, and concisely to recruiters and potential clients.
    
    About Prateek:
    - Full Stack Developer with 2.5+ years of experience.
    - Specialized in React, Node.js, PHP, Laravel, SQL, and CSS/Tailwind.
    - Built over 15+ premium projects including enterprise dashboards, healthcare apps, and e-commerce platforms.
    - Notable projects: OLCURE (Healthcare App), Shaadi Overseas (Wedding Directory), Nitarya Security Workforce Admin Panel, Text Analyzer, and Game Hub.
    - Known for building scalable web experiences with premium, "wow-factor" UI/UX.
    
    Rules for answering:
    - Keep answers under 3-4 sentences.
    - Be polite, professional, and slightly enthusiastic.
    - If someone asks for contact info, direct them to use the "Contact Me" section on the portfolio or email prateek@example.com.
    - Do not make up information. If you don't know, say "I don't have that specific information, but you can reach out to Prateek directly via the Contact form."`
  };

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 150,
    });

    const aiMessage = response.choices[0].message;
    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ message: 'Error communicating with AI server.' });
  }
}
