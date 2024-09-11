'use client'

import Msg from '@/app/back/models/conv';
import { createConv, getConv, updateConv } from '@/app/lib/dbhelper/conv';
import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState<string>('');
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchMessagesInterval = setInterval(fetchMessages, 10_000);

    fetchMessages();

    return () => clearInterval(fetchMessagesInterval);
  }, []);

  const fetchMessages = async () => {
    try {
        const data = await getConv("1"); // ! to change
        if (data) {
          setMessages(data);
        } else {
          const newConv: Msg[] = [];
          await createConv("1", newConv); // ! to change
        }
      } catch (error) {
      }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    try {
      const newMsg: Msg = new Msg(input, new Date(), true); // ! false means coach sent the message

      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setInput('');

      const conversation = await getConv("1");

      conversation.push(newMsg);

      await updateConv("1", conversation); // ! to change

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>CLIENT</h1>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null} // Set ref on the last message
            style={{
              textAlign: !msg.client_sender ? 'left' : 'right',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: !msg.client_sender ? '#e0f7fa' : '#f1f8e9',
              borderRadius: '8px',
              maxWidth: '60%',
              marginLeft: !msg.client_sender ? '0' : 'auto',
            }}
          >
            <p>{msg.msg}</p>
            <small>{new Date(msg.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={handleKeyPress}
        style={{ width: '80%', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
