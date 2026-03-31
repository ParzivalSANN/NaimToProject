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
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a2e',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e0e0ff',
  },
  subtitleText: {
    fontSize: 13,
    color: '#8888bb',
    marginTop: 2,
  },
  bodyText: {
    fontSize: 15,
    color: '#ccccdd',
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#5c5cff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5c5cff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonTextSecondary: {
    color: '#5c5cff',
  },
  card: {
    backgroundColor: '#1e1e3a',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#2a2a5a',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e0e0ff',
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 14,
    color: '#aaaacc',
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    color: '#e0e0ff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#3a3a6a',
  },
  unknownNode: {
    backgroundColor: '#3a1a1a',
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 6,
  },
  unknownText: {
    color: '#ff8888',
    fontSize: 12,
  },
});
