import { useEffect, useState } from 'react';
import { Fingerprint, ScanFace, AlertTriangle } from '@tamagui/lucide-icons'
import { Text, View, Input, Label, Button, YStack, H2, Paragraph, Separator, H6 } from 'tamagui'
import { Platform, useColorScheme } from 'react-native'
import { defaultUser } from '../data/users';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication'

type User = {
  user: string;
}


export default function Login() {

  const colorScheme = useColorScheme()
  const router = useRouter()
  const [localAuth, setLocalAuth] = useState<boolean>(true)

  const [credentials, setCredentials] = useState<User>({
    user: "",
  })

  const [error, setError] = useState<string>("")
  const [displayAlert, setDisplayAlert] = useState<boolean>(false)

  useEffect(() => {
    console.log("err:" + error)
  }, [error])

  const verifyCompatibility = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    console.log("Compatible: ", compatible)

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]))
  }

  const handleAuthentication = async () => {
    const isBiometric = await LocalAuthentication.isEnrolledAsync()
    console.log(isBiometric)

    if (!isBiometric) {
      setLocalAuth(true)
    } else {
      setLocalAuth(false)
    }

    const message = Platform.OS == "android" ? "Login com biometria" : "Login com Face ID"

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: message,
      fallbackLabel: "Biometria não reconhecida"
    })
    console.log(auth)

    if (auth.success) {
      return router.navigate("/(tabs)/ModeSelector")
    } else {
      return false
    }
  }

  useEffect(() => {
    verifyCompatibility()
    handleAuthentication()
  }, [])

  const handleLogin = async () => {

    if (credentials.user === '') {
      setError('Usuário é obrigatório')
      setDisplayAlert(true)
      return
    }
    setDisplayAlert(false)

    if (credentials.user === defaultUser.user) {
      return router.navigate("/(tabs)/ModeSelector")
    }

    setError("Usuário inválido")
    setDisplayAlert(true)
    return
  }


  return (
    <View flex={1} alignItems="center" paddingVertical={"$12"} justifyContent='center'>
      <YStack alignItems='center'>
        <YStack marginBottom={"$10"} alignItems='center'>
          <H2>Entre na sua conta</H2>
        </YStack>

        <YStack>
          <Label htmlFor='user'>Código de usuário</Label>
          <Input
            id='user'
            size={"$4"}
            width={"$20"}
            value={credentials.user}
            autoComplete='username'
            onChangeText={(text) => setCredentials((cd) => ({ ...cd, user: text }))}
          />
          <Paragraph color={"$gray10Dark"} fontSize={"$2"} fontStyle='italic'>Digite seu código</Paragraph>
        </YStack>

        <YStack space marginTop={"$6"}>

          {
            displayAlert ?
              <View flexDirection='row' gap={"$3"} borderColor={"$red8Light"} alignItems='center' borderWidth={"$1"} padding={"$3"} borderRadius={"$4"}>
                <AlertTriangle color={"$red8Light"} />
                <Text fontSize={"$4"} color={"$red8Light"}>{error}</Text>
              </View>
              :
              ""
          }

          <Button
            width={"$20"}
            bg={"$orange10Dark"}
            color={colorScheme === "light" ? "$orange1Light" : "$orange1Light" }
            onPress={() => handleLogin()}
          >Entrar</Button>

          <Separator alignSelf="stretch" marginVertical={"$4"} />

          <Button size={"$4"} borderWidth={"$1"} borderColor={localAuth ? "$gray10Dark" : "$blue9Dark"} disabled={localAuth} variant='outlined' width={"$20"} >
            {
              Platform.OS === 'android' ?
                <Button onPress={() => handleAuthentication()} flexDirection='row' justifyContent='center'>
                  <Fingerprint color={localAuth ? "$gray10Dark" : "$blue9Dark"} />
                  <Text color={localAuth ? "$gray10Dark" : "$blue9Dark"} marginStart={"$3"} >Biometria</Text>
                </Button>
                :
                <Button onPress={() => handleAuthentication()} flexDirection='row' justifyContent='center'>
                  <ScanFace color={localAuth ? "$gray10Dark" : "$blue9Dark"} />
                  <Text color={localAuth ? "$gray10Dark" : "$blue9Dark"} marginStart={"$3"} >Face ID</Text>
                </Button>
            }
          </Button>
        </YStack>
      </YStack>
    </View>
  )
}
