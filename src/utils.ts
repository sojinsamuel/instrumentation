/*
 * Copyright (C) 2021 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonos
 *
 * This file is part of Project Fonos
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ProjectInfo } from "./types";
import * as path from "path";
const INSTRUMENTATION_FILE =
  process.env.INSTRUMENTATION || path.join(require("os").homedir(), ".fonoster", "instrumentation.json");

let projects;

try {
  projects = require(INSTRUMENTATION_FILE);
} catch(e) {
  console.log("Instrumentation file not found or file is malformed.");
  process.exit(1);
}

export async function getProjectInfo(projectId: string): Promise<ProjectInfo> {
  try {
    const result = projects.filter(project => project.projectId === projectId)[0]
    if (!result) {
      throw "Not found"
    }
    return result;
  } catch(e) {
    return null
  }
}
