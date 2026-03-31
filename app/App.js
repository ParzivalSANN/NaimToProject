import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';

import { renderNode } from './src/renderer/components';
import { screen }     from './src/data/ui.json';

const handlers = {
  handleTest: () => Alert.alert('🏋️ NAIM', 'JSON renderer çalışıyor!'),
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d1a" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {screen.nodes.map((node, i) => renderNode(node, i, handlers))}
      </ScrollView>
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
    paddingBottom: 32,
  },
});
