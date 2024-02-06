import React, { useState, useEffect } from 'react';
import { Check, Plus } from '@tamagui/lucide-icons';
import { Input, Form, Button, YStack, Spinner, XStack, View, Label, ScrollView, H2 } from 'tamagui';
import axios from "axios"
import { RefreshControl } from 'react-native';

type InputGroupProps = {
  children: React.ReactNode;
};

const InputGroup = ({ children }: InputGroupProps) => {
  return (
    <View flex={1} flexDirection='column' alignItems='flex-start' marginBottom={"$3.5"} justifyContent='space-between'>
      {children}
    </View>
  );
};

export default function MyForm() {
  const delayTime = 15000
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  const [readyToSend, setReadyToSend] = useState<boolean>(false)
  const [sensorData, setSensorData] = useState({
    temperaturaMax: "",
    temperaturaMin: "",

    salinidadeMax: "",
    salinidadeMin: "",

    orpMax: "",
    orpMin: "",

    condutividadeMax: "",
    condutividadeMin: "",

    oxigenioMax: "",
    oxigenioMin: "",

    pHMax: "",
    pHMin: "",

  })

  const urlToThingspeak = (value: string, fieldNum: number, apiKey: string) => {
    return `https://api.thingspeak.com/update?api_key=${apiKey}&field${fieldNum}=${value}`
  }

  const sendToThingspeak = async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (const [field, value] of Object.entries(sensorData)) {
      await delay(delayTime)
      console.log("delay ", delayTime)
      console.log("FIELD", field)
      console.log("VALUE", value)
      switch (field) {
        case "orpMax":
          console.log(value) 
          const r = await axios.get(urlToThingspeak(value, 7, '23YC8RS6DRHAJX93'))
          console.log(r.status)
          break
        case "orpMin":
          console.log(value)
          const k = await axios.get(urlToThingspeak(value, 8, '23YC8RS6DRHAJX93'))
          console.log(k.status)
          break
        case "pHMax":
          console.log(value)
          const j = await  axios.get(urlToThingspeak(value, 3, '23YC8RS6DRHAJX93'))
          console.log(j.status)
          break
        case "pHMin":
          console.log(value)
          const i = await axios.get(urlToThingspeak(value, 4, '23YC8RS6DRHAJX93'))
          console.log(i.status)
          break
        case "temperaturaMax":
          console.log(value)
          const h = await axios.get(urlToThingspeak(value, 1, '23YC8RS6DRHAJX93'))
          console.log(h.status)
          break
        case "temperaturaMin":
          console.log(value)
          const g = await axios.get(urlToThingspeak(value, 2, '23YC8RS6DRHAJX93'))
          console.log(g.status)
          break
        case "condutividadeMax":
          console.log(value)
          const f = await axios.get(urlToThingspeak(value, 1, 'OKPJYMR8BY4DS76U'))
          console.log(f.status)
          break
        case "condutividadeMin":
          console.log(value)
          const e = await axios.get(urlToThingspeak(value, 2, 'OKPJYMR8BY4DS76U'))
          console.log(e.status)
          break
        case "salinidadeMax":
          console.log(value)
          const d = await axios.get(urlToThingspeak(value, 3, 'OKPJYMR8BY4DS76U'))
          console.log(d.status)
          break
        case "salinidadeMin":
          console.log(value)
          const c = await axios.get(urlToThingspeak(value, 4, 'OKPJYMR8BY4DS76U'))
          console.log(c.status)
          break
        case "oxigenioMax":
          console.log(value)
          const b = await axios.get(urlToThingspeak(value, 5, '23YC8RS6DRHAJX93'))
          console.log(b.status)
          break
        case "oxigenioMin":
          console.log(value)
          const a = await axios.get(urlToThingspeak(value, 6, '23YC8RS6DRHAJX93'))
          console.log(a.status)
          break
        default:
        break
      }
      
      // const response = axios.get(`https://api.thingspeak.com/update?api_key=45RRXIFNQCRJK1B3&field1=${}`)
    }

  }

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('submitted'), delayTime);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status, sensorData])

  const handleInputChange = (id: string, value: string) => {
    setSensorData((sensor) => ({
      ...sensor,
      [id]: value
    }))
  }

  const renderInputGroup = (id: string, placeholder: string) => (
    <InputGroup>
      <Label htmlFor={id}>{placeholder}</Label>
      <Input
        value={sensorData[id as keyof typeof sensorData]}
        onChangeText={(text) => handleInputChange(id, text)}
        id={id} placeholder={"Digite o " + placeholder.toLowerCase()}
        size={"$4"} width={"$20"}
        marginStart={"$2"}
        keyboardType='number-pad'
        maxLength={3} />
    </InputGroup>
  )

  const resetAll = () => {
    setSensorData({
      temperaturaMax: "",
      temperaturaMin: "",
      salinidadeMax: "",
      salinidadeMin: "",
      orpMax: "",
      orpMin: "",
      condutividadeMax: "",
      condutividadeMin: "",
      oxigenioMax: "",
      oxigenioMin: "",
      pHMax: "",
      pHMin: "",
    })
  
    setStatus('off')
  }

  return (
    <View flex={1}>
      <Form onSubmit={() => {
        sendToThingspeak()
        setStatus("submitting")
      }} flex={1} alignItems='center' paddingTop={"$3"} paddingBottom={"$6"}>
        <ScrollView flex={1} paddingHorizontal={"$8"}>
          <XStack marginBottom={"$6"} justifyContent='center' width={"$20"}>
            <H2>Modo Manual</H2>
          </XStack>
          <YStack alignItems='center'>
            {renderInputGroup("temperaturaMax", "Temperatura máxima (graus)")}
            {renderInputGroup("temperaturaMin", "Temperatura minímo (graus)")}

            {renderInputGroup("salinidadeMax", "Salinidade máxima (ppt)")}
            {renderInputGroup("salinidadeMin", "Salinidade minímo (ppt)")}

            {renderInputGroup("orpMax", "ORP máximo (mV)")}
            {renderInputGroup("orpMin", "ORP minímo (mV)")}

            {renderInputGroup("condutividadeMax", "Condutividade máxima (uS/L)")}
            {renderInputGroup("condutividadeMin", "Condutividade minímo (uS/L)")}

            {renderInputGroup("oxigenioMax", "Oxigênio máximo (Mg/L)")}
            {renderInputGroup("oxigenioMin", "Oxigênio minímo (Mg/L)")}

            {renderInputGroup("pHMax", "pH máximo (pH)")}
            {renderInputGroup("pHMin", "pH minímo (pH)")}


            <Form.Trigger marginTop={"$6"} asChild disabled={status !== 'off'}>
              <Button width={"$20"} bg={status !== "submitted" ? "$orange10" : "$gray7"} icon={status === 'submitting' ? () => <Spinner /> : undefined} disabled={status === "submitted"}>
                {status === "submitted" && <Check color={"#16a34a"} />}
                {status !== "submitted" ? "Enviar" : "Enviado"}
              </Button>
            </Form.Trigger>
            {status === 'submitted' && (
              <Button marginVertical={"$4"} width={"$20"} bg={"$orange10"} onPress={() => resetAll()}>
                  <Plus />
                  Fazer uma nova calibração
              </Button>
            )}
          </YStack>
        </ScrollView>
      </Form>
    </View>
  );
}
