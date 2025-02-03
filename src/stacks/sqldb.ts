import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Network } from '../constructs/network'

export class Sqldb extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new Network(this, 'Network')
  }
}
