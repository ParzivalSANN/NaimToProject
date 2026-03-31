import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Renderer & Veri ─────────────────────────────────────────────────
import { renderNode } from './src/renderer/components';
import { screens } from './src/data/ui.json';

// ── Tema Tanımları ──────────────────────────────────────────────────
const THEMES = {
  aura: { bg: '#F8F9FA', primary: '#630ED4', secondary: '#A855F7', text: '#191C1D', bubbleThem: '#FFFFFF', bubbleThemText: '#191C1D', statusBar: 'dark-content' },
  midnight: { bg: '#0d0d1a', primary: '#00f2f2', secondary: '#00a0a0', text: '#e0e0ff', bubbleThem: '#1e1e3a', bubbleThemText: '#e0e0ff', statusBar: 'light-content' },
  noir: { bg: '#000000', primary: '#FFFFFF', secondary: '#888888', text: '#FFFFFF', bubbleThem: '#1a1a1a', bubbleThemText: '#FFFFFF', statusBar: 'light-content' }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [themeName, setThemeName] = useState("aura");
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef(null);

  const activeTheme = THEMES[themeName] || THEMES.aura;

  // ── Veri Yükleme (Persistence) ────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('@aura_messages');
        const savedTheme = await AsyncStorage.getItem('@aura_theme');
        if (savedMessages) setMessages(JSON.parse(savedMessages));
        if (savedTheme) setThemeName(savedTheme);
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
      AsyncStorage.setItem('@aura_theme', themeName);
    }
  }, [messages, themeName, isLoaded]);

  // ── Otomatik Kaydırma ─────────────────────────────────────────────
  const scrollToBottom = () => {
    if (currentScreen === 'chat') {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
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
    onChangeText: (text) => setInputText(text),
    setTheme: (name) => setThemeName(name),
    setScreen: (name) => setCurrentScreen(name)
  };

  // ── Render Mantığı ────────────────────────────────────────────────
  const screenData = screens[currentScreen] || screens.main;
  
  // Chat ekranı için özel mesaj listesi birleştirme
  let finalNodes = [...screenData.nodes];
  if (currentScreen === 'chat') {
    const inputIndex = finalNodes.findIndex(n => n.type === 'ChatInput');
    if (inputIndex > -1) {
      finalNodes.splice(inputIndex, 0, ...messages);
    }
  }

  const listNodes = finalNodes.filter(node => node.type !== "ChatInput" && node.type !== "BottomNav");
  const inputNode = finalNodes.find(node => node.type === "ChatInput");
  const navNode = finalNodes.find(node => node.type === "BottomNav");

  if (!isLoaded) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: activeTheme.bg }]}>
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
            {listNodes.map((node, i) => renderNode(node, i, handlers, activeTheme))}
          </ScrollView>

          {inputNode && renderNode({
            ...inputNode,
            props: { 
              ...inputNode.props, 
              value: inputText, 
              onChangeText: handlers.onChangeText,
              onSend: handlers.handleSend 
            }
          }, "input-fixed", handlers, activeTheme)}

          {navNode && renderNode(navNode, "nav-fixed", handlers, activeTheme)}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    paddingBottom: 100, // BottomNav için boşluk
  },
});
