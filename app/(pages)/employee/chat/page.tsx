'use client';

import Msg from '@/app/back/models/conv';
import Customers from '@/app/back/models/customers';
import { createConv, getConv, updateConv } from '@/app/lib/dbhelper/conv';
import { getCoachCustomers, getCustomers } from '@/app/lib/dbhelper/customers';
import { getSelfId, isManager } from '@/app/lib/user';
import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState<string>('');
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerList = await isManager() ? await getCustomers() : await getCoachCustomers(await getSelfId());
        setCustomers(customerList);
        if (customerList.length > 0) {
          setSelectedCustomer(customerList[0]);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedCustomer) {
        try {
          const data = await getConv(selectedCustomer.id.toString());
          if (data) {
            setMessages(data);
          } else {
            setMessages([]);
            const newConv: Msg[] = [];
            await createConv(selectedCustomer.id.toString(), newConv);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
    const fetchMessagesInterval = setInterval(fetchMessages, 10000);

    return () => clearInterval(fetchMessagesInterval);
  }, [selectedCustomer]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || !selectedCustomer) return;

    try {
      const newMsg: Msg = new Msg(input, new Date(), false);
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setInput('');

      const conversation = await getConv(selectedCustomer.id.toString());
      conversation.push(newMsg);

      await updateConv(selectedCustomer.id.toString(), conversation);
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
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ccc', paddingRight: '10px', height: '400px', overflowY: 'scroll' }}>
        <h3>Customers</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {customers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                backgroundColor: selectedCustomer?.id === customer.id ? '#f0f0f0' : 'transparent',
                marginBottom: '5px',
              }}
            >
              {customer.name + ' ' + customer.surname}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ width: '80%', paddingLeft: '20px' }}>
        <h1>{selectedCustomer ? selectedCustomer.name + ' ' + selectedCustomer.surname : 'Select a customer'}</h1>
        <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '20px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              style={{
                textAlign: msg.client_sender ? 'left' : 'right',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: msg.client_sender ? '#e0f7fa' : '#f1f8e9',
                borderRadius: '8px',
                maxWidth: '60%',
                marginLeft: msg.client_sender ? '0' : 'auto',
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
          disabled={!selectedCustomer}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px' }} disabled={!selectedCustomer}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
