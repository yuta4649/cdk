import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Network } from '../constructs/network'
import { DemoConfig } from '../config/config';
import { ActiveDirectory } from '../constructs/active-directory';

export class DeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DemoConfig) {
    super(scope, id, props);
    
    const network = new Network(this, 'Network', {cidr: props.parameters.cidr});

    new ActiveDirectory(this, 'ActiveDirectory', {
      vpc: network.vpc
    });
  }
}
