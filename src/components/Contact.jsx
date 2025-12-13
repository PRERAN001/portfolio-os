import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset after showing success message
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#111] p-6 text-gray-300">
      
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-white mb-1">Contact Me</h2>
        <p className="text-xs text-gray-500">I'm currently available for freelance and full-time roles.</p>
      </div>

      {status === 'success' ? (
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in text-center">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-2xl mb-4">
            <FaPaperPlane />
          </div>
          <h3 className="text-xl font-bold text-white">Message Sent!</h3>
          <p className="text-gray-400 text-sm mt-2">I'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
          <div className="relative group">
            <FaUser className="absolute top-3.5 left-3 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-[#252525] transition-all"
            />
          </div>

          <div className="relative group">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="email" 
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#1c1c1c] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-[#252525] transition-all"
            />
          </div>

          <div className="relative group flex-1">
            <FaCommentAlt className="absolute top-3.5 left-3 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
            <textarea 
              placeholder="Project details or just a hello..."
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full h-full bg-[#1c1c1c] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-[#252525] transition-all resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {status === 'sending' ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;