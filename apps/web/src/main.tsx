import { hydrateRoot } from "react-dom/client";

import { StartClient } from "@tanstack/start/client";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
