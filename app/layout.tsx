import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Messages Viewer",
  description: "View your Instagram messages in style",
};

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #7e22ce 0%, #6d28d9 50%, #4f46e5 100%);
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    min-height: 100vh;
    padding: 20px;
  }

  .container {
    max-width: 700px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .header h1 {
    font-size: 32px;
    background: linear-gradient(to right, #f472b6, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  .header p {
    color: #d1d5db;
    font-size: 14px;
    margin-top: 8px;
  }

  .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 10px 16px;
    border: none;
    border-radius: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    background: #374151;
    color: white;
  }

  .filter-btn.active {
    background: linear-gradient(to right, #ec4899, #f43f5e);
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 32px;
  }

  .message-group {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 8px;
  }

  .message-group.sent {
    flex-direction: row-reverse;
  }

  .message-content {
    max-width: 400px;
  }

  .sender-name {
    font-size: 13px;
    font-weight: 600;
    color: #d1d5db;
    padding: 0 4px;
    margin-bottom: 4px;
  }

  .bubble {
    padding: 12px 16px;
    border-radius: 18px;
    word-break: break-word;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .bubble.received {
    background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
    border-radius: 18px 18px 0 18px;
  }

  .bubble.sent {
    background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
    border-radius: 18px 18px 18px 0;
  }

  .bubble-text {
    font-size: 15px;
    line-height: 1.4;
  }

  .bubble-meta {
    font-size: 12px;
    margin-top: 6px;
    opacity: 0.7;
  }

  .bubble-media {
    margin-top: 8px;
  }

  .bubble-media audio,
  .bubble-media img {
    max-width: 100%;
    border-radius: 8px;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(236, 72, 153, 0.3);
    border-top: 3px solid #ec4899;
    border-right: 3px solid #c084fc;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{styles}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

