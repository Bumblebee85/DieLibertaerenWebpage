/** Spenden- und Zahlungsdaten für /werde-unterstuetzer */
export const donationInfo = {
  recipient: "DIE LIBERTÄREN e.V.",
  iban: "DE31 7601 0085 0175 7068 54",
  bic: "PBNKDEFFXXX",
  creditorId: "DE5900V00002522071",
  paypalUrl: "https://www.paypal.com/donate/?hosted_button_id=MNAGH3MYVV6G6",
  taxNote:
    "Spenden an DIE LIBERTÄREN e.V. können zu 50 % steuerlich abgesetzt werden.",
  crypto: [
    {
      id: "lightning",
      coin: "Bitcoin (BTC)",
      network: "Lightning (LN)",
      address: null,
      qrImage: "https://die-libertaeren.de/wp-content/uploads/2023/08/qr-250-lightning.png",
      qrImageAlt: "QR-Code Bitcoin Lightning Spende",
    },
    {
      id: "btc-legacy",
      coin: "Bitcoin (BTC)",
      network: "Bitcoin (On-Chain)",
      address: null,
      qrImage: "https://die-libertaeren.de/wp-content/uploads/2023/08/qr-250-btc.png",
      qrImageAlt: "QR-Code Bitcoin On-Chain Spende",
    },
    {
      id: "btc-segwit",
      coin: "Bitcoin (BTC)",
      network: "SegWit (BTC)",
      address: "bc1qcwrp97ewaxdn6fcny65m2xctm2t2dlq8c5jmph",
      qrImage: "https://die-libertaeren.de/wp-content/uploads/2023/08/qr-250-btc-segwit.png",
      qrImageAlt: "QR-Code Bitcoin SegWit Spende",
    },
    {
      id: "eth",
      coin: "Ethereum (ETH)",
      network: "Ethereum (ERC20)",
      address: "0xf0782427fb006846458e8e4b5d78e829326c53d7",
      qrImage: "https://die-libertaeren.de/wp-content/uploads/2023/08/qr-250-eth.png",
      qrImageAlt: "QR-Code Ethereum Spende",
    },
  ],
} as const;