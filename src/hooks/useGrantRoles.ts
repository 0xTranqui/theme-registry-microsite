import {
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { Hex } from 'viem';
import { platformThemeRegistryAbi } from '../abi/platformThemeRegistryAbi';

    type Role = {
        account: `0x${string}`,
        role: number
    }
  
  export function useGrantRoles(platformIndex: bigint, rolesToGrant: Role[]) {

    // const exampleRole: Role = {
    //     account: "0x0000000000000000000000000000000000000000",
    //     role: 2
    // }

    // const usersToGrant: Role[] = [exampleRole]

    const { config: grantRolesConfig, error: grantRolesConfigError } = usePrepareContractWrite({
      address: "0x9a23AE640040e4d34E9e00E500003000017144F4", // deterministic address of theme registry
      abi: platformThemeRegistryAbi,
      functionName: 'grantRoles',
      args: [platformIndex, rolesToGrant]
    });
  
    const {
      write: grantRolesWrite,
      data: grantRolesData,
      error: grantRolesWriteError,
      isError: grantRolesIsError,
      isLoading: grantRolesIsLoading,
      isSuccess: grantRolesIsSuccess,
      status: grantRolesStatus,
    } = useContractWrite(grantRolesConfig);
  
    // Wait for data from setRegistry call
    const { data: grantRolesWaitData, isLoading: grantRolesWaitIsLoading } =
      useWaitForTransaction({
        hash: grantRolesData?.hash,
      });
  
    return {
      grantRolesConfig,
      grantRolesConfigError,
      grantRolesWrite,
      grantRolesWriteError,
      grantRolesData,
      grantRolesIsError,
      grantRolesIsLoading,
      grantRolesIsSuccess,
      grantRolesStatus,
      grantRolesWaitData,
      grantRolesWaitIsLoading,
    };
  }
  
  export default useGrantRoles;