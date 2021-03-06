// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:57221/api/',
  aws_bucket: 'dev-brandedsiteassets',
  aws_bucket_url: 'https://s3.eu-west-2.amazonaws.com/',
  uploadFileSize: 2000000
};
