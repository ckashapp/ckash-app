import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import tw from 'twrnc'

interface SecondaryButtonProps {
  onPress: () => void
  label: string
  style?: any
  textStyle?: any
  disabled?: boolean
}

export default function SecondaryButton({
  onPress,
  label,
  style,
  textStyle,
  disabled
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        tw`rounded-lg p-4 mb-4 border border-[#3B82F6] bg-white`,
        disabled && tw`opacity-50`,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[tw`text-[#3B82F6] text-center font-semibold text-lg`, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
