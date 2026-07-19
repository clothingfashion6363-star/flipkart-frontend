import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Flipkart Clone - Online Shopping",
  description: "A premium clone of the Flipkart e-commerce website.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  let initialData = { products: [], categories: [], banners: [], settings: null };
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const [productsRes, categoriesRes, bannersRes, settingsRes] = await Promise.all([
      fetch(`${apiUrl}/products`, { cache: "no-store" }).catch(() => null),
      fetch(`${apiUrl}/categories`, { cache: "no-store" }).catch(() => null),
      fetch(`${apiUrl}/banners`, { cache: "no-store" }).catch(() => null),
      fetch(`${apiUrl}/settings`, { cache: "no-store" }).catch(() => null),
    ]);

    if (productsRes?.ok) {
      const data = await productsRes.json();
      initialData.products = data.data || data || [];
    }
    if (categoriesRes?.ok) {
      const data = await categoriesRes.json();
      initialData.categories = data.data || data || [];
    }
    if (bannersRes?.ok) {
      const data = await bannersRes.json();
      initialData.banners = data.data || data || [];
    }
    if (settingsRes?.ok) {
      const data = await settingsRes.json();
      initialData.settings = data.data || data || null;
    }
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }

  return (
    <html lang="en" className={`${roboto.variable} antialiased`}>
      <head>
        {initialData.settings?.metaPixelIds?.length > 0 && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                ${initialData.settings.metaPixelIds.map(id => `fbq('init', '${id}');`).join('\n                ')}
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
        
        {initialData.settings?.metaPixelIds?.map((id, index) => (
          <noscript key={`meta-ns-${id}-${index}`}>
            <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} />
          </noscript>
        ))}

        {initialData.settings?.googleAnalyticsIds?.length > 0 && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${initialData.settings.googleAnalyticsIds[0]}`}></script>
        )}
        {initialData.settings?.googleAnalyticsIds?.length > 0 && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${initialData.settings.googleAnalyticsIds.map(id => `gtag('config', '${id}');`).join('\n                ')}
              `,
            }}
          />
        )}
      </head>
      <body suppressHydrationWarning>
        <AppProvider initialData={initialData}>
          <div className="mobile-view">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
