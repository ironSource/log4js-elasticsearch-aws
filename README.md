# log4js-elasticsearch-aws

## Synopsis

Extension for the [log4js-elasticsearch](https://www.npmjs.com/package/log4js-elasticsearch)
which uses the [AWS SDK](https://www.npmjs.com/package/aws-sdk) to sign requests
allowing you to use user/role based policies for AWS Elasticsearch Service.

The usage is identical to that of [log4js-elasticsearch](https://www.npmjs.com/package/log4js-elasticsearch) with the following expections:
* The appender name should be `log4js-elasticsearch-aws` instead of `log4js-elasticsearch`
* If you are using a credentials file, EC2 instance role or environment variables, no further changes are needed
* If you are explicity setting an AWS keypair (usually not good practice!), initialize
the keypair by maniplulating AWS.config [as documented here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html)

## LICENSE

Copyright 2015 Issac Goldstand <margol@beamartyr.net>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

