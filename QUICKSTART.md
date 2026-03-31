# Instagram Messages Viewer - Quick Start

✅ **Project is ready to use!**

## What was extracted:
- **294 messages** from your Instagram conversation with Ihssan
- Messages include: text, audio, images, and reactions
- All data is stored locally in `public/messages.json`

## Features:
- 🎨 Beautiful gradient UI with purple/pink theme
- 📝 View text messages with full content
- 🔊 Play audio messages inline
- 🖼️ View images sent in the conversation
- 🔍 Filter messages by type (All, Text, Audio, Image)
- 📱 Responsive design for mobile and desktop
- ✨ Smooth animations and transitions

## How to run:

### Development Mode (with hot reload):
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000)

### Production Build:
```bash
npm run build
npm start
```

## Project Structure:
```
Data/
├── app/
│   ├── layout.tsx      (Main layout with embedded CSS)
│   └── page.tsx        (Message viewer component)
├── public/
│   └── messages.json   (294 extracted messages)
├── package.json        (Dependencies)
└── tsconfig.json       (TypeScript config)
```

## Notes:
- Messages are displayed in reverse chronological order (newest first)
- Sent messages appear on the right in pink/rose gradient
- Received messages appear on the left in dark gray
- All media URLs point to your local files from the Instagram export

Enjoy exploring your messages! 🎉
