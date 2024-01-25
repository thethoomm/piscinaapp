import { View, YStack, H3 } from 'tamagui';
import MyCard from '../components/MyCard';

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems='center' justifyContent='center'>
      <YStack gap={"$8"} alignItems='center'>
        <H3 fontWeight={"800"}>Selecione o modo</H3>
        <MyCard name="automatic" />
        <MyCard name="manual" />
      </YStack>
    </View>
  );
}
