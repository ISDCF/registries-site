/*
Copyright (c) 2020, InterSociety Digital Cinema Forum
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const path = require('path');
const fs = require('fs');
const proc = require("child_process");

const DATA_PATH = "src/main/templates/";
const DATA_BUILD_PATH = "src/main/scripts/%s.build.js"; 

/* load and build the templates */

for (const dataFile of fs.readdirSync(DATA_PATH).filter(f => /.hbs$/.test(f))) {
  const name = path.basename(dataFile, ".hbs")
  const buildFile = DATA_BUILD_PATH.replace("%s", name)

  console.log(`Building ${name} started`)
  var success = true;

  try {
  buildCommand = proc.execSync('node ' + buildFile).toString().trim();
  } catch (e) {
    success = false;
  }

  if(success) {
    console.log(`Building ${name} completed successfully`)
  }

}

