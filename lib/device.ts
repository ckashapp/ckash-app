import DeviceInfo from 'react-native-device-info'

export interface DeviceInfoType {
    AppName: string
    Brand: string
    BuildNumber: string
    BundleId: string
    Carrier: string
    DeviceId: string // this is the device model + version
    FirstInstallTime: number
    FontScale: number
    FreeDiskStorage: number
    InstallReferrer: string
    InstanceID: string
    LastUpdateTime: number
    Manufacturer: string
    MaxMemory: number
    Model: string
    ReadableVersion: string
    SystemName: string
    SystemVersion: string
    TotalDiskCapacity: number
    TotalMemory: number
    UniqueID: string // this is the unique id of the device, which maps to deviceId in the data
    UserAgent: string
    Version: string
    isEmulator: boolean
    isTablet: boolean
    UsedMemory: number
}
  
const  getDeviceInfo=async(): Promise<DeviceInfoType>=>{
    return {
      AppName: DeviceInfo.getApplicationName(),
      Brand: DeviceInfo.getBrand(),
      BuildNumber: DeviceInfo.getBuildNumber(),
      BundleId: DeviceInfo.getBundleId(),
      Carrier: await DeviceInfo.getCarrier(),
      DeviceId: DeviceInfo.getDeviceId(),
      FirstInstallTime: await DeviceInfo.getFirstInstallTime(),
      FontScale: await DeviceInfo.getFontScale(),
      FreeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
      InstallReferrer: await DeviceInfo.getInstallReferrer(),
      InstanceID: await DeviceInfo.getInstanceId(),
      LastUpdateTime: await DeviceInfo.getLastUpdateTime(),
      Manufacturer: await DeviceInfo.getManufacturer(),
      MaxMemory: await DeviceInfo.getMaxMemory(),
      Model: DeviceInfo.getModel(),
      ReadableVersion: DeviceInfo.getReadableVersion(),
      SystemName: DeviceInfo.getSystemName(),
      SystemVersion: DeviceInfo.getSystemVersion(),
      TotalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
      TotalMemory: await DeviceInfo.getTotalMemory(),
      UniqueID: await DeviceInfo.getUniqueId(),
      UserAgent: await DeviceInfo.getUserAgent(),
      Version: DeviceInfo.getVersion(),
      isEmulator: await DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),
      UsedMemory: await DeviceInfo.getUsedMemory(),
    }
}

  export {getDeviceInfo}
