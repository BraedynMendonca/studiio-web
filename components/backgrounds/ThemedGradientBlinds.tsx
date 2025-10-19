"use client"

import { useThemeStore } from "@/lib/themeStore";
import GradientBlinds from "./GradientBlinds/GradientBlinds";
import { lightenHexColor } from "@/lib/colorUtils";

export function ThemedGradientBlinds() {
  const color = useThemeStore((state) => state.color);

  return (
      <GradientBlinds
        gradientColors={[color]}
        angle={20}
        noise={0.15}
        blindCount={16}
        blindMinWidth={50}
        spotlightRadius={0.5}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.4}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
  );
}
