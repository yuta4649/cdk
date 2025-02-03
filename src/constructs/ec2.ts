import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface Ec2Props {
  vpc: ec2.Vpc;
}

export class Ec2 extends Construct {
  instanceId: String[];
  constructor(scope: Construct, id: string, props: Ec2Props) {
    super(scope, id);
    const instanceType = new ec2.InstanceType('t3.large');
    const ami = ec2.MachineImage.latestWindows(ec2.WindowsVersion.WINDOWS_SERVER_2019_JAPANESE_FULL_BASE);
    // セキュリティグループを作成
    const securityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true, //インターネットへのアウトバウンド通信を許可
    });

    
  }
}
