import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../../utils'
import tw from 'twrnc'

interface LoadingIndicatorProps {
  message?: string
  size?: 'small' | 'large'
  color?: string
  style?: any
  textStyle?: any
}

export default function LoadingIndicator({
  message = 'Loading...',
  size = 'large',
  color = colors.loadingIndicator,
  style,
  textStyle,
}: LoadingIndicatorProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={[styles.text, textStyle]}>
          {message}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  text: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    color: colors.contentSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
})
