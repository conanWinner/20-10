import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SocialShare.css';

interface SocialShareProps {
  userName?: string;
  customMessage?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ userName = 'Phụ nữ Việt Nam', customMessage }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin;
  const shareText = customMessage || `Chúc mừng ngày Phụ nữ Việt Nam 20/10! ${userName} xinh đẹp và tuyệt vời! 💕🌸`;
  const shareUrl = `${baseUrl}?name=${encodeURIComponent(userName)}`;
  const hashtags = 'NgayPhuNuVietNam,20Thang10,PhuNuVietNam,ChucMung';

  const shareOptions = [
    {
      name: 'Facebook',
      icon: '📘',
      color: '#1877f2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Zalo',
      icon: '💙',
      color: '#0068ff',
      url: `https://zalo.me/share?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: '#1da1f2',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`
    },
    {
      name: 'WhatsApp',
      icon: '💚',
      color: '#25d366',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: '#0088cc',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077b5',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${shareText}\n\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  return (
    <div className="social-share">
      <motion.div
        className="share-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="share-main-btn"
          onClick={() => setShowShareOptions(!showShareOptions)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="share-icon">📱</span>
          <span className="share-text">Chia sẻ lời chúc</span>
        </motion.button>

        <motion.button
          className="copy-btn"
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="copy-icon">{copied ? '✅' : '📋'}</span>
          <span className="copy-text">{copied ? 'Đã copy!' : 'Copy link'}</span>
        </motion.button>
      </motion.div>

      <motion.div
        className="share-options"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showShareOptions ? 1 : 0, 
          height: showShareOptions ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="share-grid">
          {shareOptions.map((option, index) => (
            <motion.button
              key={option.name}
              className="share-option"
              style={{ backgroundColor: option.color }}
              onClick={() => openShare(option.url)}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: showShareOptions ? 1 : 0, 
                scale: showShareOptions ? 1 : 0.8 
              }}
              transition={{ 
                delay: showShareOptions ? index * 0.1 : 0,
                type: "spring",
                stiffness: 300
              }}
            >
              <span className="option-icon">{option.icon}</span>
              <span className="option-name">{option.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="share-preview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4>💌 Nội dung chia sẻ:</h4>
        <div className="preview-content">
          <p>"{shareText}"</p>
          <p className="preview-url">🔗 {shareUrl}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialShare;
