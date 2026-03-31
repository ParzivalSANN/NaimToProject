import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native';

// ── Renderer & Veri ─────────────────────────────────────────────────
import { renderNode } from './src/renderer/components';
import { screen as initialScreen } from './src/data/ui.json';

export default function App() {
  const [screen, setScreen] = useState(initialScreen);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ── Backend Simülasyonu (Fetch) ──────────────────────────────────
  useEffect(() => {
    const fetchUI = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setScreen(initialScreen);
        setIsLoading(false);
      }, 500);
    };
    fetchUI();
  }, []);

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
      // Mesajları ChatInput'dan bağımsız olarak listenin sonuna ekle
      const inputIndex = updatedNodes.findIndex(node => node.type === "ChatInput");
      if (inputIndex > -1) {
        updatedNodes.splice(inputIndex, 0, newMessage);
      } else {
        updatedNodes.push(newMessage);
      }
      
      setScreen({ ...screen, nodes: updatedNodes });
      setInputText("");
    },
    onChangeText: (text) => setInputText(text)
  };

  // Liste ve Input düğümlerini ayır (Layout için)
  const listNodes = screen.nodes.filter(node => node.type !== "ChatInput");
  const inputNode = screen.nodes.find(node => node.type === "ChatInput");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            {listNodes.map((node, i) => renderNode(node, i, handlers))}
          </ScrollView>

          {/* Input alanını ScrollView'un dışına, en alta sabitledik */}
          {inputNode && renderNode({
            ...inputNode,
            props: { 
              ...inputNode.props, 
              value: inputText, 
              onChangeText: handlers.onChangeText,
              onSend: handlers.handleSend 
            }
          }, "input-fixed")}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
});
