import React from "react";

// Lottie player is heavy — load it only when an animation is actually rendered
const DotLottieReact = React.lazy(() =>
  import("@lottiefiles/dotlottie-react").then((m) => ({ default: m.DotLottieReact }))
);

export default function Lottie(props) {
  return (
    <React.Suspense fallback={null}>
      <DotLottieReact autoplay loop {...props} />
    </React.Suspense>
  );
}
