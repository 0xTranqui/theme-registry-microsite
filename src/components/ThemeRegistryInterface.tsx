import React, { use, useState } from 'react';
import { useGrantRoles } from '../hooks/useGrantRoles';
import { useNewPlatformIndex } from '../hooks/useNewPlatformIndex';
import { useAccount } from 'wagmi';

type Role = {
  account: `0x${string}`;
  role: number;
};

export function ThemeRegistryInterface() {
    const [rolesInput, setRolesInput] = useState('');
    const [platformIndex, setPlatformIndex] = useState<bigint>(BigInt(1));

  const parseRolesInput = (): Role[] => {
    return rolesInput
      .split(',')
      .map(account => account.trim())
      .map(account => ({ account: account as `0x${string}`, role: 2 }));
  };

  const roles = parseRolesInput();
  const { grantRolesWrite } = useGrantRoles(platformIndex, roles);


  const {address} = useAccount()
  const addressInput = address ? address : "0x0000000000000000000000000000000000000000"

  const { writeSetRegistry } = useNewPlatformIndex(addressInput)

  return (
    <div className="border p-8 w-96 mx-auto text-center">
      <h3 className="border-b pb-2">Theme Interface</h3>     
      <div className="mt-4">
        <button onClick={writeSetRegistry} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded">
          New Platform Index
        </button>
      </div>        
      <textarea
        value={platformIndex.toString()}
        onChange={(e) => setPlatformIndex(BigInt(e.target.value))}
        placeholder="Provide platformIndex you want to target"
        className="w-full h-12 mt-4 p-2 border resize-none" // Added 'border' and 'resize-none' classes
      />      
      <textarea
        value={rolesInput}
        onChange={(e) => setRolesInput(e.target.value)}
        placeholder="Paste Ethereum addresses here, e.g. 0x0000000000000000000000000000000000000001, 0x0000000000000000000000000000000000000002"
        className="w-full h-24 mt-4 p-2 border resize-none" // Added 'border' and 'resize-none' classes
      />
      <div className="mt-4">
        <button onClick={grantRolesWrite} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded">
          Grant Roles
        </button>
      </div>
    </div>
  );
};