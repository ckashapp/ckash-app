
import 'react-native-gesture-handler'
import 'react-native-reanimated'
//import "./utils/base64"
import { createApp } from '@divvi/mobile'
import { registerRootComponent } from 'expo'
import Constants from 'expo-constants'
import BrandLogo from './assets/BrandLogo2'
import WelcomeLogo from './assets/WelcomeLogo'
import HomeScreen from './screens/HomeScreen'
import ActivityIcon from './assets/icons/activitytab-icon.svg'
import WalletIcon from './assets/icons/wallettab-icon.svg'
import UtilityIcon from './assets/icons/utilitytab-icon.svg'
import {
  CKES_TOKEN_ID,
  CUSD_TOKEN_ID,
  USDC_TOKEN_ID,
  USDT_TOKEN_ID,
  cGHS_TOKEN_ID,
  cZAR_TOKEN_ID,
  colors,
  createStaticLabel,
} from './utils'
import GetStarted from './components/GetStarted'
import * as React from "react"
import ServiceScreen from './screens/ServiceScreen'
import WalletScreen from './screens/WalletScreen'
import KenyaSendMoney from './screens/services/kenya/SendMoney'
import NigeriaSendMoney from './screens/services/nigeria/SendMoney'
import NigeriaAirtime from './screens/services/nigeria/Airtime'
import UgandaAirtime from './screens/services/uganda/Airtime'
import SendMoney from './screens/services/kenya/SendMoney'
import BuyAirtime from './screens/services/kenya/Airtime'
import BuyGoods from './screens/services/kenya/BuyGoods'
import PayBills from './screens/services/kenya/PayBills'
import GhanaSendMoney from './screens/services/ghana/SendMoney'
import UgandaSendMoney from './screens/services/uganda/SendMoney'
import ContactForm from './screens/help/ContactForm'
import HelpScreen from './screens/help/HelpScreen'
import CommunityScreen from './screens/help/CommunityScreen'
import ReferEarnScreen from './screens/help/ReferEarnScreen'
import TransactionHistoryScreen from './screens/TransactionHistoryScreen'
import TransactionDetailsScreen from './screens/PaymentSuccessScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RootStackScreenProps } from './screens/types'
import { SEGMENT_API } from './constants/constant'





const expoConfig = Constants.expoConfig
if (!expoConfig) {
  throw new Error('expoConfig is not available')
}
const App = createApp({
  registryName: 'cKash',
  displayName: expoConfig.name,
  deepLinkUrlScheme: expoConfig.scheme
    ? Array.isArray(expoConfig.scheme)
      ? expoConfig.scheme[0]
      : expoConfig.scheme
    : 'example',
  divviProtocol: {
     divviId :"0x93F40b8720943B941e1663331d8752d49C0D0544"
  },
  features: {
    cloudBackup: true,
    segment: {
      apiKey:SEGMENT_API
    }
  },
  themes: {
    default: {
      assets: {
        brandLogo: BrandLogo,
        welcomeLogo: WelcomeLogo,
        onboardingSuccessImage: require('./assets/onboarding-success.png'),
        biometryImages: {
          face: require('./assets/biometry/face.png'),
          faceId: require('./assets/biometry/face-id.png'),
          fingerprint: require('./assets/biometry/fingerprint.png'),
          touchId: require('./assets/biometry/touch-id.png'),
          iris: require('./assets/biometry/iris.png'),
        },
        backupAndRecoveryImages: {
          walletSafe: require('./assets/backup-and-recovery/wallet-safe.png'),
          cloudBackupEmail: require('./assets/backup-and-recovery/email.png'),
          recoveryPhraseEducation1: require('./assets/backup-and-recovery/recover-phrase.png'),
          recoveryPhraseEducation2: require('./assets/backup-and-recovery/dont-lose.png'),
          recoveryPhraseEducation3: require('./assets/backup-and-recovery/write-down.png'),
          recoveryPhraseEducation4: require('./assets/backup-and-recovery/private-phrase.png'),
        },
      },
      colors,
    },
  },
  screens: {
    tabs: ({ defaultTabs }) => {
      return {
        screens: [
          // defaultTabs.wallet,
          // {
          //   name: 'Home',
          //   component: HomeScreen,
          //   icon: defaultTabs.activity.icon,
          //   label: defaultTabs.activity.label,
          // }
          {
            name: 'Wallet',
            component: WalletScreen,
            icon: WalletIcon,           
            label: createStaticLabel('Wallet'),
          },
          {
            name: 'Utilities',
            component: ServiceScreen,
            icon: UtilityIcon,
            label: createStaticLabel('Utility'),
          },
          {
            ...defaultTabs.activity,
            label: (t) => t('activity'),
            icon: ActivityIcon,
          },
        ],
        // initialScreen: 'Home',
        initialScreen: 'Wallet',
      }
    },
    custom: (Screen) => (
      <>
        <Screen
          name="KenyaSendMoney"          
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Send Money',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"KenyaSendMoney">) => (
            <BottomSheetModalProvider>
              <KenyaSendMoney {...props} />
            </BottomSheetModalProvider>
          )}
          </Screen>
        <Screen
          name="UgandaSendMoney"          
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Send Money',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"UgandaSendMoney">) => (
            <BottomSheetModalProvider>
              <UgandaSendMoney {...props} />
            </BottomSheetModalProvider>
          )}
          </Screen>
        <Screen
          name="NigeriaSendMoney"
          
    
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Send Money',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"NigeriaSendMoney">) => (
            <BottomSheetModalProvider>
              <NigeriaSendMoney {...props} />
            </BottomSheetModalProvider>
          )}
          </Screen>

        <Screen
          name="GhanaSendMoney"
          
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Send Money',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"GhanaSendMoney">) => (
            <BottomSheetModalProvider>
              <GhanaSendMoney {...props} />
            </BottomSheetModalProvider>
          )}
          </Screen>

        <Screen
          name="NigeriaAirtime"
          component={NigeriaAirtime}
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Buy Airtime',
          }}
        />

        <Screen
          name="UgandaAirtime"
          component={UgandaAirtime}
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Buy Airtime',
          }}
        />

        <Screen
          name="KenyaBuyAirtime"
          component={BuyAirtime}
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Buy Airtime',
          }}
        />
        <Screen
          name="KenyaBuyGoods"
          
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Buy Goods',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"KenyaBuyGoods">) => (
            <BottomSheetModalProvider>
              <BuyGoods {...props} />
            </BottomSheetModalProvider>
          )}
          </Screen>

        <Screen
  name="KenyaPayBills"
  options={{
    headerBackVisible: true,
    headerShown: true,
    headerTitle: 'Pay Bills',
  }}
>
  {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"KenyaPayBills">) => (
    <BottomSheetModalProvider>
      <PayBills {...props} />
    </BottomSheetModalProvider>
  )}
</Screen>

        <Screen
          name="Help"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Help',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"Help">) => (
            <HelpScreen {...props} />
          )}
        </Screen>

        <Screen
          name="Community"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Community',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"Community">) => (
            <CommunityScreen {...props} />
          )}
        </Screen>

        <Screen
          name="ContactForm"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Contact Support',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"ContactForm">) => (
            <ContactForm {...props} />
          )}
        </Screen>

        <Screen
          name="ReferEarn"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Refer And Earn Rewards',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"ReferEarn">) => (
            <ReferEarnScreen {...props} />
          )}
        </Screen>

        <Screen
          name="TransactionHistory"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Transaction History',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"TransactionHistory">) => (
            <TransactionHistoryScreen {...props} />
          )}
        </Screen>

        <Screen
          name="TransactionDetails"
          options={{
            headerBackVisible: true,
            headerShown: true,
            headerTitle: 'Transaction Details',
          }}
        >
          {(props: React.JSX.IntrinsicAttributes & RootStackScreenProps<"TransactionDetails">) => (
            <BottomSheetModalProvider>
              <TransactionDetailsScreen {...props} />
            </BottomSheetModalProvider>
          )}
        </Screen>
      </>
      
    ),
  },

  locales: {
    'en-US': require('./locales/en-US.json'),
  },
  networks: {
    enabledNetworkIds: ['celo-mainnet'],
  },
  
  experimental: {
    activity: {
      hideActionsCarousel: true,
    },
    tokens: {
      enabledTokenIds: [
        CUSD_TOKEN_ID,
        CKES_TOKEN_ID,
        USDC_TOKEN_ID,
        USDT_TOKEN_ID,
        cGHS_TOKEN_ID,
        cZAR_TOKEN_ID,
      ],
      overrides: {
        [CKES_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [USDC_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [cGHS_TOKEN_ID]: {
          showZeroBalance: true,
        },
        [cZAR_TOKEN_ID]: {
          showZeroBalance: true,
        },
      },
    },
    transactions: {
      emptyState: <GetStarted />,
    },
    hideCashInTokenFilters: true,
    disableNfts: true,
    showPositions: true,
    showImportTokensFlow: false,
    showSwapTokenFilters: false,
    enableSwapAppFee: false
  },
})



function AppWrapper() {  
  return (    
    <GestureHandlerRootView style={{ flex: 1 }}>      
      <BottomSheetModalProvider>       
          <App />
        </BottomSheetModalProvider>      
      </GestureHandlerRootView>
      
  );
}

registerRootComponent(AppWrapper)
