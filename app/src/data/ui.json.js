export const screens = {
  main: {
    id: "main-list",
    title: "Aura",
    nodes: [
      {
        type: "Header",
        props: {
          text: "Aura",
          subtitle: "Mesajlar"
        }
      },
      {
        type: "HeaderTabs",
        props: {
          tabs: [
            { id: "main", label: "Sohbetler" },
            { id: "ai_chat", label: "Aura AI" }
          ],
          active: "main"
        }
      },
      {
        type: "ChatListItem",
        props: {
          name: "Arşiv",
          lastMessage: "Eski sohbetler burada saklanır.",
          time: "Dün",
          screen: "archive"
        }
      },
      {
        type: "ChatListItem",
        props: {
          name: "Asistan Aura",
          lastMessage: "Merhaba! Bugün sana nasıl yardımcı olabilirim?",
          time: "17:59",
          unread: 1,
          screen: "chat"
        }
      },
      {
        type: "Spacer",
        props: { height: 200 }
      },
      {
        type: "FAB",
        props: { icon: "+" }
      },
      {
        type: "BottomNav",
        props: { active: "chats" }
      }
    ]
  },
  chat: {
    id: "chat-room",
    title: "Aura Chat",
    nodes: [
      {
        type: "ChatHeader",
        props: {
          name: "Asistan Aura",
          status: "Çevrimiçi"
        }
      },
      {
        type: "ChatInput",
        props: {
          placeholder: "Aura ile konuş...",
        },
        onSend: "handleSend"
      }
    ]
  },
  ai_chat: {
    id: "ai-aura-room",
    title: "Aura AI",
    nodes: [
      {
        type: "ChatHeader",
        props: {
          name: "Aura AI",
          status: "Zekâ Devrede (Gemini)"
        }
      },
      {
        type: "TypingIndicator",
        props: {
          name: "Aura"
        }
      },
      {
        type: "ChatInput",
        props: {
          placeholder: "Zekice bir şeyler sor...",
        },
        onSend: "handleSendAI"
      },
      {
        type: "BottomNav",
        props: { active: "chats" }
      }
    ]
  },
  archive: {
    id: "archive-screen",
    title: "Arşiv",
    nodes: [
      {
        type: "ChatHeader",
        props: {
          name: "Arşivlenmiş Sohbetler",
          status: "Sadece Okunabilir"
        }
      },
      {
        type: "EmptyState",
        props: {
          title: "Henüz arşivlenmiş sohbet yok",
          message: "Sohbetlerini düzenli tutmak için buraya taşıyabilirsin."
        }
      }
    ]
  },
  settings: {
    id: "settings-screen",
    title: "Ayarlar",
    nodes: [
      {
        type: "ProfileHeader",
        props: {
          name: "Misafir Kullanıcı",
          username: "@aura_fan",
          status: "Müsait"
        }
      },
      {
        type: "SettingItem",
        props: {
          icon: "👤",
          label: "Hesap Bilgileri",
          screen: "profile_edit"
        }
      },
      {
        type: "SettingItem",
        props: {
          icon: "📦",
          label: "Arşivlenmiş Sohbetler",
          screen: "archive"
        }
      },
      {
        type: "Spacer",
        props: { height: 24 }
      },
      {
        type: "Card",
        props: {
          title: "Görünüm ve Tema",
          body: "Uygulamanın rengini 'Aura Ethos' tasarım sistemine göre ayarla."
        }
      },
      {
        type: "ThemeSelector",
        props: {}
      },
      {
        type: "BottomNav",
        props: { active: "settings" }
      }
    ]
  }
};
