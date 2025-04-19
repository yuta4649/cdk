import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs';

interface ActiveDirectoryProps {
  vpc: ec2.Vpc;
}

export class ActiveDirectory extends Construct {
  constructor(scope: Construct, id: string, props: ActiveDirectoryProps) {
    super(scope, id);

    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    new ec2.Instance(this, 'Instance', {
      vpc: props.vpc,
      machineImage: ec2.MachineImage.latestWindows(ec2.WindowsVersion.WINDOWS_SERVER_2019_JAPANESE_FULL_BASE),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
      keyName: 'ec2-key'
    });
  }
}
