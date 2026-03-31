export const screen = {
  id: "chat-room-aura",
  title: "Aura Chat",
  nodes: [
    {
      type: "Header",
      props: {
        text: "Aura Chat",
        subtitle: "Online - The Ethereal Conduit"
      }
    },
    {
      type: "ThemeSelector",
      props: {
        themes: ["aura", "midnight", "noir"]
      }
    },
    {
      type: "Spacer",
      props: { height: 12 }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Aura Chat'e hoş geldin! Temaları yukarıdan değiştirebilirsin.",
        sender: "them",
        time: "17:15"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Süper! Midnight ve Noir temaları da harika görünüyor.",
        sender: "me",
        time: "17:16"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Mesaj gönderince artık liste otomatik olarak aşağı kayıyor.",
        sender: "them",
        time: "17:17"
      }
    },
    {
      type: "Spacer",
      props: { height: 80 }
    },
    {
      type: "ChatInput",
      props: {
        placeholder: "Bir mesaj yaz...",
      },
      onSend: "handleSend"
    }
  ]
};
