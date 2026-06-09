import remToPx from "postcss-rem-to-responsive-pixel";

export default {
  plugins: [
    remToPx({
      rootValue: 16,
      propList: ["*"],
      transformUnit: "px",
      exclude: (file) => !file?.includes("steam.content"),
    }),
  ],
};
