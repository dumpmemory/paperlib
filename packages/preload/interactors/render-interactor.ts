// @ts-ignore
import * as pdfjs from "pdfjs-dist/build/pdf";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";

export class RenderInteractor {
  constructor() {
    pdfjs.GlobalWorkerOptions.workerPort = new Worker("./pdf.worker.min.js");
  }

  async render(fileURL: string) {
    // @ts-ignore
    const pdf = await pdfjs.getDocument(fileURL).promise;
    const page = await pdf.getPage(1);
    var scale = 0.25;
    var viewport = page.getViewport({ scale: scale });
    var outputScale = window.devicePixelRatio || 1;
    var canvas = document.getElementById("preview-canvas") as HTMLCanvasElement;
    var context = canvas.getContext("2d");
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    var transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
    var renderContext = {
      canvasContext: context,
      transform: transform,
      viewport: viewport,
    } as RenderParameters;
    await page.render(renderContext).promise;
    return true;
  }
}
