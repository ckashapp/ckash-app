import React, { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native'
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { formatDate } from '../lib/date'
import WhatsappIcon from '../assets/icons/whatsapp.svg'
import TelegramIcon from '../assets/icons/TelegramIcon'

interface TransactionDetails {
  id: string
  status: string
  transactionCode: string
  receiptNumber?: string
  publicName?: string
  mobileNetwork?: string
  amount: string
  message?: string
  userAddress?: `0x${string}`
  createdAt: string
  updatedAt: string
}

interface ShareOptionsBottomSheetProps {
  forwardedRef: React.RefObject<BottomSheetModal>
  transaction: TransactionDetails
  onClose?: () => void
}

export const ShareOptionsBottomSheet: React.FC<ShareOptionsBottomSheetProps> = ({
  forwardedRef,
  transaction,
  onClose,
}) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough={false}
      />
    ),
    []
  )

  const generateReceiptMessage = () => {
    return `Payment Receipt\n\nAmount: ${transaction.amount}\nStatus: ${transaction.status}\nReceipt Number: ${transaction.receiptNumber || 'N/A'}\nTransaction Code: ${transaction.transactionCode}\nName: ${transaction.publicName || 'N/A'}\nPayment Time: ${formatDate(transaction.createdAt)}\n\nThank you for using cKash!`
  }

  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'twitter') => {
    const message = generateReceiptMessage()
    
    try {
      forwardedRef.current?.dismiss()
      await Share.share({ message })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <BottomSheetModal
      ref={forwardedRef}
      index={0}
      snapPoints={['25%']}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.handle} />
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => handleShare('whatsapp')}>
            <WhatsappIcon width={24} height={24} />
            <Text style={styles.optionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handleShare('telegram')}>
            <TelegramIcon width={24} height={24} color="#0088CC" />
            <Text style={styles.optionText}>Telegram</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Heebo-Medium',
    color: '#1B1A46',
    marginLeft: 12,
  },
})
