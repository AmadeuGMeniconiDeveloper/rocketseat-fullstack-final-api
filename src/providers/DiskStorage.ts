import fs from "fs";
import path from "path";

class DiskStorage {
  async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve("temp/", file),
      path.resolve("temp/uploads/", file)
    );

    return file;
  }

  async deleteFile(file: string) {
    const filePath = path.resolve("temp/uploads/", file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorage;
