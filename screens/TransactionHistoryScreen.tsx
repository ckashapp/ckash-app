import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import { RootStackScreenProps } from './types'
import { colors } from '../utils'
import { navigate, useWalletClient } from '@divvi/mobile'
import PalmpayIcon from '../assets/icons/palmpay-icon.svg'
import Mpesa from '../assets/icons/mpesa-icon.svg'
import Moniepoint from '../assets/icons/moniepoint-icon.svg'
import Opay from '../assets/icons/opay-icon.svg'
import MTN from '../assets/icons/mtn-icon.svg'
import Airtel from '../assets/icons/airtel-icon.svg'
import Telcel from '../assets/icons/telecel-icon.svg'
import AirtelTigo from '../assets/icons/airteltigo-icon.svg'
import { useCkashReferral } from '../hooks/useReferral'
import { OffchainTransaction } from '../api/types'
import { formatDate } from '../lib/date'
import LoadingIndicator from '../components/ui/LoadingIndicator'
import ErrorState from '../components/ui/ErrorState'

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

export type Network =
  | 'Safaricom'
  | 'MTN'
  | 'AirtelTigo'
  | 'Telcel'
  | 'Airtel'
  | 'Palmpay'
  | 'Moniepoint'
  | 'Opay';

const networkIcons: Record<Network, React.FC<any>> = {
  Safaricom: Mpesa,
  MTN,
  AirtelTigo,
  Telcel,
  Airtel,
  Palmpay: PalmpayIcon,
  Moniepoint,
  Opay,
};



const TransactionItem: React.FC<{ transaction: OffchainTransaction }> = ({ transaction }) => {
  const IconComponent = networkIcons[transaction.mobileNetwork as Network] || PalmpayIcon;


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
      <Text style={styles.transactionTitle}>
  {transaction.mobileNetwork === "Safaricom"
    ? "Mpesa"
    : transaction.mobileNetwork}
</Text>

        <Text style={styles.transactionDate}>{formatDate(transaction.createdAt)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.transactionAmount, { color: '#FF4444' }]}>
          {transaction.amount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const TransactionSeparator: React.FC = () => <View style={styles.separator} />

export default function TransactionHistoryScreen(
  _props: Readonly<RootStackScreenProps<'TransactionHistory'>>,
) {
  const [transactions, setTransactions] = React.useState<OffchainTransaction[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  
  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' });
  const address = walletClient?.account?.address;

  const { userOffchainTransactions, loading, error, clearError } = useCkashReferral();

  const fetchTransactions = async (isRefresh = false) => {
    try {
      if (!address) return;
      
      if (isRefresh) {
        setRefreshing(true);
      }
      
      setHasError(false);
      clearError();
      
      const result = await userOffchainTransactions(address as `0x${string}`);
      if (result?.success) { 
        console.log("Results", result.transactions?.transactions);
        setTransactions(result.transactions?.transactions as OffchainTransaction[] || []);
      } else {
        setTransactions([]);
      }
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setHasError(true);
      setTransactions([]);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };

  const handleRetry = () => {
    fetchTransactions();
  };

  const handleRefresh = () => {
    fetchTransactions(true);
  };

  React.useEffect(() => {
    fetchTransactions();
  }, [address]);

  // Show loading state
  if (loading && !refreshing && transactions.length === 0) {
    return (
      <LoadingIndicator 
        message="Loading transactions..." 
        style={styles.loadingContainer}
      />
    );
  }

  // Show error state
  if (hasError || error) {
    return (
      <ErrorState
        message={error || "Failed to load transactions. Please check your connection."}
        onRetry={handleRetry}
        style={styles.errorContainer}
      />
    );
  }

  // Show empty state
  if (!loading && transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No transactions found</Text>
        <Text style={styles.emptySubtext}>Your transaction history will appear here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={TransactionSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.loadingIndicator]}
            tintColor={colors.loadingIndicator}
          />
        }
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
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 4,
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
    fontSize: 12,
    lineHeight: 16,
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
  loadingContainer: {
    backgroundColor: colors.backgroundPrimary,
  },
  errorContainer: {
    backgroundColor: colors.backgroundPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontFamily: 'Heebo-Medium',
    fontSize: 18,
    color: colors.contentPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Heebo-Regular',
    fontSize: 14,
    color: colors.contentSecondary,
    textAlign: 'center',
  },
})
