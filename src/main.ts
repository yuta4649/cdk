#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeployStack } from './stacks/deploy-stack';
import { demoConfig } from './config/config';

const app = new cdk.App();
new DeployStack(app, demoConfig.config.name + 'Stack', {
  config: demoConfig.config,
  parameters: demoConfig.parameters
});
