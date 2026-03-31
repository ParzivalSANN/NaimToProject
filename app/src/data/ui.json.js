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
      type: "Spacer",
      props: { height: 24 }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Aura Chat'e hoş geldin! Temiz ve ferah bir tasarım seni bekliyor.",
        sender: "them",
        time: "17:10"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Mor ve beyaz tonları harika duruyor. Tasarım sistemine 'The Ethereal Conduit' adını verdik.",
        sender: "me",
        time: "17:11"
      }
    },
    {
      type: "MessageBubble",
      props: {
        text: "Gerçekten de öyle. Akıcı ve şık bir deneyim için her şey hazır.",
        sender: "them",
        time: "17:12"
      }
    },
    {
      type: "Spacer",
      props: { height: 80 }
    },
    {
      type: "ChatInput",
      props: {
        placeholder: "Aura ile bir şeyler yaz...",
      },
      onSend: "handleSend"
    }
  ]
};
