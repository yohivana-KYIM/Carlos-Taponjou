import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@/styles/locomotive-scroll.css";

import { DM_Sans } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <div className={dmSans.className}>
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
};

export default MyApp;
