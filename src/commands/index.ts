const commandList = [
  { command: 'top_holders', description: 'Analyze top holders for a token' },
  { command: 'early_pf_wallets', description: 'Return a list of all wallets that bought the token before graduating' },
  { command: 'common_top_traders', description: 'Filter common top traders from given contract addresses' },
  { command: 'check_dex', description: 'Check if dex has been updated for a token' },
  { command: 'wallet_analyzer', description: 'Check PnLs for recently traded tokens for a wallet' },
  { command: 'bundle_check', description: 'Check if a token is bundled or not' },
  { command: 'holders_scan', description: 'Check holders information of a token' },
  { command: 'hmap', description: 'Price heatmap of overall crypto market' },
  { command: 'graduated_stats', description: 'Returns stats for recently graduated pumpfuns' },
];

import * as Pumpfun from './Pumpfun';
import * as General from './General';

export {
  commandList,
  Pumpfun,
  General,
}