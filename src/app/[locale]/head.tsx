import { createTranslator } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Head({ params: { locale } }: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    redirect("/");
  }
  const t = createTranslator({ locale, messages });

  return (
    <>
      <title>Chat-bot GPT</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={`${t("head.description")}`} />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1192136275433069"
        crossOrigin="anonymous"
      ></script>
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
