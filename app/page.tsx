'use client';

import { useEffect, useState } from 'react';

interface Message {
  sender: string;
  timestamp: string;
  message_type: string;
  content: string;
  media_url: string | null;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'text' | 'audio' | 'image'>('all');

  useEffect(() => {
    fetch('/messages.json')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading messages:', err);
        setLoading(false);
      });
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.message_type === filter;
  });

  const isSent = (sender: string) =>
    sender.includes('rayane') || sender.includes('ibaichou');

  return (
    <div className="container">
      <div className="header">
        <h1>Instagram Messages</h1>
        <p>{filteredMessages.length} messages</p>
      </div>

      <div className="filters">
        {(['all', 'text', 'audio', 'image'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            style={{
              backgroundColor: filter === type ? undefined : '#4b5563',
              background: filter === type ? 'linear-gradient(to right, #ec4899, #f43f5e)' : '#4b5563'
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="messages">
          {filteredMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`message-group ${isSent(msg.sender) ? 'sent' : ''}`}
            >
              <div className="message-content">
                <div className="sender-name">{msg.sender}</div>
                <div className={`bubble ${isSent(msg.sender) ? 'sent' : 'received'}`}>
                  {msg.message_type === 'text' && (
                    <div className="bubble-text">{msg.content}</div>
                  )}

                  {msg.message_type === 'audio' && (
                    <div className="bubble-media">
                      <audio controls style={{ width: '100%' }}>
                        <source src={msg.media_url || ''} type="audio/mp4" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}

                  {msg.message_type === 'image' && msg.media_url && (
                    <div className="bubble-media">
                      <img src={msg.media_url} alt="Message" />
                    </div>
                  )}

                  <div className="bubble-meta">{msg.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
