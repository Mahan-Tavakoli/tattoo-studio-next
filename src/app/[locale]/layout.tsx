import Providers from "@/components/providers/Providers";
import UtmProvider from "@/components/providers/UtmProvider";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import Navigation from "@/components/templates/Navigation";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <UtmProvider />
        <main className="container max-w-screen 2xl:max-w-screen-2xl 2xl:mx-auto overflow-x-hidden 2xl:relative bg-carbon-black text-snow min-h-dvh">
          <Header />
          {children}
          <Footer />
        </main>

        <Navigation />

        <ToastContainer
          position="top-left"
          autoClose={5000}
          closeOnClick
          pauseOnHover
          newestOnTop
          hideProgressBar={false}
          closeButton={false}
          toastClassName="custom-toast"
          progressClassName="custom-toast-progress"
        />
      </Providers>
    </NextIntlClientProvider>
  );
}

export default LocaleLayout;
