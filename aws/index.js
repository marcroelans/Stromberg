const Alexa = require('alexa-sdk');

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"] */

/**
  * returns a random int between 0 and range
  * @param {Number} end
  * @return {Number}
  */
const getRandomInt = end => Math.floor(Math.random() * end) + 0;

/**
  * quotes
  * @type {Object}
  */
const quotes = {
  bernd: [
    'Wife. Home or not home.',
    'Mama Bacardi und ihr Gorilla.',
    'Ich würde jetzt auch lieber auf einer prallen 17 Jährigen liegen.',
    'Ein Hund im Büüüüroooooo?',
    'Jetzt krieg doch keinen afrikanischen.',
    'Das ist ja wie bei Hitlers Helfern.',
    'In jedem Fahrhaus läuft mehr als hier.',
    'Als Chef in meiner Position bist du so einsam wie Gott.',
    'Ja Erika mir geht es auch nicht soooooo gut.',
    'Aber hier mit Quasi Modus schwager rumdöddeln.',
    'Jesus. Das sieht ja aus wie ein Massengrab für Schokoriegel.',
    'Jetzt mach mal halblang, viertellang würde mir auch schon reichen.',
    'Karriere ist kein Nonnen-Hockey, da musst du mit allen Tricks arbeiten.',
    'Schönheit ist ja oft nur ne Frage von Licht an oder Licht aus.',
    'Eine Firma ist wie ne Ehefrau, die fickt dich wenn du gar nicht mehr damit rechnest.',
    'Was dem an Grips fehlt, das gleicht er durch Blödheit wieder aus.',
    'Wenn das Heidelbeeren sind, dann heißt mein Opa Inge!',
    'Die besten Jahre kommen doch nach 45! War mit Deutschland ja genauso!',
    'Menschenführung ist für mich das was zum Beispiel das Stepptanzen für den Neger.. äh Farbigen ist. Das hab ich im Blut.',
    'Hätten Sie mir vorher gesagt das ich nochmal vorbei kommen soll, hätte ich mir noch wenigstens kurz feucht durch den Schritt gewischt.',
    'Also Behinderung ist kein Grund, hier die Magdalena ist Polin die arbeitet ja auch hier.',
    'Die Moslems sind die neuen Homosexuellen.',
    'Die Trefferquote bei Frauen ist bei mir höher, als die von nem Blinden beim Büchsen werden sag ich mal.',
    'Bei den Weibern ist es wie bei den Hobbits, am Ende geht es immer um nen Ring.',
    'Glauben sie, sie können mich hier behandeln wie Karl Arsch bei der Musterung oder was? Wir sind ja nicht hier bei den Baumwollpflückern!',
    'Man sollten den Arsch nie höher hängen als man scheisst.',
    'Eine frau ist ja nicht automatisch schlau nur weil sie Scheisse aussieht.',
    'Vom ganzen Umgangston bin ich ja normalerweise wie son Lamm im Lammpelz.',
    'Was dem an Grips fehlt, das gleicht er durch Blödheit wieder aus.',
    'Firma ist wie ne Ehefrau, die fickt dich wenn du gar nicht mehr damit rechnest',
    'Ich bin ja quasi die perfekte Mischung aus jung, aber sehr erfahren. Gibts in der Form ja sonst nur auf dem Straßenstrich.',
    'Die besten Jahre kommen doch nach 45! War mit Deutschland ja genauso!',
    'Jochen? Jaaa, Jochen, altes Scheißhaus! Ich bins! Hörma, ich hab da ein kleines Problemchen mit der Sabbel, mit der Sabine Burer da aus deinem Haufen, du, die is aber nicht länger tragbar... Bernd!... Strombeeerg!... Hier aus dem Haus... Schadensregu... ja, oder so... ja, ist gut, tschüss.'
  ],

  ernie: [
    'Da musst du aufpassen wie ein Lachs. Ehhhh Luchs.',
    'Jetzt ist jetzt alles wieder',
    'Ich muss meine Mutter neu bepflanzen. Bei der ist hinten alles zugewuchert.',
    'Die Frikadellchen waren die letzten Reste von der Frau Runkel',
  ],

  ulf: [
    'Der hat nen Kat. Der hätte da noch vier Jahre drinsitzen können und es wäre nichts passiert.',
  ]
};

/**
  * all quotes together
  *
  * @type {Array}
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
  * @type {String}
  */
const welcomeOutput = 'Hallo mein Name ist Berthold Heisterkamp von der Capitol AG. Was darf ich für Sie tun?';

/**
 * welcomeReprompt
 * @type {String}
 */
const welcomeReprompt = 'Einen Kaffee oder andere kalte Getränke?';

/**
  * APP_ID
  * @type {Number}
  */
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

/**
  * speechOutput
  * @type {String}
  */
speechOutput = '';

/**
  * handlers
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
    this.emit(':tell', speechOutput);
  },
  'AMAZON.NavigateHomeIntent': function () {
    speechOutput = '';

    this.emit(':ask', speechOutput, speechOutput);
  },
  'GetQuote': function () {
    speechOutput = '';

    speechOutput = quotes[getRandomInt(quotes.length)];

    this.emit(':ask', speechOutput, speechOutput);
  },
  'Unhandled': function () {
    speechOutput = 'Ich konnte Sie leider nicht verstehen, weil mich Ulf immer ärgert.';
    this.emit(':tell', speechOutput, speechOutput);
  },
};

function createSpeechObject(optionsParam) {
  if (optionsParam && optionsParam.type === 'SSML') {
    return {
      type: optionsParam.type,
      ssml: optionsParam.speech,
    };
  }

  return {
    type: optionsParam.type || 'PlainText',
    text: optionsParam.speech || optionsParam,
  };
};

function buildSpeechletResponse(options) {
  const alexaResponse = {
    shouldEndSession: options.shouldEndSession,
  };

  if (options.output) {
    alexaResponse.outputSpeech = createSpeechObject(options.output);
  }

  if (options.reprompt) {
    alexaResponse.reprompt = {
      outputSpeech: createSpeechObject(options.reprompt),
    };
  }

  if (options.directives) {
    alexaResponse.directives = options.directives;
  }

  if (options.cardTitle && options.cardContent) {
    alexaResponse.card = {
      type: 'Simple',
      title: options.cardTitle,
      content: options.cardContent,
    };

    if (options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
      alexaResponse.card.type = 'Standard';
      alexaResponse.card.image = {};

      delete alexaResponse.card.content;
      alexaResponse.card.text = options.cardContent;

      if (options.cardImage.smallImageUrl) {
        alexaResponse.card.image.smallImageUrl = options.cardImage.smallImageUrl;
      }

      if (options.cardImage.largeImageUrl) {
        alexaResponse.card.image.largeImageUrl = options.cardImage.largeImageUrl;
      }
    }
  } else if (options.cardType === 'LinkAccount') {
    alexaResponse.card = {
      type: 'LinkAccount',
    };
  } else if (options.cardType === 'AskForPermissionsConsent') {
    alexaResponse.card = {
      type: 'AskForPermissionsConsent',
      permissions: options.permissions,
    };
  }

  const returnResult = {
    version: '1.0',
    response: alexaResponse,
  };

  if (options.sessionAttributes) {
    returnResult.sessionAttributes = options.sessionAttributes;
  }

  return returnResult;
};

function getDialogDirectives(dialogType, updatedIntent, slotName) {
  const directive = {
    type: dialogType,
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
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
