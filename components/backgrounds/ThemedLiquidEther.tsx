
"use client"

import { useThemeStore } from "@/lib/themeStore";
import LiquidEther from "./LiquidEther/liquidEther";
import { lightenHexColor } from "@/lib/colorUtils";

export function ThemedLiquidEther() {
  const color = useThemeStore((state) => state.color);

  const lighterColor = lightenHexColor(color, 10);
  const evenLighterColor = lightenHexColor(color, 20);


  return (
    <LiquidEther
      colors={[color, lighterColor, evenLighterColor]}
      mouseForce={20}
      cursorSize={100}
      isViscous={false}
      viscous={30}
      iterationsViscous={32}
      iterationsPoisson={32}
      resolution={0.5}
      isBounce={true}
      autoDemo={true}
      autoSpeed={0.5}
      autoIntensity={3.5}
      takeoverDuration={0.25}
      autoResumeDelay={3000}
      autoRampDuration={0.6}
    />
  );
}
