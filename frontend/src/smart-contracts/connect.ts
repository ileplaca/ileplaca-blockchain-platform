const { ethereum } = window as any;

export const connectWallet: () => Promise<string | null> = async () => {
  try {
    if (!ethereum) return alert('Please install metamask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};
