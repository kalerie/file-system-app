// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
//
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
//
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
//
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import './globals.css'
import { Metadata } from "next"
// import { ClerkProvider } from "@clerk/nextjs"
// import { dark } from "@clerk/themes"
// import Provider from "./Provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'DocSync',
  description: 'A real-time collaborative editor that lets multiple users create, edit, and share documents seamlessly from anywhere.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      // <ClerkProvider
      //     appearance={{
      //       // baseTheme: dark,
      //       variables: {
      //         colorPrimary: "#3371FF" ,
      //         fontSize: '16px'
      //       },
      //     }}
      // >
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen font-sans antialiased",
                fontSans.variable
            )}
        >
        {/* <Provider> */}
          {children}
        {/* </Provider> */}
        </body>
        </html>
      // </ClerkProvider>
  )
}