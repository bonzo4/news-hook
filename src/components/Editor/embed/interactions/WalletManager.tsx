import { EmbedData } from "@/lib/data/EmbedData";
import { WalletInteraction } from "@/lib/data/interactions.ts/wallet";
import { SetStateAction } from "react";

type WalletManagerProps = {
  embed: EmbedData;
  walletId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function WalletManager({
  embed,
  walletId,
  setEmbeds,
}: WalletManagerProps) {
  const wallet = embed.interactions.find(
    (i) => i.id === walletId
  ) as WalletInteraction;

  const setSolWallet = (value: boolean) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === walletId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== walletId
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...wallet,
        sol: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const setEthWallet = (value: boolean) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === walletId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== walletId
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...wallet,
        eth: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  return (
    <div>
      <div className="flex flex-row space-x-2">
        <input
          type="checkbox"
          checked={wallet.sol}
          onChange={(e) => setSolWallet(e.target.checked)}
        />
        <label>Solana Wallet</label>
      </div>
      <div className="flex flex-row space-x-2">
        <input
          type="checkbox"
          checked={wallet.eth}
          onChange={(e) => setEthWallet(e.target.checked)}
        />
        <label>Ethereum Wallet</label>
      </div>
    </div>
  );
}
