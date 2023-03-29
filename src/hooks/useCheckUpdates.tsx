"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateVersion } from "@/store/messagesSlice";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const AGENT = "Chrome/18.0.1025.133 Mobile Safari/535.19";

export default function useCheckUpdates() {
  const { versionNative } = useAppSelector((state) => ({
    versionNative: state.messages.versionNative,
  }));

  const [isUpdate, setIsUpdate] = useState(false);
  const sameValueRef = useRef(versionNative);
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    sameValueRef.current = versionNative;
  }, [versionNative]);

  useEffect(() => {
    const handleMessage = (event: any) => {
      dispatch(updateVersion(event.data));
    };

    if (!versionNative) {
      document.addEventListener("message", handleMessage);
    } else {
      document.removeEventListener("message", handleMessage);
    }
    return () => {
      document.removeEventListener("message", handleMessage);
    };
  }, [versionNative, dispatch]);

  useEffect(() => {
    if (session) {
      const timeoutId = setTimeout(() => {
        if (
          (sameValueRef.current !== process.env.VERSION &&
            process.env.NEED_UPDATE !== "false" &&
            navigator.userAgent === AGENT) ||
          process.env.NEED_UPDATE === "true"
        ) {
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
          if (
            window.ReactNativeWebView &&
            window.navigator.userAgent.includes(AGENT)
          ) {
            const webViewNotification = {
              adv: "banner",
            };
            window.ReactNativeWebView.postMessage(
              JSON.stringify(webViewNotification)
            );
          }
        }
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [session]);

  return { isUpdate };
}
