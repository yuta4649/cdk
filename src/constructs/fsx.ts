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
    this.fsx = new fsx.CfnFileSystem(this, 'FsxWindows', {
        fileSystemType: 'WINDOWS',
        storageCapacity: 1,
        subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId)
    })
  }
}
