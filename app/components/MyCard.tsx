import { TouchableOpacity } from 'react-native'
import { Card, H4, View } from 'tamagui'
import { Hand, Bot } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'

type Props = {
  name: string
}

export default function MyCard({ name }: Props) {

  return (
    <Link href={name === "manual" ? "/mode/Manual" : "/mode/Automatic"} asChild>
      <TouchableOpacity activeOpacity={0.7} >
        <Card width={"$18"} height={"$18"} bg={name === "manual" ? "$blue9Dark" : "$orange9Dark"}>
          <Card.Header alignItems='center'>
            <H4>
              {
                name === "manual" ? "Manual" : "Automático"
              }
            </H4>
          </Card.Header>
          <View flex={1} alignItems='center'>
            {
              name === "manual" ? <Hand size={"$10"} /> : <Bot size={"$10"} />
            }
          </View>
          <Card.Footer></Card.Footer>
          <Card.Background borderRadius={"$2"} ></Card.Background>
        </Card>
      </TouchableOpacity>
    </Link>
  )
}
