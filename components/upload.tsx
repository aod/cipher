import { Upload as UploadIcon } from "lucide-react";

import Button from "./button";

export default function Upload() {
  return (
    <div className="flex">
      <Button position="left" href="/insert">
        Insert code
      </Button>
      <Button resize position="right">
        <UploadIcon className="w-4 h-4 lg:w-5 lg:h-5" />
      </Button>
    </div>
  );
}
