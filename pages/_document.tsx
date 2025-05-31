import { Html, Head, Main, NextScript } from "next/document"
import { ThemeProvider } from "@/components/theme-provider"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Main />
          <NextScript />
        </ThemeProvider>
      </body>
    </Html>
  )
} 