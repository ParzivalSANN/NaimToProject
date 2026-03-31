import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const COMPONENT_MAP = {

  Header: ({ text, subtitle }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
      {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
    </View>
  ),

  Text: ({ text, align }) => (
    <Text style={[styles.bodyText, align && { textAlign: align }]}>{text}</Text>
  ),

  Spacer: ({ height = 16 }) => (
    <View style={{ height }} />
  ),

  Divider: () => (
    <View style={styles.divider} />
  ),

  Button: ({ label, variant = 'primary', onPress }) => (
    <TouchableOpacity
      style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, variant === 'secondary' && styles.buttonTextSecondary]}>
        {label}
      </Text>
    </TouchableOpacity>
  ),

  Card: ({ title, body }) => (
    <View style={styles.card}>
      {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
      {body  ? <Text style={styles.cardBody}>{body}</Text>   : null}
    </View>
  ),

  MessageBubble: ({ text, sender, time }) => (
    <View style={[
      styles.bubbleContainer,
      sender === 'me' ? styles.bubbleMeContainer : styles.bubbleThemContainer
    ]}>
      <View style={[
        styles.bubble,
        sender === 'me' ? styles.bubbleMe : styles.bubbleThem
      ]}>
        <Text style={[
          styles.bubbleText,
          sender === 'me' ? styles.bubbleMeText : styles.bubbleThemText
        ]}>{text}</Text>
        {time ? <Text style={styles.bubbleTime}>{time}</Text> : null}
      </View>
    </View>
  ),

  ChatInput: ({ placeholder, value, onChangeText, onSend }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.chatInput}
        placeholder={placeholder || "Type a message..."}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        multiline={false}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  ),

  Input: ({ placeholder, value, onChangeText }) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#888"
    />
  ),
};

export function renderNode(node, index, handlers = {}) {
  const Component = COMPONENT_MAP[node.type];

  if (!Component) {
    return (
      <View key={index} style={styles.unknownNode}>
        <Text style={styles.unknownText}>⚠️ Bilinmeyen tip: "{node.type}"</Text>
      </View>
    );
  }

  const eventProps = {};
  if (node.onPress && handlers[node.onPress]) {
    eventProps.onPress = handlers[node.onPress];
  }

  return (
    <Component key={`${node.type}-${index}`} {...node.props} {...eventProps} />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    // No-line rule: Boundaries defined through tonal shifts or shadows
    shadowColor: '#732EE4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#191C1D',
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    color: '#4A4455',
    marginTop: 2,
    fontWeight: '500',
    opacity: 0.7,
  },
  bodyText: {
    fontSize: 16,
    color: '#191C1D',
    lineHeight: 24,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E7E8E9',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#630ED4', // Aura Primary
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#630ED4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#630ED4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#630ED4',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191C1D',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 15,
    color: '#4A4455',
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginVertical: 8,
    color: '#191C1D',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E7E8E9',
  },
  unknownNode: {
    backgroundColor: '#FFF2F2',
    padding: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
  },
  unknownText: {
    color: '#BA1A1A',
    fontSize: 13,
    fontWeight: '600',
  },
  // ── Aura Chat Bileşen Stilleri (White Tones) ─────────────────────
  bubbleContainer: {
    width: '100%',
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  bubbleMeContainer: {
    alignItems: 'flex-end',
  },
  bubbleThemContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bubbleMe: {
    backgroundColor: '#630ED4', // Aura Primary Gradient base
    borderBottomRightRadius: 6,
    shadowColor: '#630ED4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleThem: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bubbleMeText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bubbleThemText: {
    color: '#191C1D',
  },
  bubbleTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E7E8E9',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: '#191C1D',
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#732EE4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  sendButton: {
    backgroundColor: '#630ED4',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#630ED4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
