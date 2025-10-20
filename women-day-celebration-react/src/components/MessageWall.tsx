import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MessageWall.css';

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  color: string;
}

const MessageWall: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [showForm, setShowForm] = useState(false);

  const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff9a9e', '#fecfef'];

  const addMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name.trim() && newMessage.message.trim()) {
      const message: Message = {
        id: Date.now(),
        name: newMessage.name.trim(),
        message: newMessage.message.trim(),
        timestamp: new Date(),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      
      setMessages(prev => [message, ...prev]);
      setNewMessage({ name: '', message: '' });
      setShowForm(false);
    }
  };

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('womenDayMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('womenDayMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="message-wall">
      <motion.div
        className="wall-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>💌 Bức Tường Lời Chúc 20/10</h2>
        <p>Hãy để lại lời chúc cho các chị em phụ nữ!</p>
      </motion.div>

      <motion.button
        className="add-message-btn"
        onClick={() => setShowForm(!showForm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {showForm ? '❌ Đóng' : '✍️ Viết lời chúc'}
      </motion.button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="message-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={addMessage}>
              <input
                type="text"
                placeholder="Tên của bạn..."
                value={newMessage.name}
                onChange={(e) => setNewMessage(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <textarea
                placeholder="Lời chúc của bạn..."
                value={newMessage.message}
                onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={3}
              />
              <button type="submit">Gửi lời chúc 💕</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="messages-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="message-card"
              style={{ backgroundColor: message.color }}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              whileHover={{ scale: 1.02, rotate: Math.random() * 4 - 2 }}
            >
              <div className="message-header">
                <span className="message-name">💖 {message.name}</span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="message-content">
                {message.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MessageWall;
