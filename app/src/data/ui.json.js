export const screen = {
  id: "chat-room",
  title: "Chat ile Naim",
  nodes: [
    {
      type: "Header",
      props: {
        text: "🏋️ Naim Chat",
        subtitle: "Online - SDUI v2"
      }
    },
    {
      type: "Spacer",
      props: { height: 16 }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Selam! Uygulama nasıl gidiyor?",
        sender: "them",
        time: "11:45"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Harika! İkinci iterasyona geçtik bile. Mesaj balonları JSON'dan geliyor.",
        sender: "me",
        time: "11:46"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Süper, peki bu veriler dinamik mi?",
        sender: "them",
        time: "11:47"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Evet, şimdi fetch simulation ekliyoruz.",
        sender: "me",
        time: "11:48"
      }
    },
    {
      type: "Spacer",
      props: { height: 80 }
    },
    {
      type: "ChatInput",
      props: {
        placeholder: "Mesajınızı yazın...",
      },
      onSend: "handleSend"
    }
  ]
};
