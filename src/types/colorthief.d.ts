declare module "colorthief" {
  export default class ColorThief {
    /**
     * @param img
     * @param quality
     * is an optional argument that must be an Integer of value 1 or greater,
     *  and defaults to 10. The number determines how many pixels are skipped before the next one is sampled.
     *  We rarely need to sample every single pixel in the image to get good results.
     *  The bigger the number, the faster a value will be returned.
     */
    getColor(img: HTMLImageElement, quality?: number): [number, number, number];
  }
}
