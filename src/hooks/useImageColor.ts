import ColorThief from "colorthief";

export default function useImageColor() {
  const thief = new ColorThief();
  const getImageColor = (cover: string): Promise<[number, number, number]> => {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image();
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          let coverUrl = URL.createObjectURL(this.response);
          image.onload = function () {
            let color = thief.getColor(image, 5);
            URL.revokeObjectURL(coverUrl);
            resolve(color);
          };
          image.src = coverUrl;
        };
        xhr.open("GET", cover, true);
        xhr.responseType = "blob";
        xhr.send();
      } catch (error) {
        reject(error);
      }
    });
  };
  return { getImageColor };
}
