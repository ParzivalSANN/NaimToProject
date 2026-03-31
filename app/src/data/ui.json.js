export const screen = {
  id: "home",
  title: "Ana Ekran",
  nodes: [
    {
      type: "Header",
      props: {
        text: "🏋️ NAIM Chat",
        subtitle: "Server-Driven UI — İterasyon 1"
      }
    },
    {
      type: "Spacer",
      props: { height: 20 }
    },
    {
      type: "Text",
      props: {
        text: "Bu metin doğrudan JSON'dan geliyor.",
        align: "center"
      }
    },
    {
      type: "Divider"
    },
    {
      type: "Card",
      props: {
        title: "📦 JSON Renderer Çalışıyor",
        body: "ui.json'daki her node bu bileşen kataloğu aracılığıyla ekrana çiziliyor."
      }
    },
    {
      type: "Spacer",
      props: { height: 12 }
    },
    {
      type: "Button",
      props: {
        label: "Test Butonu",
        variant: "primary"
      },
      onPress: "handleTest"
    },
    {
      type: "Button",
      props: {
        label: "İkincil Buton",
        variant: "secondary"
      }
    }
  ]
};
