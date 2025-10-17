import * as React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

interface Props {
  size?: number
  style?: ViewStyle
}

export default function CkashLogo({ style, size = 24 }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 105 108">
<G clip-path="url(#clip0_1818_3213)">
<Path d="M54.8378 101.467C24.7665 101.467 0.302002 78.6211 0.302002 50.5392C0.302002 22.4573 24.7665 -0.377823 54.8378 -0.377823C64.7437 -0.377823 74.4259 2.11908 82.8359 6.8489L84.803 7.95436L72.341 19.5919L71.1867 19.0694C66.0629 16.7375 60.5564 15.5606 54.8319 15.5606C34.1719 15.5606 17.3577 31.257 17.3577 50.5557C17.3577 69.8545 34.166 85.5399 54.8319 85.5399C60.9215 85.5399 66.8933 84.1594 72.2409 81.5305L57.1582 67.4401L41.4041 52.7116L54.4608 40.5131L55.7329 41.7561L65.368 50.7702L105.846 88.5702L92.8184 100.736L84.7029 93.1571C75.8275 98.6019 65.5329 101.473 54.8319 101.473L54.8378 101.467Z" fill="#0034BB"/>
<Path d="M82.3938 13.0086L83.8779 14.3946C83.3479 13.9656 82.8002 13.5476 82.2524 13.1461L82.3938 13.0141V13.0086Z" fill="#0034BB"/>
<Path d="M83.8195 30.7119L74.1491 39.7426L50.8036 61.5437L41.1567 52.5186L64.6907 30.5414L74.3081 21.5603C74.8558 21.9618 75.4035 22.3798 75.9336 22.8087L81.5108 28.017C82.3177 28.8915 83.0833 29.788 83.8195 30.7064V30.7119Z" fill="#0034BB"/>
</G>

</Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: 'rgba(46, 51, 56, 0.15)',
  },
})
