import type { Metadata } from "next";
import { BarcodeGeneratorClient } from "./_components/barcode-generator-client";

export const metadata: Metadata = {
  title: "Barcode Generator",
  description:
    "Generate professional barcodes online for free. Support for Code 128, Code 39, EAN-13, EAN-8, UPC-A, UPC-E, ITF, Codabar, MSI, GS1-128 and more. Download in PNG, SVG, PDF, JPG, WebP.",
  keywords: [
    "barcode generator",
    "free barcode maker",
    "Code 128 generator",
    "EAN-13 generator",
    "UPC barcode creator",
    "online barcode tool",
    "barcode download PNG SVG PDF",
  ],
};

export default function BarcodeGeneratorPage() {
  return <BarcodeGeneratorClient />;
}
