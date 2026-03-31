import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Renderer & Veri ─────────────────────────────────────────────────
import { renderNode } from './src/renderer/components';
import { screens } from './src/data/ui.json';

const GEMINI_API_KEY = "AIzaSyBRUAqUNVgMQ_PGF7C00yuj6NGEyQgrkAc";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ── Tema Tanımları ──────────────────────────────────────────────────
const THEMES = {
  aura: { bg: '#F8F9FA', primary: '#630ED4', secondary: '#A855F7', text: '#191C1D', bubbleThem: '#FFFFFF', bubbleThemText: '#191C1D', statusBar: 'dark-content' },
  midnight: { bg: '#0d0d1a', primary: '#00f2f2', secondary: '#00a0a0', text: '#e0e0ff', bubbleThem: '#1e1e3a', bubbleThemText: '#e0e0ff', statusBar: 'light-content' },
  noir: { bg: '#000000', primary: '#FFFFFF', secondary: '#888888', text: '#FFFFFF', bubbleThem: '#1a1a1a', bubbleThemText: '#FFFFFF', statusBar: 'light-content' }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [messages, setMessages] = useState([]);
  const [aiMessages, setAiMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [themeName, setThemeName] = useState("aura");
  const [userName, setUserName] = useState("Misafir Kullanıcı");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef(null);

  const activeTheme = THEMES[themeName] || THEMES.aura;

  // ── Veri Yükleme (Persistence) ────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('@aura_messages');
        const savedAiMessages = await AsyncStorage.getItem('@aura_ai_messages');
        const savedTheme = await AsyncStorage.getItem('@aura_theme');
        const savedName = await AsyncStorage.getItem('@aura_username');
        
        if (savedMessages) setMessages(JSON.parse(savedMessages));
        if (savedAiMessages) setAiMessages(JSON.parse(savedAiMessages));
        if (savedTheme) setThemeName(savedTheme);
        if (savedName) setUserName(savedName);
      } catch (e) {
        console.error("Yükleme hatası:", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // ── Veri Kaydetme ─────────────────────────────────────────────────
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('@aura_messages', JSON.stringify(messages));
      AsyncStorage.setItem('@aura_ai_messages', JSON.stringify(aiMessages));
      AsyncStorage.setItem('@aura_theme', themeName);
      AsyncStorage.setItem('@aura_username', userName);
    }
  }, [messages, aiMessages, themeName, userName, isLoaded]);

  // ── Otomatik Kaydırma ─────────────────────────────────────────────
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // ── Gemini AI İstek Fonksiyonu ───────────────────────────────────
  const callGemini = async (userText) => {
    setIsTyping(true);
    scrollToBottom();

    try {
      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Sen Aura Chat'in premium AI asistanısın. Kısa, havalı ve yardımsever cevaplar verirsin. Kullanıcının adı ${userName}. Soru: ${userText}` }]
          }]
        })
      });

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, şu an cevap veremiyorum.";

      const aiMessage = {
        type: "MessageBubble",
        props: {
          text: aiResponseText,
          sender: "aura",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };

      setAiMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Hatası:", error);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  // ── Handler Haritası ──────────────────────────────────────────────
  const handlers = {
    handleSend: () => {
      if (inputText.trim() === "") return;
      const newMessage = {
        type: "MessageBubble",
        props: {
          text: inputText,
          sender: "me",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText("");
      scrollToBottom();
    },
    handleSendAI: () => {
      if (inputText.trim() === "") return;
      const newMessage = {
        type: "MessageBubble",
        props: {
          text: inputText,
          sender: "me",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
      setAiMessages(prev => [...prev, newMessage]);
      const currentText = inputText;
      setInputText("");
      callGemini(currentText);
    },
    onChangeText: (text) => setInputText(text),
    setTheme: (name) => setThemeName(name),
    setScreen: (name) => {
      setCurrentScreen(name);
      setInputText("");
    },
    setUserName: (name) => setUserName(name)
  };

  // ── Render Mantığı ────────────────────────────────────────────────
  const screenData = screens[currentScreen] || screens.main;
  
  let finalNodes = screenData.nodes.map(node => {
    if (node.type === "ProfileHeader") {
      return { ...node, props: { ...node.props, name: userName, username: "@aura_user" } };
    }
    if (node.type === "HeaderTabs") {
      return { ...node, props: { ...node.props, active: currentScreen === 'ai_chat' ? 'ai_chat' : 'main' } };
    }
    if (node.type === "TypingIndicator") {
      return { ...node, props: { ...node.props, isTyping } };
    }
    return node;
  });

  // Mesajları ilgili ekrana enjekte et
  if (currentScreen === 'chat') {
    const inputIndex = finalNodes.findIndex(n => n.type === 'ChatInput');
    if (inputIndex > -1) {
      finalNodes.splice(inputIndex, 0, ...messages);
    }
  } else if (currentScreen === 'ai_chat') {
    const inputIndex = finalNodes.findIndex(n => n.type === 'ChatInput');
    if (inputIndex > -1) {
      finalNodes.splice(inputIndex, 0, ...aiMessages);
    }
  }

  // Scroll içinde ve dışında basılacakları ayır
  const inputNode = finalNodes.find(node => node.type === "ChatInput");
  const navNode = finalNodes.find(node => node.type === "BottomNav");
  const fabNode = finalNodes.find(node => node.type === "FAB");
  const scrollNodes = finalNodes.filter(node => node.type !== "ChatInput" && node.type !== "BottomNav" && node.type !== "FAB");

  if (!isLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: activeTheme.bg }]} edges={['top', 'left', 'right']}>
        <StatusBar barStyle={activeTheme.statusBar} backgroundColor={activeTheme.bg} />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollRef}
              style={styles.scroll}
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={scrollToBottom}
            >
              {scrollNodes.map((node, i) => renderNode(node, i, handlers, activeTheme))}
            </ScrollView>

            {fabNode && renderNode(fabNode, "fab-fixed", handlers, activeTheme)}

            {inputNode && renderNode({
              ...inputNode,
              props: { 
                ...inputNode.props, 
                value: inputText, 
                onChangeText: handlers.onChangeText,
                onSend: inputNode.onSend === 'handleSendAI' ? handlers.handleSendAI : handlers.handleSend 
              }
            }, "input-fixed", handlers, activeTheme)}

            {navNode && renderNode(navNode, "nav-fixed", handlers, activeTheme)}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 120, // Daha fazla boşluk (Fixed FAB ve Nav için)
  },
});
