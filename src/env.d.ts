/// <reference path="../.astro/types.d.ts" />

interface Window {
  currentProjectIndex: number;
  changeProject: (index: number) => void;
}