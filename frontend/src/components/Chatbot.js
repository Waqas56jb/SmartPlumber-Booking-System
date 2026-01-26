import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaRobot } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to BP Heating & Plumbing!\n\nI can help you with:\n• Service information\n• Contact details\n• Emergency assistance\n• Pricing & quotes\n• General inquiries\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();

    // Contact Information
    if (message.includes('contact') || message.includes('phone') || message.includes('call') || message.includes('number') || message.includes('email') || message.includes('address')) {
      return "📞 **Contact Information:**\n\n• **Phone:** +44 7777 998381 (24/7 Emergency)\n• **WhatsApp:** +44 7777 998381\n• **Email:** basitpk4@yahoo.com\n• **Instagram:** @abdulb05\n\nWe're available 24/7 for emergency call-outs!";
    }

    // Services Overview
    if (message.includes('service') && (message.includes('what') || message.includes('offer') || message.includes('provide') || message.includes('do'))) {
      return "🔧 **Our Services:**\n\nWe offer 12 professional services:\n\n1. Boiler Installations & Servicing\n2. Boiler Repairs & Fault Finding\n3. Central Heating\n4. General Plumbing\n5. Gas Safety Inspections\n6. Leak Detection & Repairs\n7. Power Flushing\n8. Water Heaters\n9. Pipe Installation & Repairs\n10. Hot Water Cylinders\n11. New Appliances Installations\n12. Any Repairs\n\nAll services are provided by Gas Safe registered engineers. What specific service do you need?";
    }

    // Boiler Services
    if (message.includes('boiler')) {
      if (message.includes('install') || message.includes('installation')) {
        return "🔥 **Boiler Installation & Servicing:**\n\nWe provide professional boiler installation and regular servicing to keep your heating system running efficiently. Our Gas Safe registered engineers ensure safe and proper installation with all necessary certifications.\n\n• New boiler installations\n• Regular servicing\n• System upgrades\n• Smart thermostat integration\n\nCall us at +44 7777 998381 for a quote!";
      }
      if (message.includes('repair') || message.includes('fix') || message.includes('broken')) {
        return "🔧 **Boiler Repairs & Fault Finding:**\n\nOur expert engineers diagnose and repair boiler faults quickly and safely. We offer:\n\n• Emergency boiler repairs (24/7)\n• Fault diagnosis\n• Quick response times\n• Gas Safe certified work\n\nFor urgent repairs, call +44 7777 998381 immediately!";
      }
      return "🔥 **Boiler Services:**\n\nWe offer comprehensive boiler services including installations, repairs, servicing, and fault finding. All work is carried out by Gas Safe registered engineers.\n\nNeed help? Call +44 7777 998381";
    }

    // Central Heating
    if (message.includes('central heating') || message.includes('heating system')) {
      return "🏠 **Central Heating:**\n\nComplete central heating system installation, maintenance, and optimization for your home:\n\n• Full system installation\n• Radiator installation & balancing\n• System maintenance\n• Efficiency optimization\n• New build installations\n\nCall +44 7777 998381 for expert advice!";
    }

    // Plumbing Services
    if (message.includes('plumb') && !message.includes('heating')) {
      return "🚰 **General Plumbing Services:**\n\nWe handle all plumbing needs:\n\n• Taps, showers, sinks\n• Toilet installation & repairs\n• Pipe installation & repairs\n• Leak detection & repairs\n• Bathroom & kitchen plumbing\n• Complete property repipes\n\nAvailable 24/7 for emergencies! Call +44 7777 998381";
    }

    // Gas Safety
    if (message.includes('gas safe') || message.includes('gas safety') || message.includes('certificate') || message.includes('cp12')) {
      return "🛡️ **Gas Safety Inspections:**\n\nThorough gas safety checks and certification by Gas Safe registered engineers:\n\n• Annual gas safety certificates (CP12)\n• Landlord gas safety checks\n• Appliance safety inspections\n• Boiler safety checks\n• Full property gas safety assessments\n\nRequired for rental properties. Call +44 7777 998381 to book!";
    }

    // Leak Detection
    if (message.includes('leak')) {
      return "💧 **Leak Detection & Repairs:**\n\nFast and accurate leak detection with professional repair services:\n\n• Advanced leak detection equipment\n• Thermal imaging technology\n• Minimal disruption repairs\n• Hidden leak location\n• Water damage prevention\n\nEmergency service available! Call +44 7777 998381";
    }

    // Power Flushing
    if (message.includes('power flush') || message.includes('flushing')) {
      return "⚡ **Power Flushing:**\n\nSystem cleaning to improve heating efficiency:\n\n• Complete system power flush\n• Sludge removal\n• System inhibitor treatment\n• Radiator cleaning\n• Improved efficiency\n\nExtends the life of your boiler! Call +44 7777 998381";
    }

    // Water Heaters
    if (message.includes('water heater') || message.includes('hot water')) {
      return "🔥 **Water Heaters & Hot Water Systems:**\n\nProfessional installation and maintenance:\n\n• Water heater installation\n• Hot water cylinder replacement\n• Unvented cylinder systems\n• Immersion heater services\n• System upgrades\n\nCall +44 7777 998381 for hot water solutions!";
    }

    // Emergency Services
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap') || message.includes('now')) {
      return "🚨 **24/7 Emergency Service:**\n\nWe provide round-the-clock emergency call-out service:\n\n• Boiler breakdowns\n• Burst pipes\n• Gas leaks\n• No heating/hot water\n• Water leaks\n\n**Emergency Line: +44 7777 998381**\n\nFast response times guaranteed!";
    }

    // About Company
    if (message.includes('about') || message.includes('who') || message.includes('company') || message.includes('experience')) {
      return "🏢 **About BP Heating & Plumbing:**\n\n• Gas Safe registered engineers\n• 15+ years of combined experience\n• 5-star rated service\n• Fully insured\n• Serving residential & commercial properties\n• Quality workmanship guaranteed\n\nWe pride ourselves on reliable service and customer satisfaction!";
    }

    // Pricing/Quote
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('how much')) {
      return "💰 **Pricing & Quotes:**\n\nWe provide free, no-obligation quotes for all services. Pricing depends on:\n\n• Type of service required\n• Property size\n• Complexity of work\n• Materials needed\n\nCall us at +44 7777 998381 for a detailed quote tailored to your needs!";
    }

    // Hours/Availability
    if (message.includes('hour') || message.includes('available') || message.includes('when') || message.includes('time')) {
      return "⏰ **Availability:**\n\n• **24/7 Emergency Service** - Always available\n• **Regular Services** - Monday to Sunday\n• **Response Time** - Fast response guaranteed\n• **Emergency Call-outs** - Within 2 hours\n\nCall +44 7777 998381 anytime!";
    }

    // Location/Area
    if (message.includes('where') || message.includes('location') || message.includes('area') || message.includes('cover')) {
      return "📍 **Service Areas:**\n\nWe serve properties across the UK including:\n\n• London\n• Manchester\n• Birmingham\n• Leeds\n• Liverpool\n• And surrounding areas\n\nCall +44 7777 998381 to check if we cover your area!";
    }

    // Insurance/Certification
    if (message.includes('insure') || message.includes('certified') || message.includes('qualified') || message.includes('license')) {
      return "✅ **Certifications & Insurance:**\n\n• Gas Safe registered\n• Fully insured\n• 15+ years experience\n• Quality guaranteed\n• All work certified\n• Professional standards\n\nYou're in safe hands with BP Heating & Plumbing!";
    }

    // Greetings
    if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message === 'hii' || message === 'hiii') {
      return "Hello! 👋 Welcome to BP Heating & Plumbing!\n\nI'm here to help with:\n• Service information\n• Contact details\n• Emergency assistance\n• General inquiries\n\nHow can I assist you today?";
    }

    // Help/Options
    if (message.includes('help') || message.includes('option') || message.includes('menu') || message.includes('what can')) {
      return "💬 **How I Can Help:**\n\nI can provide information about:\n\n• 🔧 Our 12 services\n• 📞 Contact information\n• 🚨 Emergency services\n• 💰 Pricing & quotes\n• 🏢 About our company\n• ⏰ Availability\n• 📍 Service areas\n\nJust ask me anything!";
    }

    // Default response
    return "Thank you for your message! I can help you with:\n\n• Service information\n• Contact details (Phone: +44 7777 998381)\n• Emergency assistance\n• Pricing & quotes\n• Company information\n\nCould you be more specific? Or call us at +44 7777 998381 for immediate help!";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    const userInput = inputMessage;
    setInputMessage('');

    // Get intelligent bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:shadow-accent/50 group ${
          isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'animate-bounce-slow hover:animate-none'
        }`}
        aria-label="Open chatbot"
      >
        <FaComments 
          size={24} 
          className={`transition-transform duration-300 group-hover:scale-110 ${isOpen ? 'rotate-90' : ''}`}
        />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
        )}
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 h-[65vh] sm:h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-500 transform ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white p-4 sm:p-5 rounded-t-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaRobot className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">BP Heating & Plumbing</h3>
              <p className="text-xs sm:text-sm text-white/80">Online Support</p>
            </div>
          </div>
          <button
            onClick={toggleChatbot}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 backdrop-blur-sm"
            aria-label="Close chatbot"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gradient-to-b from-background-alt to-white space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-fade-in-up ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user'
                    ? 'bg-accent text-white'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                {message.sender === 'user' ? (
                  <FaUser size={14} />
                ) : (
                  <FaRobot size={14} />
                )}
              </div>
              <div
                className={`max-w-[75%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  message.sender === 'user'
                    ? 'bg-accent text-white rounded-tr-none'
                    : 'bg-white text-primary border border-border rounded-tl-none'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'user' ? 'text-white/70' : 'text-text-light'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-white p-4 rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-12 h-12 bg-accent text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-accent-dark hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover-lift"
              aria-label="Send message"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
          <p className="text-xs text-text-light mt-2 text-center">
            💡 Try: "services", "contact", "boiler repair", "emergency"
          </p>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleChatbot}
        />
      )}
    </>
  );
};

export default Chatbot;
