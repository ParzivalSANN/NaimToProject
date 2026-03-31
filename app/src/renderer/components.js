import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const COMPONENT_MAP = {

  Header: ({ text, subtitle, theme }) => (
    <View style={[styles.header, { backgroundColor: theme.bg }]}>
      <Text style={[styles.headerText, { color: theme.text }]}>{text}</Text>
      {subtitle ? <Text style={[styles.subtitleText, { color: theme.text, opacity: 0.7 }]}>{subtitle}</Text> : null}
    </View>
  ),

  Text: ({ text, align, theme }) => (
    <Text style={[styles.bodyText, align && { textAlign: align }, { color: theme.text }]}>{text}</Text>
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

  Card: ({ title, body, theme }) => (
    <View style={[styles.card, { backgroundColor: theme.bg === '#FFFFFF' ? '#F8F9FA' : theme.bubbleThem }]}>
      {title ? <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text> : null}
      {body  ? <Text style={[styles.cardBody, { color: theme.text, opacity: 0.8 }]}>{body}</Text>   : null}
    </View>
  ),

  MessageBubble: ({ text, sender, time, theme }) => (
    <View style={[
      styles.bubbleContainer,
      sender === 'me' ? styles.bubbleMeContainer : styles.bubbleThemContainer
    ]}>
      <View style={[
        styles.bubble,
        sender === 'me' 
          ? { backgroundColor: theme.primary, borderBottomRightRadius: 6 } 
          : { backgroundColor: theme.bubbleThem, borderBottomLeftRadius: 6 }
      ]}>
        <Text style={[
          styles.bubbleText,
          sender === 'me' ? { color: '#FFF' } : { color: theme.bubbleThemText }
        ]}>{text}</Text>
        {time ? <Text style={[styles.bubbleTime, { color: sender === 'me' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }]}>{time}</Text> : null}
      </View>
    </View>
  ),

  ChatInput: ({ placeholder, value, onChangeText, onSend, theme }) => (
    <View style={[styles.inputContainer, { backgroundColor: theme.bg, borderTopColor: theme.bg === '#000000' ? '#333' : '#E7E8E9' }]}>
      <TextInput
        style={[styles.chatInput, { backgroundColor: theme.bubbleThem, color: theme.text }]}
        placeholder={placeholder || "Type a message..."}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        multiline={false}
      />
      <TouchableOpacity 
        style={[styles.sendButton, { backgroundColor: theme.primary }]} 
        onPress={onSend}
        activeOpacity={0.7}
      >
        <Text style={styles.sendButtonText}>↑</Text>
      </TouchableOpacity>
    </View>
  ),

  ThemeSelector: ({ handlers }) => (
    <View style={styles.themeSelector}>
      {['aura', 'midnight', 'noir'].map(name => (
        <TouchableOpacity 
          key={name}
          onPress={() => handlers.setTheme(name)}
          style={[
            styles.themeCircle, 
            { backgroundColor: name === 'aura' ? '#630ED4' : name === 'midnight' ? '#00f2f2' : '#333' }
          ]}
        />
      ))}
    </View>
  ),

  ChatHeader: ({ name, status, theme, handlers }) => (
    <View style={[styles.chatHeader, { backgroundColor: theme.bg }]}>
      <TouchableOpacity onPress={() => handlers.setScreen("main")} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: theme.primary }]}>←</Text>
      </TouchableOpacity>
      <View style={styles.avatarSmall} />
      <View style={styles.headerInfo}>
        <Text style={[styles.chatHeaderName, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.chatHeaderStatus, { color: theme.primary }]}>{status}</Text>
      </View>
    </View>
  ),

  ChatListItem: ({ name, lastMessage, time, unread, screen, theme, handlers }) => (
    <TouchableOpacity 
      style={[styles.chatListItem, { backgroundColor: theme.bg }]}
      onPress={() => handlers.setScreen(screen || "chat")}
      activeOpacity={0.6}
    >
      <View style={[styles.avatar, { backgroundColor: theme.bubbleThem }]} />
      <View style={styles.chatListItemContent}>
        <View style={styles.chatListItemRow}>
          <Text style={[styles.chatListItemName, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.chatListItemTime, { color: theme.text, opacity: 0.5 }]}>{time}</Text>
        </View>
        <View style={styles.chatListItemRow}>
          <Text style={[styles.chatListItemLastMsg, { color: theme.text, opacity: 0.6 }]} numberOfLines={1}>
            {lastMessage}
          </Text>
          {unread ? (
            <View style={[styles.unreadBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.unreadText}>{unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  ),

  BottomNav: ({ active, theme, handlers }) => (
    <View style={[styles.bottomNav, { backgroundColor: theme.bg, borderTopColor: theme.bubbleThem }]}>
      {[
        { id: "main", label: "Mesajlar", icon: "💬" },
        { id: "status", label: "Durum", icon: "⭕" },
        { id: "settings", label: "Ayarlar", icon: "⚙️" }
      ].map(item => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.navItem} 
          onPress={() => handlers.setScreen(item.id)}
        >
          <Text style={[styles.navIcon, active === item.id || (item.id === 'main' && active === 'chats') ? { opacity: 1 } : { opacity: 0.4 }]}>{item.icon}</Text>
          <Text style={[styles.navLabel, { color: theme.text }, active === item.id || (item.id === 'main' && active === 'chats') ? { fontWeight: '700' } : { opacity: 0.5 }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ),

  FAB: ({ icon, theme }) => (
    <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary }]}>
      <Text style={styles.fabText}>{icon}</Text>
    </TouchableOpacity>
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

export function renderNode(node, index, handlers = {}, theme = {}) {
  const Component = COMPONENT_MAP[node.type];

  if (!Component) {
    return (
      <View key={index} style={styles.unknownNode}>
        <Text style={styles.unknownText}>⚠️ Bilinmeyen tip: "{node.type}"</Text>
      </View>
    );
  }

  return (
    <Component key={`${node.type}-${index}`} {...node.props} index={index} handlers={handlers} theme={theme} />
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
    fontSize: 20, // Reduced from text to icon size
  },
  themeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  themeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  // ── Aura Chat İterasyon 5 Ek Stiller ─────────────────────
  chatHeader: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    paddingRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '700',
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E7E8E9',
  },
  headerInfo: {
    marginLeft: 12,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '700',
  },
  chatHeaderStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  chatListItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  chatListItemContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  chatListItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatListItemName: {
    fontSize: 17,
    fontWeight: '700',
  },
  chatListItemTime: {
    fontSize: 12,
  },
  chatListItemLastMsg: {
    fontSize: 14,
    marginTop: 4,
    flex: 1,
    paddingRight: 10,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 25, // Safer for notch
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 22,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '300',
  },
});
