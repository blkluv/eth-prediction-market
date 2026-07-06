import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },

    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },

        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        trading: {
          buy: "#10B981",
          sell: "#EF4444",
          neutral: "#64748B",
          blue: "#2563EB",
        },
      },

      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "var(--radius)",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },

      boxShadow: {
        soft:
          "0 2px 8px rgba(15,23,42,.05)",

        card:
          "0 4px 24px rgba(15,23,42,.08)",

        floating:
          "0 12px 40px rgba(15,23,42,.12)",

        glass:
          "0 8px 32px rgba(2,6,23,.12)",

        glow:
          "0 0 30px rgba(59,130,246,.25)",

        success:
          "0 0 20px rgba(16,185,129,.25)",

        danger:
          "0 0 20px rgba(239,68,68,.25)",
      },

      backdropBlur: {
        xs: "2px",
        glass: "20px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,1,.36,1)",
      },

      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-4px)",
          },
        },

        pulseGreen: {
          "0%": {
            backgroundColor: "transparent",
          },
          "50%": {
            backgroundColor: "rgba(16,185,129,.18)",
          },
          "100%": {
            backgroundColor: "transparent",
          },
        },

        pulseRed: {
          "0%": {
            backgroundColor: "transparent",
          },
          "50%": {
            backgroundColor: "rgba(239,68,68,.18)",
          },
          "100%": {
            backgroundColor: "transparent",
          },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },

        ticker: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.03)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },

      animation: {
        float: "float 4s ease-in-out infinite",

        fade: "fadeUp .35s ease-out",

        ticker: "ticker .25s ease",

        success: "pulseGreen .8s ease",

        danger: "pulseRed .8s ease",

        shimmer: "shimmer 1.6s linear infinite",
      },

      backgroundImage: {
        hero:
          "radial-gradient(circle at top, rgba(59,130,246,.15), transparent 60%)",

        card:
          "linear-gradient(to bottom, rgba(255,255,255,.03), transparent)",

        success:
          "linear-gradient(135deg,#10B981,#22C55E)",

        danger:
          "linear-gradient(135deg,#EF4444,#DC2626)",

        primary:
          "linear-gradient(135deg,#2563EB,#3B82F6)",
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      maxWidth: {
        trading: "1600px",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
