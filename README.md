# AI Chatbot - Embeddable Customer Service Widget

An embeddable, AI-powered chatbot widget that can be added to any website. Powered by OpenAI GPT-4, this chatbot provides intelligent customer service based on your business information.

## Features

- **AI-Powered Responses**: Uses OpenAI GPT-4 to provide intelligent, context-aware answers
- **Easy Embedding**: Add to any website with a simple script tag
- **Fully Customizable**: Customize colors, position, greeting message, and branding
- **Modern Design**: Clean, professional UI with smooth animations
- **Secure**: API key is server-side only, never exposed to the client
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Real-time Streaming**: Responses stream in real-time for a better user experience

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** - Get one at [OpenAI Platform](https://platform.openai.com/api-keys)

## Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AI-Chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Customize Business Data

Edit `business-data.txt` with your business information:

```txt
We are Your Business Name, a [description of your business]...
Our office hours are [hours]...
Our services include:
- Service 1
- Service 2
...
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo page with the chatbot widget.

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your repository

5. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - Add `NEXT_PUBLIC_APP_URL` with your deployment URL (e.g., `https://your-app.vercel.app`)

7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### Post-Deployment

After deployment, update the `NEXT_PUBLIC_APP_URL` environment variable in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings > Environment Variables
3. Update `NEXT_PUBLIC_APP_URL` to your actual Vercel URL (e.g., `https://your-app.vercel.app`)
4. Redeploy the application

## How to Use the Embed Code

### Basic Usage

Add this code to any website before the closing `</body>` tag:

```html
<!-- AI Chatbot Widget -->
<script src="https://your-app.vercel.app/embed.js"></script>
<script>
  window.initAIChatbot({
    primaryColor: '#0066cc',
    position: 'bottom-right',
    greeting: 'Hello! How can I help you today?',
    businessName: 'ABC Real Estate'
  });
</script>
```

### Auto-Initialize with Data Attributes

You can also use data attributes for auto-initialization:

```html
<script 
  src="https://your-app.vercel.app/embed.js"
  data-primary-color="#0066cc"
  data-position="bottom-right"
  data-greeting="Hello! How can I help you today?"
  data-business-name="Your Business"
></script>
```

## Customization Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `primaryColor` | string | Hex color for user messages and accents | `#0066cc` |
| `position` | string | Widget position: `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` |
| `greeting` | string | Initial message shown when chat opens | `Hello! How can I help you today?` |
| `businessName` | string | Business name displayed in chat header | `ABC Real Estate` |

### Example Customizations

**Green theme, left side:**
```javascript
window.initAIChatbot({
  primaryColor: '#10b981',
  position: 'bottom-left',
  greeting: 'Welcome! Ask me anything.',
  businessName: 'Green Eco Store'
});
```

**Purple theme, custom greeting:**
```javascript
window.initAIChatbot({
  primaryColor: '#8b5cf6',
  position: 'bottom-right',
  greeting: 'Hi there! I\'m here to help with your questions.',
  businessName: 'Purple Tech Solutions'
});
```

## Updating Business Information

To update the information the chatbot uses:

1. Edit `business-data.txt` with your new information
2. Commit and push changes
3. Redeploy to Vercel (automatic if you have CI/CD enabled)

The chatbot will automatically use the updated information for all new conversations.

## Project Structure

```
AI-Chatbot/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # OpenAI API endpoint
│   │   ├── widget/page.tsx         # Embeddable widget page
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Demo landing page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── ChatBubble.tsx          # Floating chat button
│   │   ├── ChatWindow.tsx          # Chat interface
│   │   ├── ChatMessage.tsx         # Message component
│   │   └── EmbedCodeDisplay.tsx    # Embed code display
│   ├── lib/
│   │   └── openai.ts               # OpenAI client
│   └── types/
│       └── chat.ts                 # TypeScript types
├── public/
│   └── embed.js                    # Embed script
├── business-data.txt               # Your business information
├── .env.local                      # Environment variables (local)
├── .env.example                    # Example env file
└── README.md                       # This file
```

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build Locally

```bash
npm run build
npm start
```

### Lint Code

```bash
npm run lint
```

## Troubleshooting

### Issue: Chatbot not appearing

**Solutions:**
- Check browser console for errors
- Verify the embed script URL is correct
- Ensure JavaScript is enabled in the browser
- Check if there are CSP (Content Security Policy) restrictions on the parent site

### Issue: "Failed to load business information"

**Solutions:**
- Ensure `business-data.txt` exists in the root directory
- Check file permissions
- Verify the file is deployed to Vercel

### Issue: API errors or no responses

**Solutions:**
- Check that `OPENAI_API_KEY` is set correctly in environment variables
- Verify your OpenAI account has credits
- Check Vercel logs for detailed error messages
- Ensure the API route is accessible at `/api/chat`

### Issue: Widget styling conflicts

**Solutions:**
- The widget uses an iframe for style isolation
- If issues persist, check for z-index conflicts
- Ensure the parent site allows iframes

### Issue: CORS errors

**Solutions:**
- Verify CORS headers are configured in `next.config.js`
- Check that the API route has proper CORS headers
- Clear browser cache and try again

## Security Notes

- **API Key Protection**: OpenAI API key is stored server-side only and never exposed to clients
- **CORS**: Configured to allow embedding while maintaining security
- **Rate Limiting**: Consider adding rate limiting for production use (not included by default)
- **Input Sanitization**: User inputs are sanitized before processing

## Cost Considerations

This chatbot uses OpenAI's GPT-4 API, which has costs based on usage:
- Input tokens: ~$0.03 per 1K tokens
- Output tokens: ~$0.06 per 1K tokens

Consider implementing:
- Rate limiting per user/IP
- Message length limits
- Daily usage caps
- Caching for common questions

## Future Enhancements

Potential features to add:
- Chat history persistence
- Analytics dashboard
- Multi-language support
- User authentication
- File upload capability
- Conversation export
- Admin panel for managing business data
- A/B testing different responses
- Sentiment analysis

## License

[Your chosen license]

## Support

For issues, questions, or contributions, please [open an issue](your-repo-url/issues) on GitHub.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI GPT-4](https://openai.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
