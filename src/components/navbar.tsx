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

type ApiResponse = {
  success: boolean;
  message?: string;
};

export function Navbar() {
  const account = useActiveAccount();
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const { toast } = useToast();

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
    setIsClaimLoading(true);
    try {
      if (!account?.address) {
        throw new Error('No account address available');
      }

      const resp = await fetch('/api/claimToken', {
        method: 'POST',
        body: JSON.stringify({ address: account.address }),
        credentials: 'include',
        mode: 'cors',
      });

      const respData: ApiResponse = await resp.json();

      if (!resp.ok) {
        throw new Error(respData.message || 'Failed to claim tokens');
      }

      toast({
        title: 'Tokens Claimed!',
        description: 'Your tokens have been successfully claimed.',
        duration: 5000,
      });
    } catch (error: unknown) {
      toast({
        title: 'Claim Failed',
        description:
          error instanceof Error
            ? error.message
            : 'There was an error claiming tokens.',
        variant: 'destructive',
      });
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <div className='flex flex-wrap justify-between items-center gap-2 mb-4 sm:mb-6'>
      <h1 className='text-xl sm:text-2xl font-bold text-foreground'>
        BASE.YENO.BET
      </h1>
      <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
        {account && (
          <>
            <div className='text-xs sm:text-sm text-foreground'>
              {isLoading
                ? 'Loading...'
                : isError
                ? 'Balance error'
                : `Balance: ${balanceData?.displayValue || '0'} ${
                    balanceData?.symbol || 'PMT'
                  }`}
            </div>
            <Button
              onClick={handleClaimTokens}
              disabled={isClaimLoading}
              variant='outline'
              size='sm'
              className='text-xs sm:text-sm h-8 sm:h-9 text-foreground border-border hover:bg-accent'
            >
              {isClaimLoading ? (
                <>
                  <Loader2 className='mr-1 h-3 w-3 animate-spin' />
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
              fontSize: '0.7rem !important',
              height: '2rem !important',
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
