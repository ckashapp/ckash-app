import React from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import tw from 'twrnc'

interface ClickableHeaderProps {
  title: string
  actionText: string
  onPress: () => void
  titleStyle?: object
  actionStyle?: object
  containerStyle?: ViewStyle
  showArrow?: boolean
}

export default function ClickableHeader({
  title,
  actionText,
  onPress,
  titleStyle,
  actionStyle,
  containerStyle,
  showArrow = true,
}: ClickableHeaderProps) {
  return (
    <View style={[tw`flex-row justify-between items-center`, containerStyle]}>
      <Text
        style={[
          {
            paddingTop: 24,
            paddingBottom: 8,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontFamily: 'Heebo-Medium',
            fontSize: 16,
            color: '#1B1A46',
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      <Pressable
        style={tw`flex-row items-center pt-4 pb-2`}
        onPress={onPress}
        testID={`ClickableHeader_${actionText.replace(/\s+/g, '')}`}
      >
        <Text
          style={[
            {
              fontFamily: 'Heebo-Medium',
              fontSize: 14,
              color: '#1B1A46',
              marginRight: 4,
            },
            actionStyle,
          ]}
        >
          {actionText}
        </Text>
        {showArrow && <Text style={tw`text-base text-[#595F6F]`}>↗</Text>}
      </Pressable>
    </View>
  )
}
