import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { RootStackScreenProps } from './types'
import { colors } from '../utils'
import SuccessIcon from '../assets/icons/success-icon.svg'
import FailureIcon from '../assets/icons/failure-icon.svg'
import CopyIcon from '../assets/icons/copy-icon.svg'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/ui/SecondaryButton'

interface TransactionDetails {
  id: string
  type: 'airtime' | 'send'
  title: string
  recipient?: string
  date: string
  amount: string
  currency: string
  isDebit: boolean
  status: 'success' | 'failed'
}

const TransactionDetailsScreen: React.FC<Readonly<RootStackScreenProps<'TransactionDetails'>>> = ({ route, navigation }) => {
  const { transaction }: { transaction: TransactionDetails } = route.params

  const handleCopyReceipt = () => {
    // Implement copy to clipboard functionality
    Alert.alert('Copied', 'Receipt number copied to clipboard')
  }

  const handleCopyTransactionCode = () => {
    // Implement copy to clipboard functionality
    Alert.alert('Copied', 'Transaction code copied to clipboard')
  }

  const handleShareReceipt = () => {
    // Implement share functionality
    Alert.alert('Share', 'Share receipt functionality')
  }

  const handleBackToHome = () => {
    navigation.navigate('CustomWallet')
  }

  const receiptNumber = '000085752257'
  const transactionCode = '547r3dsts53...455'
  const paymentTime = 'Oct 1 2025, 13:22:16'

  const isSuccess = transaction.status === 'success'
  const StatusIcon = isSuccess ? SuccessIcon : FailureIcon

  return (
    <View style={styles.container}>
      {/* Status Icon and Title */}
      <View style={styles.statusSection}>
        <View style={styles.statusIconContainer}>
          <StatusIcon width={80} height={80} />
        </View>
        <Text style={styles.statusTitle}>
          {isSuccess ? 'Payment Success!' : 'Payment Failed!'}
        </Text>
        <Text style={styles.statusSubtitle}>
          {isSuccess 
            ? 'Your payment has been successfully done.' 
            : 'Your payment could not be completed. Please try again.'
          }
        </Text>
      </View>

      {/* Transaction Details Card */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValueAmount}>{transaction.currency}{transaction.amount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: isSuccess ? '#10B981' : '#EF4444' }]}>
            <Text style={styles.statusBadgeText}>
              {isSuccess ? 'Success' : 'Failed'}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Receipt Number</Text>
          <View style={styles.copyableRow}>
            <Text style={styles.detailValue}>{receiptNumber}</Text>
            <TouchableOpacity onPress={handleCopyReceipt} style={styles.copyButton}>
              <CopyIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction Code</Text>
          <View style={styles.copyableRow}>
            <Text style={styles.detailValue}>{transactionCode}</Text>
            <TouchableOpacity onPress={handleCopyTransactionCode} style={styles.copyButton}>
              <CopyIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{transaction.recipient || 'N/A'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>Wallet</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Time</Text>
          <Text style={styles.detailValue}>{paymentTime}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {isSuccess && (
          <SecondaryButton
            label="Share Receipt"
            onPress={handleShareReceipt}
          />
        )}
        
        <PrimaryButton
          label={isSuccess ? "Back to Home" : "Try Again"}
          onPress={handleBackToHome}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  statusIconContainer: {
    marginBottom: 16,
  },
  statusTitle: {
    fontFamily: 'Heebo-Bold',
    fontSize: 24,
    lineHeight: 32,
    color: colors.contentPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusSubtitle: {
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.contentSecondary,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontFamily: 'Heebo-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentSecondary,
  },
  detailValue: {
    fontFamily: 'Heebo-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentPrimary,
  },
  detailValueAmount: {
    fontFamily: 'Heebo-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: colors.contentPrimary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontFamily: 'Heebo-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  copyableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  buttonContainer: {
    gap: 12,
  },
})

export default TransactionDetailsScreen
