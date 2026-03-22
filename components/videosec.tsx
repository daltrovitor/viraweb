"use client"

import { Video } from "lucide-react";
import { useTranslation } from "@/lib/i18n"
import ScrollAnimate from "./scroll-animate"

export default function VideoSec() {
  const { t } = useTranslation()
  return (
    <>
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl text-secondary-foreground font-bold mb-6">
                {t("video.title1")}<span className="text-primary"> Vira</span><span className="text-secondary">Web</span>
              </h2>
              <p className="text-xl text-secondary-foreground text-gray-300 max-w-3xl mx-auto">
                {t("video.subtitle")}
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate>
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-primary">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video size={64} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t("video.placeholder")}</h3>
                    <p className="text-lg opacity-90">{t("video.soon")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center justify-center flex">
              <button className="mt-6 px-50 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer ">
                {t("video.button")}
              </button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </>
  );
}
