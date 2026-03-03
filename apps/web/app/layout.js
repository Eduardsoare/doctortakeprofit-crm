export const metadata = {
  title: 'DoctorTakeProfit CRM',
  description: 'Trading Education Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
