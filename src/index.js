/**
  * index.js
  *
  * @author Jan-Markus Langer
  */

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

/**
  * returns a random int between 0 and range
  *
  * @param {Number} end
  *
  * @return {Number}
  */
const getRandomInt = end => Math.floor(Math.random() * end) + 0;

/**
  * quotes
  *
  * @var {Object}
  */
const quotes = {

  bernd: [
    "Wife. Home or not home.",
    "Mama Bacardi und ihr Gorilla.",
    "Ich würde jetzt auch lieber auf einer prallen 17 Jährigen liegen.",
    "Ein Hund im Büüüüroooooo?",
    "Jetzt krieg doch keinen afrikanischen.",
    "Das ist ja wie bei Hitlers Helfern.",
    "In jedem Fahrhaus läuft mehr als hier.",
    "Als Chef in meiner Position bist du so einsam wie Gott.",
    "Ja Erika mir geht es auch nicht soooooo gut.",
    "Als Chef in meiner Position bist du so einsam wie Gott.",
    "Aber hier mit Quasi Modus schwager rumdöddeln.",
    "Jesus. Das sieht ja aus wie ein Massengrab für Schokoriegel.",
  ],

  ernie: [
    "Da musst du aufpassen wie ein Lachs. Ehhhh Luchs.",
    "Jetzt ist jetzt alles wieder",
  ],

};

/**
  * all quotes together
  *
  * @var {Array}
  */
const sumQuotes = [];

// merge all quotes together
Object.keys(quotes).forEach((person) => {
  quotes[person].forEach((quote) => {
    sumQuotes.push(quote);
  });
});

/**
  * speechOutput
  */
let speechOutput;

/**
  * repromt
  */
let reprompt;

/**
  * welcome message
  *
  * @var {String}
  */
let welcomeOutput = "Hallo mein Name ist Berthold Heisterkamp von der Capitol AG. Was darf ich für Sie tun?";

/**
* welcomeReprompt
*
* @var {String}
*/
let welcomeReprompt = "Einen Kaffee oder andere kalte Getränke?";

"use strict";

const Alexa = require('alexa-sdk');

/**
  * APP_ID
  *
  * @var {Number}
  */
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

/**
  * speechOutput
  *
  * @var {String}
  */
speechOutput = '';

/**
  * handlers
  *
  * @param {Object}
  */
const handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', welcomeOutput, welcomeReprompt);
  },
  'AMAZON.HelpIntent': function () {
    speechOutput = 'Sagen Sie gib mir ein Zitat';
    reprompt = 'Was möchten Sie tun?';
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    speechOutput = 'Ulf jetzt hör endlich auf. Ich geh gleich zu Stromberg.';
    this.emit(':tell', speechOutput);
  },
  'AMAZON.StopIntent': function () {
    speechOutput = 'Ich geh jetzt zur Selbsthilfegruppe. Tschüsli';
    this.emit(':tell', speechOutput);
  },
  'SessionEndedRequest': function () {
    speechOutput = '';
    //this.emit(':saveState', true);//uncomment to save attributes to db on session end
    this.emit(':tell', speechOutput);
  },
  'AMAZON.NavigateHomeIntent': function () {
    speechOutput = '';

    this.emit(":ask", speechOutput, speechOutput);
  },
  'GetQuote': function () {
    speechOutput = '';
    speechOutput = quotes[getRandomInt(quotes.length)];

		let fromNameSlotRaw = this.event.request.intent.slots.fromName.value;
		let fromNameSlot = resolveCanonical(this.event.request.intent.slots.fromName);

    if (fromNameSlot) {

      const personArray = quotes[fromNameSlot];
      const personArrayLength = personArray.length;
      const randomInt = getRandomInt(personArrayLength);

      speechOutput = personArray[randomInt];

      this.emit(":ask", speechOutput, speechOutput);
    } else {
      speechOutput = quotes[getRandomInt(quotes)];
    }

    this.emit(":ask", speechOutput, speechOutput);
  },
  'Unhandled': function () {
    speechOutput = "Ich konnte Sie leider nicht verstehen, weil mich Ulf immer ärgert.";
    this.emit(':ask', speechOutput, speechOutput);
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};


function resolveCanonical(slot){
  //this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
  let canonical;
  try{
    canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  }catch(err){
    console.log(err.message);
    canonical = slot.value;
  };

  return canonical;
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
  if (this.event.request.dialogState === "STARTED") {
    console.log("in Beginning");
    let updatedIntent= null;
    // updatedIntent=this.event.request.intent;
    //optionally pre-fill slots: update the intent object with slot values for which
    //you have defaults, then return Dialog.Delegate with this updated intent
    // in the updatedIntent property
    //this.emit(":delegate", updatedIntent); //uncomment this is using ASK SDK 1.0.9 or newer

    //this code is necessary if using ASK SDK versions prior to 1.0.9
    if(this.isOverridden()) {
      return;
    }
    this.handler.response = buildSpeechletResponse({
      sessionAttributes: this.attributes,
      directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
      shouldEndSession: false
    });
    this.emit(':responseReady', updatedIntent);

  } else if (this.event.request.dialogState !== "COMPLETED") {
    console.log("in not completed");
    // return a Dialog.Delegate directive with no updatedIntent property.
    //this.emit(":delegate"); //uncomment this is using ASK SDK 1.0.9 or newer

    //this code necessary is using ASK SDK versions prior to 1.0.9
    if(this.isOverridden()) {
      return;
    }
    this.handler.response = buildSpeechletResponse({
      sessionAttributes: this.attributes,
      directives: getDialogDirectives('Dialog.Delegate', null, null),
      shouldEndSession: false
    });
    this.emit(':responseReady');

  } else {
    console.log("in completed");
    console.log("returning: "+ JSON.stringify(this.event.request.intent));
    // Dialog is now complete and all required slots should be filled,
    // so call your normal intent handler.
    return this.event.request.intent;
  }
}

function createSpeechObject(optionsParam) {
  if (optionsParam && optionsParam.type === 'SSML') {
    return {
      type: optionsParam.type,
      ssml: optionsParam['speech']
    };
  } else {
    return {
      type: optionsParam.type || 'PlainText',
      text: optionsParam['speech'] || optionsParam
    };
  }
}

function buildSpeechletResponse(options) {
  let alexaResponse = {
    shouldEndSession: options.shouldEndSession
  };

  if (options.output) {
    alexaResponse.outputSpeech = createSpeechObject(options.output);
  }

  if (options.reprompt) {
    alexaResponse.reprompt = {
      outputSpeech: createSpeechObject(options.reprompt)
    };
  }

  if (options.directives) {
    alexaResponse.directives = options.directives;
  }

  if (options.cardTitle && options.cardContent) {
    alexaResponse.card = {
      type: 'Simple',
      title: options.cardTitle,
      content: options.cardContent
    };

    if(options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
      alexaResponse.card.type = 'Standard';
      alexaResponse.card['image'] = {};

      delete alexaResponse.card.content;
      alexaResponse.card.text = options.cardContent;

      if(options.cardImage.smallImageUrl) {
        alexaResponse.card.image['smallImageUrl'] = options.cardImage.smallImageUrl;
      }

      if(options.cardImage.largeImageUrl) {
        alexaResponse.card.image['largeImageUrl'] = options.cardImage.largeImageUrl;
      }
    }
  } else if (options.cardType === 'LinkAccount') {
    alexaResponse.card = {
      type: 'LinkAccount'
    };
  } else if (options.cardType === 'AskForPermissionsConsent') {
    alexaResponse.card = {
      type: 'AskForPermissionsConsent',
      permissions: options.permissions
    };
  }

  let returnResult = {
    version: '1.0',
    response: alexaResponse
  };

  if (options.sessionAttributes) {
    returnResult.sessionAttributes = options.sessionAttributes;
  }
  return returnResult;
}

function getDialogDirectives(dialogType, updatedIntent, slotName) {
  let directive = {
    type: dialogType
  };

  if (dialogType === 'Dialog.ElicitSlot') {
    directive.slotToElicit = slotName;
  } else if (dialogType === 'Dialog.ConfirmSlot') {
    directive.slotToConfirm = slotName;
  }

  if (updatedIntent) {
    directive.updatedIntent = updatedIntent;
  }
  return [directive];
}
