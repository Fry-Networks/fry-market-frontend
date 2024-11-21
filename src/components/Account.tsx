import { useWallet } from '@txnlab/use-wallet'
import { useMemo } from 'react'
import { ellipseAddress } from '../utils/ellipseAddress'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const Account = () => {
  const { activeAddress } = useWallet()
  const algoConfig = getAlgodConfigFromViteEnvironment()

  const networkName = useMemo(() => {
    return algoConfig.network === '' ? 'localnet' : algoConfig.network.toLocaleLowerCase()
  }, [algoConfig.network])

  return (
    <div className='text-center'>
      <a
        className="text-xl text-black"
        target="_blank"
        href={`https://lora.algokit.io/${networkName}/account/${activeAddress}/`}
      // href={`https://app.dappflow.org/setnetwork?name=${dappFlowNetworkName}&redirect=explorer/account/${activeAddress}/`}
      >
        Address: {ellipseAddress(activeAddress)}
      </a>
      <div className="text-xl text-black text-center font-roboto">Network: {algoConfig.network === '' ? 'localnet' : algoConfig.network}</div>
    </div>
  )
}

export default Account
