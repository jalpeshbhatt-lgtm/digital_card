import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName =
      Date.now() + "-" + file.name.replace(/\s+/g, "-");

    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    // Create folder automatically if missing
    await mkdir(uploadsDir, {
      recursive: true,
    });

    const uploadPath = path.join(
      uploadsDir,
      fileName
    );

    console.log("Uploading file:", file.name);
    console.log("Saving to:", uploadPath);

    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}