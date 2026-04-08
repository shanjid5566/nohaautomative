import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { ArrowLeft, Send, ChevronDown, Pencil, Plus, Paperclip } from 'lucide-react';

// ─── Static Data ─────────────────────────────────────────────────────────────

const CONTACTS = [
  { id: 'ev-motors', name: 'EV Motors', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop', online: true, unread: 2 },
  { id: 'luxury-rides', name: 'Luxury Rides', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop', online: false, unread: 0 },
  { id: '3d-maker', name: '3D Maker', avatar: 'https://ui-avatars.com/api/?name=3D+Maker&size=100&background=0891b2&color=fff', online: true, unread: 1 },
  { id: 'printify-zone', name: 'Printify Zone', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop', online: false, unread: 0 },
  { id: 'gadget-forge', name: 'Gadget Forge', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop', online: true, unread: 3 },
];

const EV_MOTORS_MESSAGES = [
  { id: 1, userId: 'ev-motors', text: 'Hi! Is this car still available?', timestamp: '10:30 AM' },
  { id: 2, userId: 'user', text: 'Yes, it is! Would you like more details?', timestamp: '10:32 AM' },
  { id: 3, userId: 'ev-motors', text: 'Can I see more photos?', timestamp: '10:35 AM' },
  { id: 4, userId: 'user', text: 'Sure! I can send you the complete album.', timestamp: '10:37 AM' },
];

const AV_MSG = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop';

const BUBBLE_SHAPE = {
  borderRadius: { user: 'rounded-b-2xl rounded-tl-2xl', other: 'rounded-b-2xl rounded-tr-2xl' },
};

// ─── Components ──────────────────────────────────────────────────────────────

const ContactRow = memo(({ contact, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
      active ? 'bg-[#6C3BFF] bg-opacity-10' : 'hover:bg-gray-100'
    }`}
  >
    <div className="relative shrink-0">
      <img
        src={contact.avatar}
        alt={contact.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      {contact.online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-sm text-gray-900 truncate">{contact.name}</h3>
      <p className="text-xs text-gray-500">{contact.online ? 'Online' : 'Offline'}</p>
    </div>
    {contact.unread > 0 && (
      <div className="bg-[#6C3BFF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
        {contact.unread}
      </div>
    )}
  </div>
));

ContactRow.displayName = 'ContactRow';

const ChatMessage = memo(({ message, userId }) => {
  const isUser = message.userId === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'bg-[#6C3BFF] text-white' : 'bg-[#f0f2f5] text-gray-900'} px-4 py-2 ${BUBBLE_SHAPE.borderRadius[isUser ? 'user' : 'other']}`}>
        <p className="text-sm flex-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-gray-300' : 'text-gray-500'}`}>{message.timestamp}</p>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

// ─── Main Component ──────────────────────────────────────────────────────────

const ChatContent = memo(() => {
  const [activeId, setActiveId] = useState('ev-motors');
  const [allMessages, setAllMessages] = useState(EV_MOTORS_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [mobileView, setMobileView] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, scrollToBottom]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: allMessages.length + 1,
        userId: 'user',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setAllMessages([...allMessages, newMessage]);
      setInputValue('');
    }
  }, [inputValue, allMessages]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleContactClick = useCallback((id) => {
    setActiveId(id);
    setMobileView(false);
  }, []);

  const handleAttachPhoto = useCallback(() => {
    fileInputRef.current?.click();
    setShowMenu(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a message with file info
      const newMessage = {
        id: allMessages.length + 1,
        userId: 'user',
        text: `📸 Photo: ${file.name}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setAllMessages([...allMessages, newMessage]);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [allMessages]);

return (
  <>
    <div className="w-full bg-white flex flex-col lg:flex-row overflow-hidden h-[570px] lg:h-[750px]">

      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden w-full h-full">

        {mobileView ? (
          // ✅ CONTACT LIST
          <div className="flex flex-col w-full h-full bg-white">
            <div className="px-4 py-3 bg-[#EEEEEE] border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Contacts</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {CONTACTS.map((contact) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  active={activeId === contact.id}
                  onClick={() => {
                    handleContactClick(contact.id);
                    setMobileView(false); // 👉 go to chat
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // ✅ CHAT SCREEN
          <div className="flex flex-col w-full h-full bg-[#F8F8F8]">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#EEEEEE] border-b border-gray-200">
              <button onClick={() => setMobileView(true)}>
                <ArrowLeft size={24} className="text-gray-600" />
              </button>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {CONTACTS.find(c => c.id === activeId)?.name}
                </h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {allMessages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} userId={activeId} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-[#F8F8F8] px-4 py-4 flex items-center gap-2 border-t border-gray-200 relative">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="bg-[#6C3BFF] hover:bg-[#5a2dd1] text-white p-2 rounded-full transition-colors"
                >
                  <Plus size={18} />
                </button>
                {showMenu && (
                  <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <button
                      onClick={handleAttachPhoto}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 text-left whitespace-nowrap"
                    >
                      <Paperclip size={18} />
                      <span className="text-sm font-medium">Attach Photo</span>
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#6C3BFF]"
              />
              <button
                onClick={handleSend}
                className="bg-[#6C3BFF] hover:bg-[#5a2dd1] text-white p-2 rounded-full"
              >
                <Send size={18} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        )}

      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:flex w-full h-full">

        {/* Sidebar */}
        <div className="flex flex-col w-80 bg-white border-r border-gray-200">
          <div className="px-4 py-6.5 bg-[#EEEEEE] border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONTACTS.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                active={activeId === contact.id}
                onClick={() => handleContactClick(contact.id)}
              />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-1 bg-[#F8F8F8]">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#EEEEEE] border-b border-gray-200">
            <div>
              <h2 className="font-semibold text-lg text-gray-900">
                {CONTACTS.find(c => c.id === activeId)?.name}
              </h2>
              <p className="text-sm text-gray-500">Active now</p>
            </div>
            <Pencil size={20} className="text-gray-600 cursor-pointer" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {allMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} userId={activeId} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-[#F8F8F8] px-6 py-4 flex items-center gap-3 border-t border-gray-200 relative">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-[#6C3BFF] hover:bg-[#5a2dd1] text-white p-2 rounded-full transition-colors"
              >
                <Plus size={18} />
              </button>
              {showMenu && (
                <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <button
                    onClick={handleAttachPhoto}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700 text-left whitespace-nowrap"
                  >
                    <Paperclip size={18} />
                    <span className="text-sm font-medium">Attach Photo</span>
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#6C3BFF]"
            />
            <button
              onClick={handleSend}
              className="bg-[#6C3BFF] hover:bg-[#5a2dd1] text-white p-2 rounded-full"
            >
              <Send size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

        </div>
      </div>

    </div>
  </>
);
});

ChatContent.displayName = 'ChatContent';

export default ChatContent;
