import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export const demoConfig: DemoConfig = {
  config: {
    name: 'Demo',
    env: {
      account: '528757830283',
      region: 'ap-northeast-1'
    }
  },
  parameters: {
    cidr: '10.0.0.0/16'
  }
}

export interface DemoParameters {
  // Network Properties
  cidr: string;
}

export interface BaseConfig {
  name: string;
  env: {
    account: string;
    region: string;
  };
}

export interface DemoConfig extends cdk.StackProps {
  config: BaseConfig;
  parameters: DemoParameters;
}
