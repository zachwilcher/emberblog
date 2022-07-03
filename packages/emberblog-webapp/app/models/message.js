import { attr } from '@ember-data/model';
import { ResourceModel } from 'ember-blueprint-data';

export default class MessageModel extends ResourceModel {
  @attr sender;
  @attr content;
}
