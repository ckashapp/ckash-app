import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../../utils'
import tw from 'twrnc'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  retryText?: string
  style?: any
  textStyle?: any
}

export default function ErrorState({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try Again',
  style,
  textStyle,
}: ErrorStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.7}
        >
          <Text style={styles.retryText}>
            {retryText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  text: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    color: colors.errorPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.buttonPrimaryBackground[1],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    color: colors.buttonPrimaryContent,
    textAlign: 'center',
  },
})
