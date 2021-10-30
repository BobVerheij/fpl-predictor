import { useStore } from "../stores/ZustandStore";

export const resetAllPlayerHistory = () => {
  const bootstrap = useStore((state) => state.bootstrap);
  const liveDetails = useStore((state) => state.liveDetails);
};
