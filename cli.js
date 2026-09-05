#!/usr/bin/env node
require("child_process").spawn("mstsc.exe", [], {detached:true,stdio:"ignore"}).unref();
