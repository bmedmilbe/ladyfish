import useGroundGeneralAll from "../useGroundGeneralAll";
import type { Measure } from "./useProducts";

export const useMeasure = () =>
  useGroundGeneralAll<Measure>("measures", "measures");

export const measureCopy = { id: 0, name: "", title: "" };
