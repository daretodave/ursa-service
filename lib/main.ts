import "reflect-metadata";

import {run} from "./server";
import {error} from "./logger";

run().catch(error);