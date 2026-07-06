import {
  ConnectButton,
  lightTheme,
  useActiveAccount,
  useWalletBalance,
} from 'thirdweb/react';
import { client } from '@/app/client';
import { sepolia } from 'thirdweb/chains';
import { inAppWallet } from 'thirdweb/wallets';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { tokenAddress } from '@/constants/contract';
import { useContract, useContractWrite } from 'thirdweb/react'; // ⬅️ added

export function Navbar() {
  const account = useActiveAccount();
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const { toast } = useToast();

  // Get contract instance
  const { contract } = useContract({
    address: tokenAddress,
    chain: sepolia,
    client,
  });

  // Hook for the claim function
  const { mutateAsync: claimTokens, isPending } = useContractWrite({
    contract,
    method: 'claimTokens', // must match the contract function name
  });

  const {
    data: balanceData,
    isLoading,
    isError,
  } = useWalletBalance({
    chain: sepolia,
    address: account?.address,
    client: client,
    tokenAddress: tokenAddress,
  });

  const handleClaimTokens = async () => {
    if (!account?.address) {
      toast({ title: 'No wallet connected', variant: 'destructive' });
      return;
    }
    setIsClaimLoading(true);
    try {
      await claimTokens();
      toast({
        title: 'Tokens Claimed!',
        description: '100 PMT have been minted to your wallet.',
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        title: 'Claim Failed',
        description: error?.message || 'Transaction reverted. Check console.',
        variant: 'destructive',
      });
      console.error('Claim error:', error);
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-2xl font-bold'>BASE.YENO.BET</h1>
      <div className='items-center flex gap-2'>
        {account && (
          <>
            <div className='text-sm'>
              {isLoading
                ? 'Loading balance...'
                : isError
                ? 'Error loading balance'
                : `Balance: ${balanceData?.displayValue || '0'} ${
                    balanceData?.symbol || 'PMT'
                  }`}
            </div>
            <Button
              onClick={handleClaimTokens}
              disabled={isClaimLoading || isPending}
              variant='outline'
            >
              {isClaimLoading || isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Claiming...
                </>
              ) : (
                'Claim Tokens'
              )}
            </Button>
          </>
        )}
        <ConnectButton
          client={client}
          theme={lightTheme()}
          chain={sepolia}
          supportedTokens={{
            [sepolia.id]: [
              {
                address: tokenAddress,
                symbol: 'PMT',
                name: 'Prediction Token',
              },
            ],
          }}
          connectButton={{
            style: {
              fontSize: '0.75rem !important',
              height: '2.5rem !important',
            },
            label: 'Sign In',
          }}
          detailsButton={{
            displayBalanceToken: tokenAddress,
          }}
          wallets={[inAppWallet()]}
          accountAbstraction={{
            chain: sepolia,
            sponsorGas: true,
          }}
        />
      </div>
    </div>
  );
}