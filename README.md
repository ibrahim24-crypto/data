# Instagram Messages Viewer

A beautiful Next.js application to view and browse your Instagram messages with a modern UI.

## Features

- 📱 Beautiful message viewer with gradient UI
- 🎨 Support for text, audio, and image messages
- 🔍 Filter messages by type
- ⚡ Fast and responsive
- 🎭 Dark theme with vibrant accents

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Place your `messages.json` file in the `public` folder
2. Run the development server
3. Browse through your messages with filters

## Message Data Format

The `messages.json` file should contain an array of message objects:

```json
[
  {
    "sender": "Name",
    "timestamp": "Mar 31, 2026 4:15 am",
    "message_type": "text",
    "content": "Message content",
    "media_url": null
  }
]
```

## Build

```bash
npm run build
npm start
```

## License

MIT
