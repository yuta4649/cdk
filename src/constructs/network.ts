import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface NetworkProps {
  cidr: string;
}
export class Network extends Construct {
  vpc: ec2.Vpc;
  constructor(scope: Construct, id: string, props: NetworkProps) {
    super(scope, id);
    this.vpc = new ec2.Vpc(this, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr(props.cidr),
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'PublicSubnet',
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          name: 'PrivateSubnet',
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        }
      ],
      natGateways: 1
    });
  }
}
