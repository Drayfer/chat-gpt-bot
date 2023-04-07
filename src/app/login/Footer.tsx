import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="h-[1px] bg-slate-300/50 mb-3 mt-6" />
      <div className="flex justify-between flex-wrap">
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="https://t.me/chat_gpt_application"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developer&apos;s Page
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/upgrade"
        >
          Price
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/agreement"
        >
          Agreement
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/privacy"
        >
          Privacy
        </Link>
      </div>
    </div>
  );
}
