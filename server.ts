import { auth } from '@tensei/auth';
import { graphql } from '@tensei/graphql';
import { media } from '@tensei/media';
import {
  welcome,
  tensei,
  cors,
  resource,
  text,
  textarea,
  dateTime,
  slug,
  hasMany,
  belongsTo,
} from '@tensei/core';
import { cms } from '@tensei/cms';

export default tensei()
  .databaseConfig({
    type: 'mongo',
    dbName: 'cluster0',
    user: '',
    password: '',
  })
  .root(__dirname)
  .resources([
    resource('Post').fields([
      text('Title'),
      slug('Slug').from('Title'),
      textarea('Description'),
      textarea('Content'),
      dateTime('Published At'),
      belongsTo('Category'),
    ]),
    resource('Category').fields([
      text('Name'),
      textarea('Description'),
      hasMany('Post'),
    ]),
  ])
  .plugins([
    welcome(),
    cms().plugin(),
    media().graphql().plugin(),
    auth().plugin(),
    graphql().plugin(),
    cors(),
  ])
  .start()
  .catch(console.error);
