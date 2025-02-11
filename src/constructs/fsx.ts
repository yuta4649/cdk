import * as fsx from 'aws-cdk-lib/aws-fsx';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface FsxProps {
    vpc: ec2.Vpc;
}

export class Fsx extends Construct {
  fsx: fsx.CfnFileSystem;
  constructor(scope: Construct, id: string, props: FsxProps) {
    super(scope, id);
  }
}
