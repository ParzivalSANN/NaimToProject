import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity
} from 'react-native';

// ── Renderer & Veri ─────────────────────────────────────────────────
import { renderNode } from './src/renderer/components';
import { screen as initialScreen } from './src/data/ui.json';

// ── Tema Tanımları ──────────────────────────────────────────────────
const THEMES = {
  aura: {
    bg: '#F8F9FA',
    primary: '#630ED4',
    secondary: '#A855F7',
    text: '#191C1D',
    bubbleThem: '#FFFFFF',
    bubbleThemText: '#191C1D',
    statusBar: 'dark-content'
  },
  midnight: {
    bg: '#0d0d1a',
    primary: '#00f2f2',
    secondary: '#00a0a0',
    text: '#e0e0ff',
    bubbleThem: '#1e1e3a',
    bubbleThemText: '#e0e0ff',
    statusBar: 'light-content'
  },
  noir: {
    bg: '#000000',
    primary: '#FFFFFF',
    secondary: '#888888',
    text: '#FFFFFF',
    bubbleThem: '#1a1a1a',
    bubbleThemText: '#FFFFFF',
    statusBar: 'light-content'
  }
};

export default function App() {
  const [screen, setScreen] = useState(initialScreen);
  const [inputText, setInputText] = useState("");
  const [themeName, setThemeName] = useState("aura");
  const scrollRef = useRef(null);

  const activeTheme = THEMES[themeName];

  // ── Otomatik Kaydırma ─────────────────────────────────────────────
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [screen.nodes.length]);

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

      const updatedNodes = [...screen.nodes];
      const inputIndex = updatedNodes.findIndex(node => node.type === "ChatInput");
      if (inputIndex > -1) {
        updatedNodes.splice(inputIndex, 0, newMessage);
      } else {
        updatedNodes.push(newMessage);
      }
      
      setScreen({ ...screen, nodes: updatedNodes });
      setInputText("");
      scrollToBottom();
    },
    onChangeText: (text) => setInputText(text),
    setTheme: (name) => setThemeName(name)
  };

  const listNodes = screen.nodes.filter(node => node.type !== "ChatInput");
  const inputNode = screen.nodes.find(node => node.type === "ChatInput");

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
    paddingBottom: 20,
  },
});
