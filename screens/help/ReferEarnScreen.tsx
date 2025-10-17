import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RootStackScreenProps } from '../types';
import { colors } from '../../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyableField from '../../components/CopyableField';
import SocialShareButtons from '../../components/SocialShareButtons';
import QRCodeSection from '../../components/QRCodeSection';
import { REFER_EARN_CONSTANTS } from '../../constants/referEarn';
import { useCkashReferral } from '../../hooks/useReferral';
import { useWalletClient } from '@divvi/mobile';
import { useRoute } from '@react-navigation/native';
import AlertModal from '../../components/AlertModal';
import { useReferralStore } from '../../store/referralStore';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import tw from 'twrnc'


export default function ReferEarnScreen({ navigation }: Readonly<RootStackScreenProps<'ReferEarn'>>) {
  const [manualCode, setManualCode] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [referCount,setReferCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const { copy, copied } = useCopyToClipboard();


  // Zustand store
  const { setReferralCode, clearReferralCode } = useReferralStore();
  const referralCode = useReferralStore((state) => state.referralCode);
  const referralLink = useReferralStore((state) => state.referralLink);
  const userAddress = useReferralStore((state) => state.userAddress );

  //console.log("THE STATES", referralCode, referralLink)

  // API hooks
  const { getUserReferralCode, claimReferralCode, createReferralCode,referralCount, error } = useCkashReferral();
  const { data: walletClient } = useWalletClient({ networkId: 'celo-mainnet' });
  const address = walletClient?.account?.address;

  const route = useRoute();
  const claimedCodeFromLink = (route.params as any)?.code ?? null;


  
  useEffect(() => {
    setHydrated(true);
  }, []);
  

  useEffect(() => {    
    if (!hydrated) return;
  
    const fetchReferralCode = async () => {      
      if (!address) return;
      const result = await referralCount(address)
      console.log("The result",result?.data?.count)
      if (result?.count !== undefined) {
        setReferCount(result?.data?.count)
      }
      if (userAddress?.toLowerCase() === address.toLowerCase()) {
        setLoading(false);
        return;
      }
      
      // if (referralCode) {
      //   setLoading(false);
      //   return;
      // }
  
      try {
        setLoading(true);
        const result = await getUserReferralCode(address);
  
        if (result?.code) {
          setReferralCode(result.code.code, result.code.deepLink, address);
        }
      } catch (err) {
        console.error(err);
        setMessage('Failed to fetch referral code.');
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };   
  
    fetchReferralCode();
  }, [hydrated, address]);
  
  // Create referral code
  const handleCreateReferralCode = async () => {
    if (!address) return;

    try {
      setCreating(true);
      const result = await createReferralCode(address);

      if (result?.code) {
        setReferralCode(result.code.code, result.code.deepLink, address);
        setMessage('Referral code created successfully!');
      } else {
        setMessage(result?.message ?? 'Failed to create referral code.');
      }
    } catch (err: any) {
      console.error('Failed to create referral code:', err);
      setMessage(err.message ?? 'Failed to create referral code.');
    } finally {
      setCreating(false);
      setModalVisible(true);
    }
  };

  // Claim referral code
  const handleClaimReferral = async (codeToClaim?: string) => {
    const code = codeToClaim || manualCode || claimedCodeFromLink;

    if (!address || !code) {
      setMessage('Referral code is required.');
      setModalVisible(true);
      return;
    }

    try {
      setClaiming(true);
      const result = await claimReferralCode(address, code);

      if (result?.success) {
        setMessage('Claim successful!');
        setManualCode('');
      } else {
        setMessage(result?.message ?? 'Failed to claim referral.');
      }
    } catch (err) {
      console.error('Failed to claim referral:', err);
      setMessage('Failed to claim referral.');
    } finally {
      setClaiming(false);
      setModalVisible(true);
    }
  };

  // Copy helpers
  const handleCopyCode = () => {
    if (!referralCode) return;
    copy(referralCode);
  };

  const handleCopyLink = () => {
    if (!referralLink) return;
    copy(referralLink);
  };

  // Share helper
  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'twitter') => {
    const shareMessage = `Join me on cKash! Use my referral code: ${referralCode} or visit: ${referralLink}`;
    try {
      await Share.share({ message: shareMessage });
    } catch (err) {
      console.error('Error sharing:', err);
      setMessage(REFER_EARN_CONSTANTS.SHARE_ERROR_MESSAGE);
      setModalVisible(true);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* <View style={styles.header}>
        <Text style={styles.subtitle}>Refer a user via your code to earn rewards</Text>        
      </View> */}
     
       <View style={styles.imageContainer}>   
      <Image
        source={require('../../assets/referral.png')}
        style={styles.image}
        resizeMode="contain"
      />
  
  </View>
     

      {loading ? (
        <ActivityIndicator size="large" color={colors.contentPrimary} />
      ) : referralCode ? (
        <>
          {/* <QRCodeSection
            qrCodeComponent={
              <QRCode value={`ckash://ReferEarn/${referralCode}`} size={REFER_EARN_CONSTANTS.QR_CODE_SIZE} />
            }
            
          /> */}
            
            <View style={styles.section}>
              <View style={styles.countSection}>
                <Text style={styles.sectionLabel}>Invite via (Referral Code) </Text>
                <Text style={styles.sectionLabel}> Referrals: {referCount }</Text>

              </View>
             
            <CopyableField label="My Referral Code" value={referralCode} onCopy={handleCopyCode} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Invite Link</Text>
            <CopyableField label="My Referral Link" value={referralLink ?? ''} onCopy={handleCopyLink} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Share to</Text>
            <SocialShareButtons onShare={handleShare} platforms={REFER_EARN_CONSTANTS.SUPPORTED_PLATFORMS} />
          </View>
        </>
      ) : (
        <View style={styles.section}>
         

          {claimedCodeFromLink && (
            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: 'green', marginBottom: 10 }]}
              onPress={() => handleClaimReferral(claimedCodeFromLink)}
              disabled={claiming}
            >
              <Text style={styles.createButtonText}>{claiming ? 'Claiming...' : `Claim ${claimedCodeFromLink}`}</Text>
            </TouchableOpacity>
          )}

          <TextInput
            style={styles.input}
            placeholder="Enter referral code"
            placeholderTextColor="#888"
            value={manualCode}
            onChangeText={setManualCode}
          />

          <TouchableOpacity
            style={[styles.createButton, { marginBottom: 10 }]}
            onPress={() => handleClaimReferral()}
            disabled={claiming || !manualCode}
          >
            <Text style={styles.createButtonText}>{claiming ? 'Claiming...' : 'Claim Code'}</Text>
              </TouchableOpacity>
              <Text style={styles.sectionLabel}>You don’t have a referral code yet.</Text>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateReferralCode} disabled={creating}>
            <Text style={styles.createButtonText}>{creating ? 'Unlocking Code...' : 'Unlock Rewards'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setMessage('');
        }}
        title={error ? 'Failed' : message}
        iconType={error ? 'error' : message ? 'info' : 'success'}
        loading={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 20, paddingTop: 20, paddingBottom: 40 },
  header: { alignItems: 'flex-start', marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.contentSecondary, textAlign: 'left', lineHeight: 22 },
  section: { marginBottom: 24 },
  countSection:{flexDirection:"row",gap:8},
  sectionLabel: { fontSize: 16, fontWeight: '600', color: colors.contentPrimary, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 12, color: colors.contentPrimary },
  createButton: { backgroundColor: colors.contentPrimary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center' },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  imageContainer: {    
    height: 200, 
    alignItems: 'center', 
    justifyContent: 'center', 
    overflow: 'hidden',
    marginBottom:20
  },
  image: {    
    width: '100%',
    height: '90%',
  },
});