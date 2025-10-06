import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from './types'
import { colors } from '../utils'
import { navigate } from '@divvi/mobile'
import BlueAirtimeIcon from '../assets/icons/blue-airtime-icon.svg'
import PalmpayIcon from '../assets/icons/palmpay-icon.svg'

interface Transaction {
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

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'airtime',
    title: 'Airtime Purchase',
    date: 'Jul 15, 2025',
    amount: '10,000.99',
    currency: 'NGN',
    isDebit: true,
    status: 'success',
  },
  {
    id: '2',
    type: 'send',
    title: 'Sent: Lemonr Pablo',
    recipient: 'Lemonr Pablo',
    date: 'Jul 15, 2025',
    amount: '607.64',
    currency: 'cNGN',
    isDebit: true,
    status: 'success',
  },
  {
    id: '3',
    type: 'send',
    title: 'Sent: Lemonr Pablo',
    recipient: 'Lemonr Pablo',
    date: 'Jul 15, 2025',
    amount: '607.64',
    currency: 'cNGN',
    isDebit: true,
    status: 'failed',
  },
  {
    id: '4',
    type: 'airtime',
    title: 'Airtime Purchase',
    date: 'Jul 15, 2025',
    amount: '89.99',
    currency: '$',
    isDebit: true,
    status: 'success',
  },
  {
    id: '5',
    type: 'send',
    title: 'Sent: Lemonr Pablo',
    recipient: 'Lemonr Pablo',
    date: 'Jul 15, 2025',
    amount: '607.64',
    currency: 'cNGN',
    isDebit: true,
    status: 'failed',
  },
  {
    id: '6',
    type: 'airtime',
    title: 'Airtime Purchase',
    date: 'Jul 15, 2025',
    amount: '89.99',
    currency: '$',
    isDebit: true,
    status: 'success',
  },
  {
    id: '7',
    type: 'send',
    title: 'Sent: Lemonr Pablo',
    recipient: 'Lemonr Pablo',
    date: 'Jul 15, 2025',
    amount: '607.64',
    currency: 'cNGN',
    isDebit: true,
    status: 'success',
  },
  {
    id: '8',
    type: 'airtime',
    title: 'Airtime Purchase',
    date: 'Jul 15, 2025',
    amount: '89.99',
    currency: '$',
    isDebit: true,
    status: 'failed',
  },
  {
    id: '9',
    type: 'airtime',
    title: 'Airtime Purchase',
    date: 'Jul 15, 2025',
    amount: '89.99',
    currency: '$',
    isDebit: true,
    status: 'success',
  },
]

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const IconComponent = transaction.type === 'airtime' ? BlueAirtimeIcon : PalmpayIcon

  const handleTransactionPress = () => {
    navigate('TransactionDetails', { transaction })
  }

  return (
    <TouchableOpacity 
      style={styles.transactionItem}
      onPress={handleTransactionPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <IconComponent width={40} height={40} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.transactionAmount, { color: transaction.isDebit ? '#FF4444' : '#00AA44' }]}>
          {transaction.isDebit ? '-' : '+'}{transaction.currency}{transaction.amount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const TransactionSeparator: React.FC = () => <View style={styles.separator} />

export default function TransactionHistoryScreen(
  _props: Readonly<RootStackScreenProps<'TransactionHistory'>>,
) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={TransactionSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  transactionTitle: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: colors.contentPrimary,
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Heebo-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: colors.contentSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 56,
  },
})
