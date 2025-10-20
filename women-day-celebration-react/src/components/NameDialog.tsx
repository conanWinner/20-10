import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './NameDialog.css';

interface NameDialogProps {
  onSubmit: (name: string) => void;
}

const NameDialog: React.FC<NameDialogProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      className="name-dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="dialog-content"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        <motion.h1 
          className="dialog-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🌸 Chào Mừng Ngày Phụ Nữ Việt Nam 🌸
        </motion.h1>
        
        <motion.p 
          className="dialog-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Hãy cho chúng tôi biết tên của bạn để tạo lời chúc đặc biệt!
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bạn..."
            maxLength={50}
            autoFocus
          />
          <br />
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bắt đầu nào! ✨
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default NameDialog;
