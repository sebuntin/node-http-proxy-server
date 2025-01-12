import find from 'find';
import Jasmine from 'jasmine';
import { argv } from 'process';
import {getLogger} from "@src/logger/MyLogger";


// Init Jasmine
const jasmine = new Jasmine();
const logger = getLogger();
jasmine.exitOnCompletion = false;

// Set location of test files
jasmine.loadConfig({
  random: true,
  spec_dir: 'spec',
  spec_files: [
    './tests/**/*.spec.ts',
  ],
  stopSpecOnExpectationFailure: false,
});

// Run all or a single unit-test
let execResp: Promise<jasmine.JasmineDoneInfo> | undefined;
if (!!argv[2]) {
  const testFile = argv[2];
  find.file(testFile + '.spec.ts', './spec', (files: string[]) => {
    if (files.length === 1) {
      jasmine.execute([files[0]]);
    } else {
      logger.error('Test file not found!');
    }
  });
} else {
  execResp = jasmine.execute();
}

// Wait for tests to finish
(async () => {
  if (!!execResp) {
    const info = await execResp;
    if (info.overallStatus === 'passed') {
      logger.info('All tests have passed :)');
    } else {
      logger.error('At least one test has failed :(');
    }
  }
})();
