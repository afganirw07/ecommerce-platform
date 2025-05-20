import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, User } from 'lucide-react';
import { getRecommendation } from "../../../chatBotGeminiAi";
import { useNavigate } from 'react-router-dom';

const ProductScroller = ({ products }) => {
  if (!products || products.length === 0) return null;
  
  
    // handle navigate detail product
    const navigate = useNavigate();
    const handleDetailProduct = (productId) => {
      navigate(`/product/${productId}`);
    };


  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2">
      <div className="inline-flex gap-3 w-max">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleDetailProduct(product._id)}
            className="flex-shrink-0 cursor-pointer w-[150px] sm:w-[180px] bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300  "
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-28 sm:h-32 object-cover rounded-t-xl"
            />
            <div className="p-2">
              <h4 className="text-xs sm:text-sm font-semibold line-clamp-2">{product.title}</h4>
              <p className="text-xs text-gray-500">{product.brand}</p>
              <p className="text-xl text-black font-bold">${product.retailPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // chat cek local
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            text: 'Hello! I am your chat assistant. How can I help you?',
            from: 'bot',
            time: new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      from: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiReply = await getRecommendation(input);

      const botResponse = {
        id: messages.length + 2,
        text: aiReply.text,
        from: "bot",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        products: aiReply.products,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Maaf, terjadi kesalahan saat menghubungi AI.",
          from: "bot",
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={`relative bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${open ? 'rotate-180' : ''}`}
        >
          {open ? (
            <X size={24} className="transition-transform duration-300" />
          ) : (
            <MessageCircle size={24} className="transition-transform duration-300" />
          )}
          {!open && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              1
            </span>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] max-h-[32rem] sm:max-h-[70vh] bg-white border-0 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="https://i.pinimg.com/736x/1d/23/3d/1d233dbaf37c7c70866d5d0a783e0c92.jpg"
                  alt="Bot Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-sm sm:text-base">
                  ReKicks Assistant
                </span>
                <p className="text-xs opacity-80 hidden sm:block">
                  Typically replies within a few minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${msg.from === 'user' ? 'bg-gradient-to-r from-red-500 to-blue-600' : 'bg-gray-500'}`}>
                    {msg.from === 'user' ? (
                      <User size={16} />
                    ) : (
                      <img
                        src="https://i.pinimg.com/736x/1d/23/3d/1d233dbaf37c7c70866d5d0a783e0c92.jpg"
                        alt="Bot Avatar"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm max-w-[230px] break-words ${
                        msg.from === 'user'
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border rounded-bl-none'
                      }`}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.text }} />
                      {msg.products && <ProductScroller products={msg.products} />}
                    </div>
                    <span className={`text-xs text-gray-500 mt-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[85%] sm:max-w-[80%]">
                  <img
                    src="https://i.pinimg.com/736x/1d/23/3d/1d233dbaf37c7c70866d5d0a783e0c92.jpg"
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-2xl rounded-bl-none shadow-sm border">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-full border border-gray-200 px-4 py-2 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200 transition-all duration-200 max-w-full">
              <input
                type="text"
                className="flex-1 bg-transparent text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ minWidth: 0 }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`p-2 rounded-full transition-all duration-200 ${
                  input.trim()
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-md transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">
              Press Enter to send message
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;