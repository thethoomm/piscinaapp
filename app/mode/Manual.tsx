import { View, H2, XStack } from 'tamagui'
import MyForm from '../components/MyForm'
import { ChevronLeft } from '@tamagui/lucide-icons'

export default function Manual() {
  return (
    <View flex={1} alignItems='center' paddingBottom={"$4"}>
      <MyForm />
    </View>
  )
}