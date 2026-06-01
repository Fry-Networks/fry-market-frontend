import { Icon } from '@iconify/react';
import { Dropdown, MenuProps } from 'antd';
import { useChain } from '../../contexts/ChainContext';
import { ChainId } from '../../config/chains';

const CHAIN_ICONS: Record<ChainId, string> = {
  'algorand-mainnet': 'cryptocurrency-color:algo',
  'voi-mainnet': 'mdi:hexagon-outline',
};

const ChainSwitcher: React.FC = () => {
  const { activeChain, availableChains, switchChain } = useChain();

  const items: MenuProps['items'] = availableChains.map((chain) => ({
    key: chain.chainId,
    label: (
      <div className="flex items-center gap-2 py-1 px-2">
        <Icon icon={CHAIN_ICONS[chain.chainId]} width={20} height={20} />
        <span>{chain.displayName}</span>
        {chain.chainId === activeChain.chainId && (
          <Icon icon="mdi:check" width={16} height={16} className="ml-auto" style={{ color: 'var(--primary)' }} />
        )}
      </div>
    ),
  }));

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switchChain(key as ChainId);
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']} overlayClassName="custom-dropdown">
      <button
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
        style={{ border: '1.5px solid var(--border-color)', background: 'var(--bg-surface)' }}
      >
        <Icon icon={CHAIN_ICONS[activeChain.chainId]} width={20} height={20} />
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {activeChain.displayName}
        </span>
        <Icon icon="mdi:chevron-down" width={16} height={16} style={{ color: 'var(--text-muted)' }} />
      </button>
    </Dropdown>
  );
};

export default ChainSwitcher;
