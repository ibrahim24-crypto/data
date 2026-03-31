'use client';

import { useEffect, useState } from 'react';

interface Message {
  sender: string;
  timestamp: string;
  content: string;
  conversation: string;
}

interface Conversation {
  participants: string[];
  message_count: number;
  name: string;
}

export default function Home() {
  const [view, setView] = useState<'conversations' | 'messages'>('conversations');
  const [conversations, setConversations] = useState<{ [key: string]: Conversation }>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/conversations_summary.json').then(r => r.json()),
      fetch('/all_messages.json').then(r => r.json())
    ])
      .then(([convs, msgs]) => {
        setConversations(convs);
        setMessages(msgs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  const conversationsList = Object.entries(conversations).sort((a, b) => 
    b[1].message_count - a[1].message_count
  );

  const filteredConversations = conversationsList.filter(([_, conv]) => {
    const searchLower = searchTerm.toLowerCase();
    return conv.participants.some(p => p.toLowerCase().includes(searchLower)) ||
           conv.message_count.toString().includes(searchTerm);
  });

  const selectedMessages = selectedConversation 
    ? messages.filter(m => m.conversation === selectedConversation).filter(m => 
        messageSearch === '' || 
        m.content.toLowerCase().includes(messageSearch.toLowerCase()) ||
        m.sender.toLowerCase().includes(messageSearch.toLowerCase())
      )
    : [];

  const displayMessages = reverseOrder 
    ? [...selectedMessages].reverse()
    : selectedMessages;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {view === 'conversations' ? (
        <>
          <div className="header">
            <h1>📱 Instagram Conversations</h1>
            <p>{filteredConversations.length} conversations • {messages.length} total messages</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="🔍 Search conversations by name or count..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '24px',
                border: 'none',
                background: '#2d3748',
                color: '#fff',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="messages">
            {filteredConversations.map(([convId, conv]) => (
              <button
                key={convId}
                onClick={() => {
                  setSelectedConversation(convId);
                  setView('messages');
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginBottom: '8px',
                  background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderLeft: '4px solid #ec4899'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {conv.participants.join(', ')}
                    </div>
                    <div style={{ fontSize: '12px', color: '#a0aec0' }}>
                      {conv.message_count} messages
                    </div>
                  </div>
                  <div style={{ fontSize: '24px' }}>→</div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="header" style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setView('conversations')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ec4899',
                cursor: 'pointer',
                fontSize: '16px',
                marginBottom: '16px'
              }}
            >
              ← Back to Conversations
            </button>
            <h1>{conversations[selectedConversation!]?.participants.slice(0, 3).join(' • ')}{conversations[selectedConversation!]?.participants.length > 3 ? ` +${conversations[selectedConversation!]?.participants.length - 3}` : ''}</h1>
            <p>{displayMessages.length} messages{messageSearch ? ' (filtered)' : ''}</p>
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="🔍 Search messages..."
              value={messageSearch}
              onChange={(e) => setMessageSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '24px',
                border: 'none',
                background: '#2d3748',
                color: '#fff',
                fontSize: '14px'
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setReverseOrder(!reverseOrder)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '24px',
                  border: 'none',
                  background: reverseOrder ? 'linear-gradient(to right, #ec4899, #f43f5e)' : '#4a5568',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
              >
                {reverseOrder ? '⬆️ Oldest First' : '⬇️ Newest First'}
              </button>
            </div>
          </div>

          <div className="messages">
            {displayMessages.length > 0 ? (
              displayMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message-group ${msg.sender.includes('rayane') ? 'sent' : ''}`}
                >
                  <div className="message-content">
                    <div className="sender-name">{msg.sender}</div>
                    <div className={`bubble ${msg.sender.includes('rayane') ? 'sent' : 'received'}`}>
                      <div className="bubble-text">{msg.content || '[No content]'}</div>
                      <div className="bubble-meta">{msg.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#a0aec0' }}>
                No messages found matching "{messageSearch}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
