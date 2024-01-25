import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "",
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
      <Tabs.Screen
        name='ModeSelector'
        options={{
          title: '',
          tabBarStyle: {
            display: 'none'
          }
        }}
      />
    </Tabs>
  )
}
