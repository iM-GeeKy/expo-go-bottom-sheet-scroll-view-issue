//#region imports
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useRef, useMemo, useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Text, View, StyleSheet, Button } from 'react-native';
//#endregion

function SomeScreen() {
  // hooks
  const sheetRef = useRef<BottomSheet | undefined>();

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
        <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
        <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
        <Button title="Close" onPress={() => handleClosePress()} />
        <BottomSheet
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            {data.map(renderItem)}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default SomeScreen;