'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
  .post((req, res) => {
    if (
      !req.body.hasOwnProperty('text') ||
      !req.body.hasOwnProperty('locale')
    ) {
      res.json({ error: 'Required field(s) missing' })
      return
    }
    let text = req.body.text
    if (text == '') {
      res.json({ error: 'No text to translate' })
      return
    }
    let locale = req.body.locale
    if (['american-to-british', 'british-to-american'].indexOf(locale) == -1){
      res.json({ error: 'Invalid value for locale field' })
      return
    }
    let translation = translator.translate(text, locale)
    if (translation == text) {
      res.json({text, translation: 'Everything looks good to me!'})
      return
    }
    res.json({text, translation})
  });
};
