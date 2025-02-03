import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as directoryservice from 'aws-cdk-lib/aws-directoryservice';
import { Construct } from 'constructs';

interface ManagedAdProps {
  vpc: ec2.Vpc;
}

export class ActiveDirectory extends Construct {
  directoryId: string;
  constructor(scope: Construct, id: string, props: ManagedAdProps) {
    super(scope, id);
    // AWS Managed AD 作成
    const managedAd = new directoryservice.CfnMicrosoftAD(this, 'ManagedAD', {
      name: 'fossa.local',
      password: 'P@ssword_000',
      vpcSettings: {
        subnetIds: props.vpc.privateSubnets.map((subnet) => subnet.subnetId),
        vpcId: props.vpc.vpcId,
      }, 
      edition: 'Standard',
    });
  this.directoryId = managedAd.ref;
  }
}
