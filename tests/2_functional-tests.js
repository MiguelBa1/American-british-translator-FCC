const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator()

suite('Functional Tests', () => {
    suite('POST test', () => {
        test('Translation with text and locale fields: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    let validTranslation = translator.translate(res.body.text, 'american-to-british')
                    assert.equal(res.status, 200);
                    assert.equal(res.body.text,'Mangoes are my favorite fruit.' );
                    assert.equal(res.body.translation, validTranslation);
                })
        })
        test('Translation with text and invalid locale field: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'invalid-locale'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value for locale field');
                })
        })
        test('Translation with missing text field: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                })
        })
        test('Translation with missing locale field: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                })
        })
        test('Translation with empty text: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'No text to translate');
                })
        })
        test('Translation with text that needs no translation: POST request to /api/translate', function () {
            chai
                .request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favourite fruit.',
                    locale: 'american-to-british'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.text, 'Mangoes are my favourite fruit.');
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                })
        })
    })
});
