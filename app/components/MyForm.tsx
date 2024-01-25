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
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  const [readyToSend, setReadyToSend] = useState<boolean>(false)
  const [sensorData, setSensorData] = useState({
    temperaturaMax: "",
    salinidadeMax: "",
    orpMax: "",
    condutividadeMax: "",
    oxigenioMax: "",
    pHMax: "",

    temperaturaMin: "",
    salinidadeMin: "",
    orpMin: "",
    condutividadeMin: "",
    oxigenioMin: "",
    pHMin: "",
  })

  const sendToThingspeak = () => {
    for (const [field, value] of Object.entries(sensorData)) {
      switch (field) {
        case "orpMax":
        case "orpMin":
          console.log(value)
          break
        case "pHMax":
        case "pHMin":
          console.log(value)
          break
        case "temperaturaMax":
        case "temperaturaMin":
          console.log(value)
          break
        case "condutividaddeMax":
        case "condutividadeMin":
          console.log(value)
          break
        case "salinidadeMax":
        case "salinidadeMin":
          console.log(value)
          break
        case "oxigenioMax":
        case "oxigenioMin":
          console.log(value)
          break
        default:
          break
      }
      // const response = axios.get(`https://api.thingspeak.com/update?api_key=45RRXIFNQCRJK1B3&field1=${}`)
    }

  }

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('submitted'), 200);
      return () => {
        sendToThingspeak()
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
      salinidadeMax: "",
      orpMax: "",
      condutividadeMax: "",
      oxigenioMax: "",
      pHMax: "",
      temperaturaMin: "",
      salinidadeMin: "",
      orpMin: "",
      condutividadeMin: "",
      oxigenioMin: "",
      pHMin: "",
    })
  
    setStatus('off')
  }

  return (
    <View flex={1}>
      <Form onSubmit={() => setStatus("submitting")} flex={1} alignItems='center' paddingTop={"$3"} paddingBottom={"$6"}>
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
