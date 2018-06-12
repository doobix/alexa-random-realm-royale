/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeRealmRoyale = require('see-realm-royale');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomRealmRoyale');
  },
  'GetRandomRealmRoyale': function() {
    const srr = new SeeRealmRoyale();
    const randomClass = srr.getRandomClass();
    const randomForge = srr.getRandomForge();
    const speechOutput = `Here's your random Realm Royale class and forge: ${randomClass}, and ${randomForge}`;
    this.emit(':tellWithCard', speechOutput, 'Random Realm Royale', speechOutput);
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random class and forge in Realm Royale. Would you like to hear it?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomRealmRoyale');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
