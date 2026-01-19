# Pharmacy Stock Chatbot

An AI-powered chatbot web application for pharmacies to check stock availability using CRM.com's Self-Service API.

## Features

- Real-time stock availability checking
- Product search by name, SKU, or category
- Low stock and out-of-stock alerts
- Prescription requirement indicators
- Clean, modern chat interface
- Quick action buttons for common queries

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: CRM.com Self-Service API
- **AI**: Intent-based processing (can be enhanced with OpenAI)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- CRM.com API credentials

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pharmacy-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials:
   ```
   CRMCOM_API_KEY=your_crm_api_key_here
   CRMCOM_API_URL=https://sandbox.crm.com/backoffice/v2
   OPENAI_API_KEY=your_openai_api_key_here  # Optional
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## CRM.com API Integration

This application integrates with CRM.com's Self-Service API to fetch:

- Product information
- Stock levels and availability
- Reward account details

### API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/products` | GET | Search and list products |
| `/products/{id}` | GET | Get product details |
| `/inventory/stock` | GET | Get stock information |
| `/accounts/{id}/rewards` | GET | Get reward account |

### Authentication

The API uses API key authentication. Include your API key in the `api_key` header:

```bash
curl -H "api_key: your_api_key" https://sandbox.crm.com/backoffice/v2/products
```

## Demo Mode

The application includes demo data for testing without a CRM.com API connection. Demo products include:

- Paracetamol 500mg (In Stock)
- Ibuprofen 400mg (In Stock)
- Amoxicillin 500mg (In Stock, Prescription Required)
- Vitamin C 1000mg (In Stock)
- Omeprazole 20mg (Low Stock, Prescription Required)
- Loratadine 10mg (Out of Stock)

## Chat Commands

Example queries you can try:

- "Do we have paracetamol in stock?"
- "Show me all painkillers"
- "What products are running low?"
- "Is ibuprofen available?"
- "What's out of stock?"
- "Show me vitamins"
- "Check stock for PARA500"

## Project Structure

```
pharmacy-chatbot/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # Chat API endpoint
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main chat page
│   ├── components/
│   │   ├── ChatInput.tsx         # Message input component
│   │   ├── ChatMessage.tsx       # Message display component
│   │   └── TypingIndicator.tsx   # Loading indicator
│   ├── lib/
│   │   ├── chat-service.ts       # Chat processing logic
│   │   └── crmcom-api.ts         # CRM.com API client
│   └── types/
│       └── index.ts              # TypeScript types
├── .env.example                  # Environment template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Enhancing with OpenAI

To add more sophisticated AI responses, you can integrate OpenAI:

1. Add your OpenAI API key to `.env`
2. Modify `chat-service.ts` to use the OpenAI client
3. Create system prompts for pharmacy-specific context

Example integration:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(message: string, context: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful pharmacy assistant...' },
      { role: 'user', content: message },
    ],
  });
  return completion.choices[0].message.content;
}
```

## CRM.com API Resources

- [CRM.com Documentation](https://www.crm.com/documentation/)
- [Self-Service API](https://crmcom.stoplight.io/docs/stoplight-api-doc/)
- [Back-Office API](https://backoffice-api.crm.com/)

## License

MIT
