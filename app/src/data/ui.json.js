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
        type: "ChatListItem",
        props: {
          name: "Arşiv",
          lastMessage: "Eski sohbetler burada saklanır.",
          time: "Dün",
          screen: "archive"
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
      // Mesajlar App.js tarafından state'den basılacak
      {
        type: "ChatInput",
        props: {
          placeholder: "Aura ile konuş...",
        },
        onSend: "handleSend"
      }
    ]
  },
  settings: {
    id: "settings-screen",
    title: "Ayarlar",
    nodes: [
      {
        type: "Header",
        props: {
          text: "Ayarlar",
          subtitle: "Özelleştirme ve Profil"
        }
      },
      {
        type: "Card",
        props: {
          title: "Tema Seçimi",
          body: "Uygulamanın görünümünü buradan değiştirebilirsin."
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
