import React, { useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { RootStackScreenProps } from './types'
import { colors } from '../utils'
import SuccessIcon from '../assets/icons/success-icon.svg'
import FailureIcon from '../assets/icons/failure-icon.svg'
import CopyIcon from '../assets/icons/copy-icon.svg'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/ui/SecondaryButton'
import { formatDate } from '../lib/date'
import { ShareOptionsBottomSheet } from '../components/ShareOptionsBottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface TransactionDetails {
  id: string;
  status: string; 
  transactionCode: string;
  receiptNumber?: string;
      publicName?: string;
      mobileNetwork?: string,
  amount:string,
  message?: string;
  userAddress?: `0x${string}`;
  createdAt: string; 
  updatedAt: string; 
}

const TransactionDetailsScreen: React.FC<Readonly<RootStackScreenProps<'TransactionDetails'>>> = ({ route, navigation }) => {
  const { transaction }: { transaction: TransactionDetails } = route.params
  const shareBottomSheetRef = useRef<BottomSheetModal>(null)

  const handleCopyReceipt = () => {
    // Implement copy to clipboard functionality
    Alert.alert('Copied', 'Receipt number copied to clipboard')
  }

  const handleCopyTransactionCode = () => {
    // Implement copy to clipboard functionality
    
    Alert.alert('Copied', 'Transaction code copied to clipboard')
  }

  const handleShareReceipt = () => {
    shareBottomSheetRef.current?.present()
  }

  const handleBackToHome = () => {

    navigation.navigate('Wallet')
  }
  
  const StatusIcon =
  transaction.status === "COMPLETE"
    ? SuccessIcon
    : transaction.status === "PENDING"
    ? FailureIcon
    : FailureIcon;


  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Status Icon and Title */}
      <View style={styles.statusSection}>
        <View style={styles.statusIconContainer}>
          <StatusIcon width={80} height={80} />
        </View>
        <Text style={styles.statusTitle}>
        {transaction.status === "COMPLETE"
  ? "Payment Success!"
  : transaction.status === "PENDING"
  ? "Payment Pending..."
  : "Payment Failed!"}

        </Text>
        <Text style={styles.statusSubtitle}>
        {transaction.status === "COMPLETE"
  ? "Your payment was successful."
  : transaction.status === "PENDING"
  ? "Your payment is being processed."
  : "Your payment failed. Please try again."}

        </Text>
      </View>

      {/* Transaction Details Card */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValueAmount}>{transaction.amount}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: transaction.status === "COMPLETE" ? '#10B981' : '#EF4444' }]}>
            <Text style={styles.statusBadgeText}>
              {transaction.status === "COMPLETE" ? 'Success' : 'Failed'}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Receipt Number</Text>
          <View style={styles.copyableRow}>
            <Text style={styles.detailValue}>{transaction.receiptNumber}</Text>
            <TouchableOpacity onPress={handleCopyReceipt} style={styles.copyButton}>
              <CopyIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>TxCode</Text>
          <View style={styles.copyableRow}>
            <Text style={styles.detailValue}>{transaction.transactionCode}</Text>
            <TouchableOpacity onPress={handleCopyTransactionCode} style={styles.copyButton}>
              <CopyIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{transaction.publicName ||  'N/A'}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{transaction.mobileNetwork }</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Time</Text>
          <Text style={styles.detailValue}>{formatDate(transaction.createdAt)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <SecondaryButton
          label="Share Receipt"
          onPress={handleShareReceipt}
        />
        
        <PrimaryButton
          label="Back to Home"
          onPress={handleBackToHome}
        />
      </View>

      {/* Share Options Bottom Sheet */}
      <ShareOptionsBottomSheet
        forwardedRef={shareBottomSheetRef}
        transaction={transaction}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
    fontSize: 11,
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
