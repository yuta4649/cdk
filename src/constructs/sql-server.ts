import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as fsx from 'aws-cdk-lib/aws-fsx';
import { Construct } from 'constructs';

interface SqlServerProps {
  vpc: ec2.Vpc;
}

export class SqlServer extends Construct {
  instanceId: String[];
  constructor(scope: Construct, id: string, props: SqlServerProps) {
    super(scope, id);

    // quorum
    new fsx.CfnFileSystem(this, 'QuorumFsx', {
      fileSystemType: 'WINDOWS',
      subnetIds: props.vpc.privateSubnets.map(subnet => subnet.subnetId),
      storageCapacity: 1,
      windowsConfiguration: {
        throughputCapacity: 32,
        selfManagedActiveDirectoryConfiguration: {
          domainName: 'example.com',
          userName: 'Administorator',
          password: 'P@ssword_000',
          fileSystemAdministratorsGroup: 'Administorator'
        }
      }
    });

    // ec2
    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    new ec2.Instance(this, 'Instance', {
      vpc: props.vpc,
      machineImage: ec2.MachineImage.latestWindows(ec2.WindowsVersion.WINDOWS_SERVER_2019_JAPANESE_FULL_BASE),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.LARGE),
      keyName: 'ec2-key'
    });
  }
}
