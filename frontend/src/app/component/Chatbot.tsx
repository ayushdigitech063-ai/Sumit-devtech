"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  RotateCcw,
  Languages,
} from "lucide-react";
import { site, leadOptions } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

type Language = "en" | "hi";
type Sender = "bot" | "user";

interface Message {
  id: string;
  sender: Sender;
  text: string;
  options?: { label: string; action: string }[];
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const CONTENT = {
  en: {
    welcome1: "Hello! 👋 Welcome to Sumit DevTech. How can we help you today?",
    welcome2: "Please choose an option or type below:",
    options: [
      { label: "Our Services", action: "services" },
      { label: "Pricing & Packages", action: "packages" },
      { label: "Recent Projects", action: "portfolio" },
      { label: "Get a Free Quote", action: "quote" },
      { label: "Contact Us", action: "contact" },
    ],
    servicesIntro: "We build modern, fast and high-converting digital products:",
    serviceList: [
      { label: "Web Design & UI/UX", action: "svc_design" },
      { label: "Next.js / React Development", action: "svc_custom" },
      { label: "Shopify / E-Commerce", action: "svc_ecom" },
      { label: "WordPress Development", action: "svc_wp" },
      { label: "SEO & Digital Marketing", action: "svc_seo" },
      { label: "Main Menu", action: "main_menu" },
    ],
    serviceDetail: "Would you like a quote or talk to our experts on WhatsApp?",
    quotePrompt: "Which service do you need?",
    askName: "Great! What is your name?",
    askPhone: (name: string) => `Nice to meet you ${name}! Please share your Phone/WhatsApp number:`,
    leadDone: (name: string, svc: string, phone: string) => `Thank you ${name}! We have received your inquiry for ${svc}. Our team will contact you shortly on ${phone}.`,
    packagesText: "We offer clear, fixed-price packages for all business sizes. Check out our packages page:",
    portfolioText: "We have delivered 1000+ successful projects. Browse our portfolio:",
    contactText: `Get in touch with us directly:\n\nPhone: ${site.phones.join(" / ")}\nEmail: ${site.email}\nOffice: Mansarovar, Jaipur`,
    placeholderName: "Enter your name...",
    placeholderPhone: "Enter your phone number...",
    placeholderDefault: "Type a message...",
  },
  hi: {
    welcome1: "नमस्ते! 👋 सुमित देवटेक में आपका स्वागत है। हम आपकी क्या मदद कर सकते हैं?",
    welcome2: "कृपया नीचे से विकल्प चुनें या मैसेज टाइप करें:",
    options: [
      { label: "हमारी सेवाएँ (Services)", action: "services" },
      { label: "पैकेज और प्राइसिंग (Pricing)", action: "packages" },
      { label: "पिछले प्रोजेक्ट्स (Projects)", action: "portfolio" },
      { label: "कोटेशन प्राप्त करें (Get Quote)", action: "quote" },
      { label: "संपर्क करें (Contact)", action: "contact" },
    ],
    servicesIntro: "हम आपके व्यापार के लिए आधुनिक और तेज़ डिजिटल समाधान बनाते हैं:",
    serviceList: [
      { label: "वेबसाइट डिज़ाइन और UI/UX", action: "svc_design" },
      { label: "Next.js / React डेवलपमेंट", action: "svc_custom" },
      { label: "Shopify / ई-कॉमर्स", action: "svc_ecom" },
      { label: "वर्डप्रेस वेबसाइट डेवलपमेंट", action: "svc_wp" },
      { label: "SEO और डिजिटल मार्केटिंग", action: "svc_seo" },
      { label: "मुख्य मेनू", action: "main_menu" },
    ],
    serviceDetail: "क्या आप इसका कोटेशन चाहते हैं या सीधे व्हाट्सएप पर बात करना चाहेंगे?",
    quotePrompt: "आपको कौन सी सेवा चाहिए?",
    askName: "कृपया अपना नाम बताएं?",
    askPhone: (name: string) => `धन्यवाद ${name} जी! कृपया अपना फ़ोन या व्हाट्सएप नंबर शेयर करें:`,
    leadDone: (name: string, svc: string, phone: string) => `धन्यवाद ${name} जी! ${svc} के लिए आपकी रिक्वेस्ट मिल गई है। हमारी टीम जल्द ही ${phone} पर आपसे संपर्क करेगी।`,
    packagesText: "हमारे पास सभी बिज़नेस के लिए पारदर्शी पैकेज हैं। पैकेज पेज देखें:",
    portfolioText: "हमने 1000+ से अधिक प्रोजेक्ट्स सफलतापूर्वक पूरे किए हैं। हमारे काम देखें:",
    contactText: `आप सीधे संपर्क कर सकते हैं:\n\nफ़ोन: ${site.phones.join(" / ")}\nईमेल: ${site.email}\nकार्यालय: मानसरोवर, जयपुर`,
    placeholderName: "अपना नाम लिखें...",
    placeholderPhone: "फ़ोन नंबर लिखें...",
    placeholderDefault: "मैसेज टाइप करें...",
  },
};

const INITIAL_LANGUAGE_SCREEN: Message[] = [
  {
    id: "lang-select-1",
    sender: "bot",
    text: "Welcome to Sumit DevTech 👋\n\nकृपया भाषा चुनें / Please choose language:",
    time: getTime(),
    options: [
      { label: "🇮🇳 हिन्दी (Hindi)", action: "set_lang_hi" },
      { label: "🇬🇧 English", action: "set_lang_en" },
    ],
  },
];

// Clean, cute minimal Robot Mascot SVG
function RobotIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="3" r="1.5" fill="#ff6a1f" />
      <path d="M12 4.5V7" stroke="#ff6a1f" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4.5" y="7" width="15" height="12" rx="4" fill="#ff6a1f" />
      <rect x="7" y="9.5" width="10" height="6.5" rx="2" fill="#ffffff" />
      <circle cx="9.5" cy="12.5" r="1.3" fill="#ff6a1f" />
      <circle cx="14.5" cy="12.5" r="1.3" fill="#ff6a1f" />
      <path d="M10 18H14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="2.5" y="10.5" width="2" height="4.5" rx="1" fill="#ffb703" />
      <rect x="19.5" y="10.5" width="2" height="4.5" rx="1" fill="#ffb703" />
    </svg>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_LANGUAGE_SCREEN);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [leadStep, setLeadStep] = useState<"idle" | "asking_name" | "asking_phone">("idle");
  const [leadData, setLeadData] = useState<{ service?: string; name?: string; phone?: string }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = lang ? CONTENT[lang] : CONTENT.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, messages, isTyping]);

  const selectLanguage = (selectedLang: Language) => {
    setLang(selectedLang);
    const chosenText = selectedLang === "hi" ? "🇮🇳 हिन्दी (Hindi)" : "🇬🇧 English";
    const texts = CONTENT[selectedLang];

    setMessages((prev) => [
      ...prev,
      {
        id: `user-lang-${Date.now()}`,
        sender: "user",
        text: chosenText,
        time: getTime(),
      },
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `welcome-1-${Date.now()}`,
          sender: "bot",
          text: texts.welcome1,
          time: getTime(),
        },
        {
          id: `welcome-2-${Date.now()}`,
          sender: "bot",
          text: texts.welcome2,
          time: getTime(),
          options: texts.options,
        },
      ]);
      setIsTyping(false);
    }, 350);
  };

  const handleResetChat = () => {
    setLang(null);
    setMessages(INITIAL_LANGUAGE_SCREEN);
    setLeadStep("idle");
    setLeadData({});
  };

  const addBotMessage = (
    text: string,
    options?: { label: string; action: string }[]
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          sender: "bot",
          text,
          options,
          time: getTime(),
        },
      ]);
      setIsTyping(false);
    }, 400);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === "set_lang_hi") {
      selectLanguage("hi");
      return;
    }
    if (option.action === "set_lang_en") {
      selectLanguage("en");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        sender: "user",
        text: option.label,
        time: getTime(),
      },
    ]);

    if (option.action.startsWith("lead_svc_")) {
      const selectedService = option.label;
      setLeadData((prev) => ({ ...prev, service: selectedService }));
      setLeadStep("asking_name");
      addBotMessage(t.askName);
      return;
    }

    switch (option.action) {
      case "services":
        addBotMessage(t.servicesIntro, t.serviceList);
        break;

      case "svc_custom":
      case "svc_ecom":
      case "svc_wp":
      case "svc_design":
      case "svc_seo":
        addBotMessage(t.serviceDetail, [
          { label: lang === "hi" ? "कोटेशन प्राप्त करें" : "Get a Quote", action: "quote" },
          { label: "WhatsApp Chat", action: "whatsapp" },
          { label: lang === "hi" ? "सभी सेवाएँ" : "All Services", action: "services" },
        ]);
        break;

      case "packages":
        addBotMessage(t.packagesText, [
          { label: lang === "hi" ? "पैकेज पेज खोलें" : "View Packages", action: "nav_packages" },
          { label: lang === "hi" ? "कस्टम कोटेशन" : "Custom Quote", action: "quote" },
          { label: lang === "hi" ? "वापस" : "Back", action: "main_menu" },
        ]);
        break;

      case "portfolio":
        addBotMessage(t.portfolioText, [
          { label: lang === "hi" ? "सभी प्रोजेक्ट्स देखें" : "View Projects", action: "nav_projects" },
          { label: lang === "hi" ? "कोटेशन मांगें" : "Request Quote", action: "quote" },
          { label: lang === "hi" ? "वापस" : "Back", action: "main_menu" },
        ]);
        break;

      case "quote":
        addBotMessage(
          t.quotePrompt,
          leadOptions.slice(0, 5).map((svc) => ({
            label: svc,
            action: `lead_svc_${svc}`,
          }))
        );
        break;

      case "contact":
        addBotMessage(t.contactText, [
          { label: "WhatsApp", action: "whatsapp" },
          { label: lang === "hi" ? "कॉल करें" : "Call Us", action: "call_now" },
          { label: lang === "hi" ? "वापस" : "Back", action: "main_menu" },
        ]);
        break;

      case "whatsapp":
        window.open(site.whatsapp, "_blank");
        break;

      case "call_now":
        window.location.href = `tel:${site.phones[0]}`;
        break;

      case "nav_packages":
        window.location.href = "/packages";
        break;

      case "nav_projects":
        window.location.href = "/all-projects";
        break;

      case "main_menu":
        setLeadStep("idle");
        addBotMessage(t.welcome2, t.options);
        break;

      default:
        break;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    if (!lang) {
      if (query.toLowerCase().includes("hi") || query.toLowerCase().includes("hindi")) {
        selectLanguage("hi");
        setInput("");
        return;
      }
      selectLanguage("en");
      setInput("");
      return;
    }

    // Phone Number Validation before accepting
    if (leadStep === "asking_phone") {
      // Strip spaces, dashes, +91 or leading 0
      const cleanDigits = query.replace(/\D/g, "");
      // Valid Indian or standard mobile check (must end with exact 10 digits starting with 6-9, or exact 10 digits)
      const valid10 = cleanDigits.length === 10 ? cleanDigits : (cleanDigits.length > 10 && (cleanDigits.startsWith("91") || cleanDigits.startsWith("0")) ? cleanDigits.slice(-10) : null);

      if (!valid10 || !/^[6-9]\d{9}$/.test(valid10)) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-user`,
            sender: "user",
            text: query,
            time: getTime(),
          },
        ]);
        setInput("");
        addBotMessage(
          lang === "hi"
            ? "⚠️ कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें (उदा: 9876543210):"
            : "⚠️ Please enter a valid 10-digit mobile number (e.g., 9876543210):"
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-user`,
          sender: "user",
          text: valid10,
          time: getTime(),
        },
      ]);
      setInput("");

      const finalData = { ...leadData, phone: valid10 };
      setLeadData(finalData);
      setLeadStep("idle");

      addBotMessage(
        t.leadDone(finalData.name || "Client", finalData.service || "Web Project", valid10),
        [
          { label: "WhatsApp Chat", action: "whatsapp" },
          { label: lang === "hi" ? "मुख्य मेनू" : "Main Menu", action: "main_menu" },
        ]
      );
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        sender: "user",
        text: query,
        time: getTime(),
      },
    ]);
    setInput("");

    if (leadStep === "asking_name") {
      setLeadData((prev) => ({ ...prev, name: query }));
      setLeadStep("asking_phone");
      addBotMessage(t.askPhone(query));
      return;
    }

    const lower = query.toLowerCase();

    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("rate") ||
      lower.includes("package") ||
      lower.includes("kitna") ||
      lower.includes("charges")
    ) {
      addBotMessage(t.packagesText, [
        { label: lang === "hi" ? "पैकेज देखें" : "View Packages", action: "nav_packages" },
        { label: lang === "hi" ? "कोटेशन प्राप्त करें" : "Get Quote", action: "quote" },
      ]);
    } else if (
      lower.includes("service") ||
      lower.includes("react") ||
      lower.includes("next") ||
      lower.includes("wordpress") ||
      lower.includes("shopify") ||
      lower.includes("website") ||
      lower.includes("app")
    ) {
      addBotMessage(t.servicesIntro, t.serviceList);
    } else if (
      lower.includes("work") ||
      lower.includes("portfolio") ||
      lower.includes("project")
    ) {
      addBotMessage(t.portfolioText, [
        { label: lang === "hi" ? "प्रोजेक्ट्स देखें" : "View Projects", action: "nav_projects" },
        { label: lang === "hi" ? "कोटेशन प्राप्त करें" : "Get Quote", action: "quote" },
      ]);
    } else if (
      lower.includes("contact") ||
      lower.includes("call") ||
      lower.includes("number") ||
      lower.includes("phone") ||
      lower.includes("address")
    ) {
      addBotMessage(t.contactText, [
        { label: "WhatsApp", action: "whatsapp" },
        { label: lang === "hi" ? "कॉल करें" : "Call", action: "call_now" },
      ]);
    } else if (
      lower.includes("hi") ||
      lower.includes("hello") ||
      lower.includes("hey") ||
      lower.includes("namaste")
    ) {
      addBotMessage(
        lang === "hi" ? "नमस्ते! हम आपकी क्या सहायता कर सकते हैं?" : "Hello! How can we assist you today?",
        t.options
      );
    } else {
      addBotMessage(
        lang === "hi" ? "हम आपकी सहायता के लिए तैयार हैं:" : "We are here to assist you:",
        [
          { label: lang === "hi" ? "कोटेशन प्राप्त करें" : "Get Quote", action: "quote" },
          { label: "WhatsApp Chat", action: "whatsapp" },
          { label: lang === "hi" ? "मुख्य मेनू" : "Main Menu", action: "main_menu" },
        ]
      );
    }
  };

  return (
    <>
      {/* TRIGGER BUTTON (Directly above WhatsApp, Clean & Simple) */}
      <div className="fixed bottom-22 right-5 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Chat"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg border border-slate-200 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <RobotIcon size={28} />
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          </button>
        )}
      </div>

      {/* CHAT WINDOW (Clean, Minimal & Attractive Light Theme) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 flex h-[540px] w-[92vw] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-2xl sm:bottom-6 sm:right-6 sm:h-[580px]"
          >
            {/* Header: Clean & uncluttered */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 border border-orange-100">
                  <RobotIcon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    Sumit DevTech
                  </h3>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {lang && (
                  <button
                    onClick={() => setLang(lang === "en" ? "hi" : "en")}
                    title="Change Language"
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-50 transition"
                  >
                    <Languages size={13} />
                    <span>{lang === "en" ? "हिन्दी" : "EN"}</span>
                  </button>
                )}

                <button
                  onClick={handleResetChat}
                  title="Restart"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-[13.5px] bg-[#fafafa]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line shadow-xs ${
                      m.sender === "user"
                        ? "rounded-br-xs bg-[#ff6a1f] text-white font-medium"
                        : "rounded-bl-xs border border-slate-200/70 bg-white text-slate-800"
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Clean Option Pills */}
                  {m.options && m.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-full">
                      {m.options.map((opt) => (
                        <button
                          key={opt.action}
                          onClick={() => handleOptionClick(opt)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:border-[#ff6a1f] hover:text-[#ff6a1f] hover:bg-orange-50/50 transition active:scale-95"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="mt-1 text-[10px] text-slate-400">{m.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1 rounded-2xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-xs text-slate-400 w-fit">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="border-t border-slate-100 bg-white p-2.5">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type={leadStep === "asking_phone" ? "tel" : "text"}
                  maxLength={leadStep === "asking_phone" ? 14 : 100}
                  value={input}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (leadStep === "asking_phone") {
                      // Allow only digits, +, space, hyphen
                      setInput(val.replace(/[^\d+\s-]/g, ""));
                    } else {
                      setInput(val);
                    }
                  }}
                  placeholder={
                    !lang
                      ? "Choose language above..."
                      : leadStep === "asking_name"
                      ? t.placeholderName
                      : leadStep === "asking_phone"
                      ? t.placeholderPhone
                      : t.placeholderDefault
                  }
                  className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#ff6a1f] focus:bg-white focus:ring-2 focus:ring-[#ff6a1f]/10"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff6a1f] text-white transition hover:bg-[#e85b13] disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
