/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {
  CliCommandExecution,
  CliCommandExecutor,
  CommandOutput
} from '@salesforce/salesforcedx-utils-vscode/out/src/cli';
import { expect } from 'chai';
import * as fs from 'fs';
import * as sinon from 'sinon';
import {
  forceDescribeMetadata,
  ForceDescribeMetadataExecutor
} from '../../../src/commands';

// tslint:disable:no-unused-expression
describe('Force Describe Metadata', () => {
  it('Should build describe metadata command', async () => {
    const forceDescribeMetadataExec = new ForceDescribeMetadataExecutor();
    const forceDescribeMetadataCmd = forceDescribeMetadataExec.build({});
    expect(forceDescribeMetadataCmd.toCommand()).to.equal(
      `sfdx force:mdapi:describemetadata --json --loglevel fatal`
    );
  });
  // skipped because of an issue stubbing a property
  xit('Should write a file with metadata describe output', async () => {
    const subscribeStub = sinon
      .stub(
        CliCommandExecutor.prototype.execute().processExitSubject,
        'subscribe'
      )
      .callsFake(() => {});

    const commandStub = sinon.stub(CliCommandExecutor.prototype, 'execute');
    const testStub = sinon
      .stub(CliCommandExecution.prototype, 'command')
      .returns({ logName: 'log' });

    const writeFileStub = sinon.stub(fs, 'writeFileSync');

    const outputFolder = '/test/folder/';
    const resultData = '{status: 0}';
    const cmdOutputStub = sinon
      .stub(CommandOutput.prototype, 'getCmdResult')
      .returns(resultData);

    const result = await forceDescribeMetadata(outputFolder);
    expect(writeFileStub.calledOnce).to.equal(true);
    expect(result).to.equal(resultData);

    writeFileStub.restore();
    cmdOutputStub.restore();
    subscribeStub.restore();
    commandStub.restore();
    testStub.restore();
  });
});
