import React, { useEffect, useRef } from "react";

import { createChart, CandlestickSeries } from "lightweight-charts";

const ranges = {
  "1D": 1,
  "7D": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  ALL: 365,
};

export default function BtcChart({
  currentPrice,
  timeframe = "1D",
  setRsiData,
  setBullishDivergence,
}) {
  const chartRef = useRef(null);

  const chartInstance = useRef(null);

  const candleSeriesRef = useRef(null);

  // =========================
  // RSI CALCULATION
  // =========================
  const calculateRSI = (closes, period = 14) => {
    if (closes.length < period + 1) {
      return [];
    }

    const gains = [];
    const losses = [];

    for (let i = 1; i < closes.length; i++) {
      const diff = closes[i] - closes[i - 1];

      gains.push(diff > 0 ? diff : 0);

      losses.push(diff < 0 ? -diff : 0);
    }

    const rsi = [];

    for (let i = period; i < gains.length; i++) {
      const avgGain =
        gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;

      const avgLoss =
        losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;

      const rs = avgGain / (avgLoss || 1);

      const value = 100 - 100 / (1 + rs);

      rsi.push({
        value,
      });
    }

    return rsi;
  };

  // =========================
  // BULLISH RSI DIVERGENCE
  // =========================
  const detectBullishDivergence = (candles, rsiData) => {
    if (candles.length < 30 || rsiData.length < 30) {
      return false;
    }

    // หา pivot low
    const pivotLows = [];

    const lookback = 3;

    for (let i = lookback; i < candles.length - lookback; i++) {
      const low = candles[i].low;

      let isPivot = true;

      for (let j = 1; j <= lookback; j++) {
        if (low >= candles[i - j].low || low >= candles[i + j].low) {
          isPivot = false;

          break;
        }
      }

      if (isPivot) {
        pivotLows.push(i);
      }
    }

    // ต้องมี low อย่างน้อย 2 จุด
    if (pivotLows.length < 2) {
      return false;
    }

    // ใช้ low ล่าสุด 2 จุด
    const prevIndex = pivotLows[pivotLows.length - 2];

    const lastIndex = pivotLows[pivotLows.length - 1];

    const prevPrice = candles[prevIndex].low;

    const lastPrice = candles[lastIndex].low;

    const prevRsi = rsiData[prevIndex - 14]?.value;

    const lastRsi = rsiData[lastIndex - 14]?.value;

    if (!prevRsi || !lastRsi) {
      return false;
    }

    // bullish divergence
    const bullish = lastPrice < prevPrice && lastRsi > prevRsi;

    console.log({
      prevPrice,
      lastPrice,
      prevRsi,
      lastRsi,
      bullish,
    });

    return bullish;
  };

  // =========================
  // CREATE CHART
  // =========================
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,

      height: 420,

      layout: {
        background: {
          color: "transparent",
        },

        textColor: "#71717a",
      },

      grid: {
        vertLines: {
          color: "rgba(255,255,255,0.03)",
        },

        horzLines: {
          color: "rgba(255,255,255,0.03)",
        },
      },

      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.05)",
      },

      timeScale: {
        borderColor: "rgba(255,255,255,0.05)",

        timeVisible: true,

        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",

      downColor: "#ec4899",

      borderVisible: false,

      wickUpColor: "#22c55e",

      wickDownColor: "#ec4899",
    });

    chartInstance.current = chart;

    candleSeriesRef.current = candleSeries;

    const handleResize = () => {
      if (!chartRef.current) return;

      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, []);

  // =========================
  // FETCH OHLC
  // =========================
  useEffect(() => {
    const fetchOHLC = async () => {
      try {
        const days = ranges[timeframe] || 1;

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`,
        );

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Invalid OHLC data");
          return;
        }

        const formatted = data.map((item) => ({
          time: item[0] / 1000,

          open: item[1],

          high: item[2],

          low: item[3],

          close: item[4],
        }));

        // update candle
        candleSeriesRef.current?.setData(formatted);

        chartInstance.current?.timeScale().fitContent();

        // RSI
        const closes = formatted.map((candle) => candle.close);

        const rsi = calculateRSI(closes);

        setRsiData?.(rsi);

        // divergence
        const divergence = detectBullishDivergence(formatted, rsi);

        setBullishDivergence?.(divergence);
      } catch (error) {
        console.error("OHLC fetch failed:", error);
      }
    };

    fetchOHLC();

    const interval = setInterval(fetchOHLC, 30000);

    return () => clearInterval(interval);
  }, [timeframe, currentPrice, setRsiData, setBullishDivergence]);

  return <div ref={chartRef} className="w-full h-[420px]" />;
}
