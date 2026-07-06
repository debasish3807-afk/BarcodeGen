// ======================
// SDK & Code Examples
// ======================

export interface SDKLanguage {
  id: string;
  name: string;
  icon: string;
  installCommand: string;
  example: string;
}

export const SDK_LANGUAGES: SDKLanguage[] = [
  { id: "javascript", name: "JavaScript", icon: "js", installCommand: "npm install @barcodegen/sdk", example: `import { BarcodeGen } from '@barcodegen/sdk';\n\nconst client = new BarcodeGen({ apiKey: 'YOUR_API_KEY' });\n\nconst barcode = await client.barcode.create({\n  value: '5901234123457',\n  format: 'EAN13',\n  options: { width: 2, height: 100 }\n});\n\nconsole.log(barcode.imageUrl);` },
  { id: "typescript", name: "TypeScript", icon: "ts", installCommand: "npm install @barcodegen/sdk", example: `import { BarcodeGen, BarcodeFormat } from '@barcodegen/sdk';\n\nconst client = new BarcodeGen({ apiKey: 'YOUR_API_KEY' });\n\nconst barcode = await client.barcode.create({\n  value: '5901234123457',\n  format: BarcodeFormat.EAN13,\n  options: { width: 2, height: 100 }\n});\n\nconsole.log(barcode.imageUrl);` },
  { id: "python", name: "Python", icon: "py", installCommand: "pip install barcodegen", example: `from barcodegen import BarcodeGen\n\nclient = BarcodeGen(api_key="YOUR_API_KEY")\n\nbarcode = client.barcode.create(\n    value="5901234123457",\n    format="EAN13",\n    options={"width": 2, "height": 100}\n)\n\nprint(barcode.image_url)` },
  { id: "java", name: "Java", icon: "java", installCommand: "// Maven\n<dependency>\n  <groupId>com.barcodegen</groupId>\n  <artifactId>sdk</artifactId>\n  <version>1.0.0</version>\n</dependency>", example: `import com.barcodegen.BarcodeGen;\nimport com.barcodegen.models.*;\n\nBarcodeGen client = new BarcodeGen("YOUR_API_KEY");\n\nBarcode barcode = client.barcode().create(\n    new BarcodeRequest()\n        .value("5901234123457")\n        .format("EAN13")\n        .width(2)\n        .height(100)\n);\n\nSystem.out.println(barcode.getImageUrl());` },
  { id: "kotlin", name: "Kotlin", icon: "kt", installCommand: "implementation(\"com.barcodegen:sdk:1.0.0\")", example: `import com.barcodegen.BarcodeGen\n\nval client = BarcodeGen(apiKey = "YOUR_API_KEY")\n\nval barcode = client.barcode.create(\n    value = "5901234123457",\n    format = "EAN13",\n    options = mapOf("width" to 2, "height" to 100)\n)\n\nprintln(barcode.imageUrl)` },
  { id: "php", name: "PHP", icon: "php", installCommand: "composer require barcodegen/sdk", example: `<?php\nuse BarcodeGen\\Client;\n\n$client = new Client('YOUR_API_KEY');\n\n$barcode = $client->barcode->create([\n    'value' => '5901234123457',\n    'format' => 'EAN13',\n    'options' => ['width' => 2, 'height' => 100]\n]);\n\necho $barcode->imageUrl;` },
  { id: "csharp", name: "C#", icon: "cs", installCommand: "dotnet add package BarcodeGen.SDK", example: `using BarcodeGen;\n\nvar client = new BarcodeGenClient("YOUR_API_KEY");\n\nvar barcode = await client.Barcode.CreateAsync(new BarcodeRequest\n{\n    Value = "5901234123457",\n    Format = "EAN13",\n    Options = new { Width = 2, Height = 100 }\n});\n\nConsole.WriteLine(barcode.ImageUrl);` },
  { id: "go", name: "Go", icon: "go", installCommand: "go get github.com/barcodegen/sdk-go", example: `package main\n\nimport (\n    "fmt"\n    barcodegen "github.com/barcodegen/sdk-go"\n)\n\nfunc main() {\n    client := barcodegen.NewClient("YOUR_API_KEY")\n\n    barcode, _ := client.Barcode.Create(&barcodegen.BarcodeRequest{\n        Value:  "5901234123457",\n        Format: "EAN13",\n        Width:  2,\n        Height: 100,\n    })\n\n    fmt.Println(barcode.ImageURL)\n}` },
  { id: "curl", name: "cURL", icon: "terminal", installCommand: "# No installation needed", example: `curl -X POST https://api.barcodegen.com/v1/barcodes \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "value": "5901234123457",\n    "format": "EAN13",\n    "options": { "width": 2, "height": 100 }\n  }'` },
];
