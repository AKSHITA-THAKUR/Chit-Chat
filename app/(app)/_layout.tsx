import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ChatHeader from '@/components/ChatHeader'
const _layout = () => {
  return (
    <Stack>
     <Stack.Screen name='home' options={{
        header:() => <ChatHeader/>
     }}/>
     <Stack.Screen name='chatRom' options={{headerShown:false}}/>
     <Stack.Screen name='GroupChat' options={{headerShown:false}}/>
     <Stack.Screen name='groupRoom' options={{headerShown:false}}/>

    </Stack>
  )
}

export default _layout